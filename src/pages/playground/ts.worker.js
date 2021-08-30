import * as worker from "monaco-editor/esm/vs/editor/editor.worker";
import { TypeScriptWorker } from "monaco-editor/esm/vs/language/typescript/tsWorker";
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";
import exportPlugin from "@ts-defold/tstl-export-as-global";
import userdataPlugin from "@ts-defold/tstl-userdata-sugar";

require("path").parse = (x) => x;
require("path").format = (x) => x;

const libContext = require.context(`raw-loader!typescript-to-lua/dist/lualib`, true, /(.+)(?<!lualib_bundle)\.lua$/);
const emitHost = {
    directoryExists: () => false,
    fileExists: (fileName) => ts.sys.fileExists(fileName),
    getCurrentDirectory: () => "",
    readFile: (fileName) => {
        const [, featureName] = fileName.match(/\/dist\/lualib\/(.+)\.lua$/) || [];
        if (featureName === undefined) {
            throw new Error(`Unexpected file to read: ${fileName}`);
        }

        return libContext(`./${featureName}.lua`).default;
    },
    writeFile() {},
};

const transpiler = new tstl.Transpiler({ emitHost });

export class CustomTypeScriptWorker extends TypeScriptWorker {
    lastResult = undefined;

    async getTranspileOutput(fileName) {
        const { ast, lua, sourceMap } = this.transpileLua(fileName);
        return { ast, lua, sourceMap };
    }

    async getSemanticDiagnostics(fileName) {
        const diagnostics = await super.getSemanticDiagnostics(fileName);
        const { diagnostics: transpileDiagnostics } = this.lastResult || this.transpileLua(fileName);
        return [
            ...diagnostics,
            ...TypeScriptWorker.clearFiles(transpileDiagnostics.map((diag) => ({ ...diag, code: diag.source }))),
        ];
    }

    transpileLua(fileName) {
        const program = this._languageService.getProgram();
        const sourceFile = program.getSourceFile(fileName);

        const compilerOptions = program.getCompilerOptions();
        compilerOptions.rootDir = "inmemory://model/";
        compilerOptions.luaLibImport = tstl.LuaLibImportKind.Require;
        compilerOptions.luaTarget = tstl.LuaTarget.Lua51;
        compilerOptions.sourceMap = true;
        compilerOptions.noHeader = true;

        let ast, lua, sourceMap;
        const { diagnostics } = transpiler.emit({
            program,
            sourceFiles: [sourceFile],
            writeFile(fileName, data, _writeBOM, _onError, sourceFiles = []) {
                if (!sourceFiles.includes(sourceFile)) return;
                if (fileName.endsWith(".lua")) lua = data;
                if (fileName.endsWith(".lua.map")) sourceMap = data;
            },
            plugins: [
                exportPlugin({ 
                    match: ".*",
                    globals: { 
                        functions: [ "init", "on_input", "on_message", "on_reload", "update", "final"],
                    }
                }),
                userdataPlugin({}),
                {
                    visitors: {
                        [ts.SyntaxKind.SourceFile](node, context) {
                            const [file] = context.superTransformNode(node);

                            if (node === sourceFile) {
                                ast = file;
                            }

                            return file;
                        },
                    },
                },
            ],
        });

        this.lastResult = { diagnostics, ast, lua, sourceMap };
        return this.lastResult;
    }
}

global.onmessage = () => {
    worker.initialize((context, createData) => new CustomTypeScriptWorker(context, createData));
};

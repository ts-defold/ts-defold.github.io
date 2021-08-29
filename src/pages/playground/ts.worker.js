import * as worker from "monaco-editor/esm/vs/editor/editor.worker";
import { TypeScriptWorker } from "monaco-editor/esm/vs/language/typescript/tsWorker";
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

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
    lastResult = null;

    async getTranspileOutput(fileName) {
        const { lua, sourceMap } = this.transpileLua(fileName);
        return { lua, sourceMap };
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
        compilerOptions.luaLibImport = tstl.LuaLibImportKind.Inline;
        compilerOptions.luaTarget = tstl.LuaTarget.Universal;
        compilerOptions.sourceMap = true;

        let lua;
        let sourceMap;
        const { diagnostics } = transpiler.emit({
            program,
            sourceFiles: [sourceFile],
            writeFile(fileName, data, _writeBOM, _onError, sourceFiles = []) {
                if (!sourceFiles.includes(sourceFile)) return;
                if (fileName.endsWith(".lua")) lua = data;
                if (fileName.endsWith(".lua.map")) sourceMap = data;
            },
        });

        this.lastResult = { diagnostics, lua, sourceMap };
        return this.lastResult;
    }
}

global.onmessage = () => {
    worker.initialize((context, createData) => new CustomTypeScriptWorker(context, createData));
};

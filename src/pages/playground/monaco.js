import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/editor/edcore.main";
import "monaco-editor/esm/vs/basic-languages/lua/lua.contribution";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution";
import EditorWorker from "worker-loader?name=editor.worker.js!monaco-editor/esm/vs/editor/editor.worker.js";
import TsWorker from "worker-loader?name=ts.worker.js!./ts.worker";
import theme from "./theme/one-dark.json"

export { monaco };

global.MonacoEnvironment = {
    getWorker(_workerId, label) {
        if (label === "typescript") {
            return new TsWorker();
        }

        return new EditorWorker();
    },
};

function addLibsFromContext(context, pathPrefix) {
    for (const request of context.keys()) {
        if (pathPrefix) {
            const filePath = request.replace("./", pathPrefix + "/");
            monaco.languages.typescript.typescriptDefaults.addExtraLib(context(request).default, filePath);
        } else {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(context(request).default);
        }
    }
}

// Add typescript libs
addLibsFromContext(require.context("!!raw-loader!typescript/lib/", false, /lib(\.es(.+))?\.d\.ts$/));
//monaco.languages.typescript.typescriptDefaults.addExtraLib(require("!!raw-loader!./execute/console.d.ts").default);

// Add lua-types
addLibsFromContext(require.context("!!raw-loader!lua-types/core/", true, /\.d\.ts$/));
for (const module of [
    require("!!raw-loader!lua-types/special/5.1-only.d.ts"),
    require("!!raw-loader!lua-types/special/5.1-or-jit.d.ts"),
    require("!!raw-loader!lua-types/special/5.3-pre.d.ts"),
    require("!!raw-loader!lua-types/special/5.4-pre.d.ts"),
]) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(module.default);
}

// Add tstl language extension types
addLibsFromContext(
    require.context("!!raw-loader!typescript-to-lua/language-extensions/", true, /\.d\.ts$/),
    "/language-extensions",
);
monaco.languages.typescript.typescriptDefaults.addExtraLib(
    require("!!raw-loader!typescript-to-lua/language-extensions/index.d.ts").default,
    "/language-extensions/index.d.ts",
);

// Add ts-defold types
addLibsFromContext(require.context("!!raw-loader!@ts-defold/types", true, /\.d\.ts$/));
monaco.languages.typescript.typescriptDefaults.addExtraLib(
    require("!!raw-loader!@ts-defold/types/index.d.ts").default,
);

// Add default ts compiler options
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    strict: true,
});

// Set default theme
monaco.editor.defineTheme('onedark', theme);
monaco.editor.setTheme('onedark');

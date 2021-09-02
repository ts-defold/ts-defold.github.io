import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/editor/edcore.main";
import "monaco-editor/esm/vs/basic-languages/lua/lua.contribution";
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution";
import "monaco-editor/esm/vs/language/typescript/monaco.contribution";
import EditorWorker from "worker-loader?name=editor.worker.js!monaco-editor/esm/vs/editor/editor.worker.js";
import TsWorker from "worker-loader?name=ts.worker.js!./ts.worker";
import theme from "./themes/one-dark.json"

export { monaco };

export function getTheme() {
    return "onedark";
}

export function getOptions(readonly = false) {
    return {
      minimap: { enabled: false },
      automaticLayout: true,
      scrollbar: { useShadows: false },
      fixedOverflowWidgets: true,
      wordWrap: 'on',
      readOnly: readonly,
      fontFamily: 'dm, Dank Mono, Operator Mono, Menlo, monospace',
      fontLigatures: true,
    };
  }

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

// Add typescript libs es2019
for (const module of [
    require("!!raw-loader!typescript/lib/lib.es5.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.core.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.collection.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.iterable.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.generator.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.promise.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.proxy.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.reflect.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.symbol.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.symbol.wellknown.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2015.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2016.array.include.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2016.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.object.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.sharedmemory.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.string.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.intl.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.typedarrays.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2017.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.asynciterable.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.asyncgenerator.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.promise.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.regexp.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.intl.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2018.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2019.array.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2019.object.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2019.string.d.ts"),
    require("!!raw-loader!typescript/lib/lib.es2019.symbol.d.ts"),
]) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(module.default);
}

// Add lua-types for lua 5.1
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
    module: "commonjs",
    esModuleInterop: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
});

// Set default theme
monaco.editor.defineTheme('onedark', theme);
monaco.editor.setTheme('onedark');

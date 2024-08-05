---
title: "TypeScript Config"
order: 1
---

The [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 
and [TypeScriptToLua](https://typescripttolua.github.io/docs/configuration) configuration 
is set in `.tsconfig.json` within the root of your project.

# TypeScript Options

The compiler options are configured with sane defaults that are recommended for best results when working with _TSTL_ but you may want to adjust a few options, or configure to your liking.

Some notable options include:
- `"types": []` - Any additional _TSTL_ types you would like to use must be included 
here.
- `"exclude": []` - TypeScript by default will look for types relative to the `.tsconfig.json` 
file and you may need to exclude some folders from being considered as you make 
the project structure your own. 

# TypeScriptToLua Options

These options are contained under the `"tstl"` key in the `.tsconfig.json` and are 
used to configure the behavior of the TypeScriptToLua transpiler.

_TSTL_ comes pre-configured out of the box with some additional [plugins](/configuration/plugins) 
that aid in translating TypeScript code to Lua as used by [Defold](https://defold.com/ref/stable/go/).

These options are of particular concern:
- `"luaTarget": "5.1"` - Defold recommends targeting Lua 5.1 for the broadest support
of deployment targets.  
If you do not want to release your game on an HTML5 target, you may want to modify 
the value to `"JIT"` to bring in [additional syntax features](https://typescripttolua.github.io/docs/caveats).

- `"luaLibImport": "require"` - This setting is used to generate the `lualib_bundle.lua` 
and then insert a require statement at the top of each script to bring in the 
support library for TypeScript language features.  
You may also change it to `require-minimal`, which generates a slimmer bundle 
only based on the code you've used. However, it may not work if you are including external 
TSTL-generated Lua, for example from a _npm_ package.
You may also define this as `inline`, though it causes your bundle size to increase 
due to code duplication, and is generally not recommended.




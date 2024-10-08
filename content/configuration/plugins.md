---
title: "Plugins"
order: 2
---

[TypeScriptToLua](https://typescripttolua.github.io/docs/api/plugins) allows you to extend the transpiler's behavior and ***ts-defold*** uses this _API_ to bring some quality of life and necessary features to using TypeScript with Defold.

## Export Globals

The [tstl-export-to-global](https://github.com/thinknathan/tstl-export-to-global) 
plugin is used to allow the export function to emulate the expected behavior of 
"exports" in a Defold game script.

The `init`, `on_input`, `on_message`, `on_reload`, `update`, `fixed_update`, and 
`final` functions are executed on each game script by the Defold game engine. 
Each of those functions are expected to be defined in the file scope of the 
game script for the game engine to execute them.

To adhere to these requirements, the ***tstl-export-to-global*** plugin will hoist 
all exports to the global scope of the file.

```json
{
    "name": "tstl-export-to-global",
    "match": ".*\\..*script.ts$"
}
```

By default this behavior is configured to only operate on `.*script.ts` files and 
can be customized by modifying the _RegEx_ in the `"match"` configuration option.

# UserData Sugar

The [@ts-defold/userdata-sugar](https://github.com/ts-defold/tstl-userdata-sugar) 
plugin is used to allow the `...` spread operator syntax in array like objects 
used in the Defold _API_.

Some of Defold's game objects are Lua UserData objects that define metamethods of
 `__index` and `__len` that allow them to be treated like an array.  
 
 Types defined as `Array<T> & LuaUserdata` in the [@ts-defold/types](https://www.npmjs.com/package/@ts-defold/types?activeTab=readme) package 
 are transformed to allow the `...` spread operator in arrays. This does not come 
 without some cost though, so be certain you want to copy the array data and not 
 just needlessly putting sugar on all the things.

# Trim Extensions

The [tstl-trim-extensions](https://github.com/thinknathan/ts-defold-tstl-trim-extensions) 
plugin is used to strip the ".lua" extension from output files to fit Defold's naming convention.
For example, `player.script.ts` will become `player.script` instead of `player.script.lua`.

# Third-Party Plugins

You may find other useful [TSTL plugins on npm](https://www.npmjs.com/search?q=tstl%20plugin).

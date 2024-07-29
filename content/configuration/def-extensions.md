---
title: "Defold Extensions"
order: 3
---

Defold is a modular engine, with a ton of functionality available through 
Lua libraries or [native extensions](https://defold.com/manuals/extensions/).

Since every extension has its own unique API, they're tricky to use with 
a strictly typed language like TypeScript. Here's how we handle it:

# Library

The [@ts-defold/library](https://github.com/ts-defold/library) contains user-submitted 
types for popular Defold extensions. The library is included in all ts-defold templates. 
Install your preferred extensions in Defold, then type `npm run resolve` to fetch 
the matching types from the library.

# Ext-Type-Gen

The [ext-type-gen](https://github.com/thinknathan/tsd-ext-type-gen) tool can parse 
Defold native extensions that contain a [script_api](https://defold.com/manuals/extensions-script-api/), 
and generate types automagically.

# Write Your Own

If all else fails, you can write your own types by hand, or ask an AI tool to help.

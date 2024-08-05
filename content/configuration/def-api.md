---
title: "Defold API"
order: 3
---

Getting accurate types for the Defold API is an important part of ts-defold. Here are some 
ways to get the definitions you need:

:sparkles: The `types` library is built-in into all ts-defold templates, and is automatically 
published to keep up with the latest changes to Defold.

:star2: [TS-Defold Types II](https://github.com/thinknathan/ts-defold-types) 
is a drop-in alternative for the `types` library, with hand-written patches to provide for 
more accurate and useful types.

:boom: [Defold Annotations for Typescript](https://github.com/elMuso/defold-annotations-typescript/) 
Is a tool for generating types based on the Defold API, with more accurate types and better coverage 
of Lua features than the default `types`.

# Working with Messages

The Defold engine is built around communication using [messages](https://defold.com/manuals/message-passing/), 
so it helps to have accurate definitions of the built-in messages.

:notes: [Utility Types](https://github.com/thinknathan/tsd-util-types/tree/main/types) 
include messages.

:boom: [Defold Annotations for Typescript](https://github.com/elMuso/defold-annotations-typescript/) 
can generate a definitions file with Defold's built-in messages.

# Working with Vector Math

TypeScript doesn't have a built-in way to understand the resulting type of 
an operation involving vectors.

```ts
const result = go.get_position() + vmath.vector3(1, 1, 1); // type: number ?!??
```

If you're confident about the result, you can cast the type:

```ts
const result = (go.get_position() + vmath.vector3(1, 1, 1)) as vmath.vector3; // type: vmath.vector3
```

Or you can use the 
[Operator Map Types](https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types) 
provided by TSTL to enable full type checking.

:notes: [Utility Types](https://github.com/thinknathan/tsd-util-types/blob/main/types/vmath.d.ts) 
include all relevant vector math operations.

```ts
namespace vmath {
	export const add: LuaAddition<vmath.vector3, vmath.vector3, vmath.vector3>;
}
const result = vmath.add(go.get_position(), vmath.vector3(1, 1, 1)) // type: vmath.vector3
```

---
title: "Defold API"
order: 3
---

Getting accurate types for the Defold API is an important part of ***ts-defold***. Here are some 
ways to get the definitions you need:

:sparkles: The `types` library is built-in into all ***ts-defold*** templates, and is automatically 
published to keep up with the latest changes to Defold.

:boom: [Defold Annotations for Typescript](https://github.com/elMuso/defold-annotations-typescript/) 
Is an alternative third-party tool for generating types based on the Defold API
and Lua features.

# Working with Messages

The Defold engine is built around communication using [messages](https://defold.com/manuals/message-passing/), 
so it helps to have accurate definitions of the built-in messages.

:boom: [Defold Annotations for Typescript](https://github.com/elMuso/defold-annotations-typescript/) 
can generate a definitions file with Defold's built-in messages.

# Working with Vector Math

TypeScript doesn't have a built-in way to understand the resulting type of 
an operation involving vectors. It incorrectly assumes the product of
any mathematical operation has the type `number`.

```ts
const result = go.get_position() + vmath.vector3(1, 1, 1); // type: number ?!??
```

If you're confident about the result of an operation, you can override the type:

```ts
const result = (go.get_position() + vmath.vector3(1, 1, 1)) as vmath.vector3; // type: vmath.vector3
```

Or, to enable proper type checking, you can use the 
[Operator Map Types](https://typescripttolua.github.io/docs/advanced/language-extensions#operator-map-types) included in ***ts-defold's*** built-in `types` library. 
Each Vector3 and Vector4 object has the methods `add`, `sub`, `mul`, `div`, and `unm` (negation).
Matrixes and Quaternions have the `mul` (multiplication) method.

```ts
const result = go.get_position().add(vmath.vector3(1, 1, 1)) // type: vmath.vector3
```

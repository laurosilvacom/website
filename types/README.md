# types/

This folder is for **ambient TypeScript declarations** (`*.d.ts`) only.

Use it when you need to:

- Patch/declare types for third-party packages **that have no types**, or
- Provide global/ambient declarations that TypeScript needs at compile time.

Guidelines:

- Prefer fixing types at the source (installing proper typings) instead of
  adding shims.
- Avoid `declare module 'some-lib' { ... any ... }` unless there is no
  alternative.
- If a package has official typings, **do not** shadow them here (it can hide
  real exports).

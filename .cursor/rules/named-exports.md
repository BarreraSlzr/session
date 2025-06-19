# Rule: Explicit Named Exports in Index Files

## Rationale
Explicit named exports improve code clarity, enable better tree-shaking, and make refactoring safer. They also make it easier to track what is exported from each module and avoid accidental export of internal APIs.

## Requirements
- All `index.ts` files must use explicit named exports (never `export * from ...`).
- Group and comment exports by concern/module.
- Use `export type { ... }` for type-only exports.
- No default exports.
- Order exports alphabetically or by logical grouping.
- Prefer a single export statement per file.

## Examples
```ts
// Good
export { createUser, getUser } from './user';
export type { User, UserInsert } from './user';

// Bad
export * from './user';
export default createUser;
```

## Enforcement
- PRs that add or modify index files must use explicit named exports only.
- Reviewers should request changes if `export * from ...` or default exports are used in index files. 
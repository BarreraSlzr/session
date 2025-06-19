# Rule: No Default Exports

## Rationale
Default exports can lead to import ambiguity, make refactoring harder, and are less compatible with some tooling. Named exports are explicit and safer for large codebases.

## Requirements
- Default exports are not allowed anywhere in the codebase.
- Always use named exports for functions, types, and constants.

## Examples
```ts
// Good
export function createUser() { ... }
export type User = { ... };

// Bad
export default function createUser() { ... }
export default User;
```

## Enforcement
- PRs that add or modify files with default exports will be rejected.
- Reviewers should request changes if a default export is found. 
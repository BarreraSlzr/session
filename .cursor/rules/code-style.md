# Code Style & Export Syntax Rule

> **Rule:** Do not add project or module rules to README.md files; all enforceable or reference rules must go in `.cursor/rules/` as `.md` files. `README.md` should only contain usage, onboarding, or high-level documentation, not enforceable rules.

## Index File Pattern
- Every `index.ts` must start with a summary doc comment describing its purpose and referencing source files for details.
- Use **explicit named exports** for each module, with a short comment referencing the source file.
- Use `export * from` **only** for submodules that are already documented at their entry point (i.e., their own `index.ts` or file has a summary doc comment).
- **No default exports** in any file.
- **No inline JSDoc in the index** (keep those in the source files).

## Minimal, Scalable Example
```typescript
/**
 * Centralized types for the authentication API.
 * See each source file for detailed docs.
 */
export { User, isUser } from './database'; // See database.ts
export type { ApiResponse } from './api';  // See api.ts
export * from './errors';                  // Only if errors.ts is documented
```

## Documentation
- All leaf modules must have JSDoc comments for every export.
- Each export group in an index file should reference the submodule's documentation for details.
- Only use `export * from` for submodules that are already documented at their entry point.

## Import Patterns
- Prefer importing from the main index for most use cases.
- Import directly from the source file for specific needs or to avoid circular dependencies.
- Import types from the centralized types index.

## LLM/Codegen Friendliness
- Keep index files minimal, explicit, and well-documented for easy navigation and code generation.
- Update index files and documentation when adding new exports or modules. 
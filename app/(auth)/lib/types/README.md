# Types System - LLM Context & Rules

## Cursor Rule: Minimal, Scalable `index.ts` Pattern

To ensure maintainability, LLM/codegen-friendliness, and scalability, all `index.ts` files in this folder (and subfolders) must follow this pattern:

- **One summary doc comment at the top** describing the module's purpose and referencing source files for details.
- **Explicit named exports** for each module, with a short comment referencing the source file.
- **Use `export * from` only** for submodules that are already documented at their entry point (i.e., their own `index.ts` or file has a summary doc comment).
- **No default exports.**
- **No inline JSDoc in the index** (keep those in the source files).

### Example: Minimal, Scalable `index.ts`
```typescript
/**
 * Centralized types for the authentication API.
 * See each source file for detailed docs.
 */
export { User, isUser } from './database'; // See database.ts
export type { ApiResponse } from './api';  // See api.ts
export * from './errors';                  // Only if errors.ts is documented
```

> Always keep this pattern for all new and existing `index.ts` files in this folder.

--- 
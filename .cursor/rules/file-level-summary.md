# Rule: File-Level Summary JSDoc Comments

## Rationale
A file-level summary JSDoc comment at the top of each module improves onboarding, code navigation, and documentation generation. It helps developers quickly understand the purpose and usage of a file without reading its entire contents.

## Requirements
- Every file in `types/`, `schemas/`, `validation/`, and `db/queries/` must start with a file-level summary JSDoc comment.
- The comment should describe the module's purpose, what it exports, and any important usage notes.
- The summary should be concise (2-6 lines is typical).

## Examples
```ts
/**
 * Centralized type inference from Zod schemas for the authentication API.
 *
 * This module re-exports types inferred from Zod validation schemas, providing a single source of truth
 * for API, form, and database types. Maintains backward compatibility while using the centralized schemas.
 */
```

## Enforcement
- PRs that add or modify files in the specified directories must include or update the file-level summary comment.
- Reviewers should request changes if the summary is missing or unclear. 
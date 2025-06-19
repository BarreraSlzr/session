# Rule: Per-Export JSDoc Comments for Type and Schema Files

## Rationale
To maximize IDE support, onboarding clarity, and maintainability, every exported value (type, function, constant) in type and schema files must have its own concise, context-rich JSDoc comment. This ensures that when a developer hovers over an export in their editor, they receive immediate, relevant documentation.

## Requirements
- Every exported value (type, function, constant) in files such as `types/`, `schemas/`, and `validation/` must have a JSDoc comment directly above the export.
- The comment should explain what the export is, what it represents, and its intended usage.
- Avoid block/group comments that do not attach to a specific export.
- Comments should be concise but informative (1-3 lines is typical).

## Examples
```ts
/**
 * User object type inferred from UserSchema.
 * Used for user data returned by the API.
 */
export type UserFromSchema = z.infer<typeof UserSchema>;

/**
 * Helper function to validate login form input.
 */
export function validateLoginForm(data: unknown): LoginFormFromSchema { ... }
```

## Enforcement
- PRs that add or modify exports in type/schema/validation files must include or update JSDoc comments for each export.
- Reviewers should request changes if any export lacks a JSDoc comment or if the comment is unclear or generic.

## Exceptions
- Internal helper functions or values not exported do not require JSDoc unless they are complex or non-obvious. 
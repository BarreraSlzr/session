# Separation of Concerns Rule

> **Rule:** Do not add project or module rules to README.md files; all enforceable or reference rules must go in `.cursor/rules/` as `.md` files. `README.md` should only contain usage, onboarding, or high-level documentation, not enforceable rules.

## Architectural Boundaries
- Each module/folder should handle a single domain or concern (e.g., users, sessions, passkeys, validation, database, types).
- Zod schemas, validation helpers, database schemas, and error registries must be kept in separate, clearly named folders/files.
- Avoid circular dependencies by importing only from source files, not from re-exported index files.

## Modularity
- Each file should implement one specific responsibility (e.g., user validation, session helpers, passkey schemas).
- Validation logic, type definitions, and error handling must be modular and not mixed in the same file.
- New features or domains should be added as new modules, not by expanding existing ones.

## Single Source of Truth
- All schemas, types, and error codes must have a single, canonical definition in the codebase.
- The type system (`app/(auth)/lib/types/index.ts`) is the single source of truth for all shared types.
- The error registry (`app/(auth)/lib/types/errors.ts`) is the single source of truth for error codes and messages.
- The OpenAPI spec (`/openapi.yaml`) must always reflect the current API contract.

## Error Handling
- All errors must be created and managed through the centralized error registry.
- Error codes, messages, and status codes must be standardized and type-safe.
- API error responses must be structured and consistent across all endpoints.

## Type System Separation
- Database types, API types, Zod-inferred types, and configuration types must be defined in separate files and re-exported from a central index.
- Type guards and utility types should be kept in their own modules.
- Never mix runtime logic with type definitions.

## Documentation
- Each module and index file must have a summary doc comment describing its purpose and boundaries.
- All architectural changes must be reflected in the relevant README and, if needed, in this rule file. 
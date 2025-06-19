# Onboarding Guide

Welcome to the project! This guide is designed to help both human developers and LLMs quickly understand the structure, conventions, and best practices of this codebase.

## Key Conventions

- **JSDoc Everywhere:** Every file and export is documented with JSDoc for IDE and LLM support.
- **Named Exports Only:** All exports are named; no default exports anywhere.
- **Explicit Index Exports:** Index files use explicit named exports only (never `export * from ...`).
- **File-Level Summaries:** Every file starts with a summary JSDoc comment describing its purpose.
- **Per-Export Comments:** Each exported value (type, function, constant) has a concise, context-rich JSDoc comment.
- **Rules Directory:** All coding standards are formalized in `.cursor/rules/`.

## Directory Overview

- `app/(auth)/lib/types/` — Centralized type system. All types are documented and inferred from schemas.
- `app/(auth)/lib/schemas/` — All validation and database schemas, with per-export docs. Includes Zod and Kysely schemas.
- `app/(auth)/lib/db/queries/` — Query utilities for the database. Each function is documented.
- `__tests__/` — All tests live here, near the code they test.
- `.cursor/rules/` — All enforced code style and documentation rules.
- `CONTRIBUTING.md` — Contributor workflow, coding standards, and review process.

## How to Find What You Need

- **Looking for a type?** Start in `types/` or `schemas/`, hover for docs in your IDE.
- **Need to validate data?** Use a Zod schema from `schemas/zod/validation/`.
- **Working with the database?** See `db/queries/` and `schemas/kysely/`.
- **Error handling?** All error codes, messages, and helpers are in `types/errors.ts`.

## Coding Standards

- All rules are in `.cursor/rules/` and summarized in `CONTRIBUTING.md`.
- Every PR is reviewed for documentation, type safety, and code style.
- See `.cursor/rules/jsdoc-per-export.md`, `.cursor/rules/named-exports.md`, `.cursor/rules/file-level-summary.md`, and `.cursor/rules/no-default-exports.md` for specifics.

## Example: Adding a New Type or Schema

1. Define your Zod schema in `schemas/zod/validation/` with a JSDoc comment.
2. Infer the type in `types/schemas.ts` with a JSDoc comment.
3. Add or update file-level summary comments as needed.
4. Use named exports only.
5. Add tests in `__tests__/` if needed.
6. Update documentation if you add new features or rules.

## Example: Adding a New API Endpoint

1. Update or add the route handler in the appropriate directory.
2. Add or update the Zod schema for request/response validation.
3. Update the OpenAPI spec (`openapi.yaml`).
4. Add or update types in `types/` as needed.
5. Document all exports and files with JSDoc.
6. Add tests and update docs.

---

**Happy coding! If you have questions, check the rules, CONTRIBUTING.md, or ask in your team chat.** 
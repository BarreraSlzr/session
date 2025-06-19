# Contributing to This Project

Thank you for considering contributing! To keep the codebase maintainable, scalable, and developer-friendly, please follow these guidelines:

## 1. General Workflow
- Fork the repository and create a feature branch.
- Make atomic, focused commits with clear messages.
- Open a pull request (PR) with a descriptive title and summary.
- Ensure all tests and linters pass before requesting review.

## 2. API and OpenAPI Spec
- **Source of Truth:** The `openapi.yaml` file is the canonical reference for all API endpoints.
- **Rule:** If you add, change, or remove any API endpoint, you **must** update `openapi.yaml` accordingly.
- PRs that modify API routes without updating the spec will be flagged.

## 3. Database Schema and Type Generation
- **Schema as Code:** Define all DB schema changes in `app/(auth)/lib/schemas/kysely/database.ts` and add a migration in `app/(auth)/lib/db/migrations/`.
- **Typegen:** After running migrations, update generated types with `npm run db:typegen`.
- **Never edit generated types by hand.**

## 4. Zod Schemas
- Define all API request/response validation schemas in `app/(auth)/lib/schemas/zod/validation/`.
- Use these schemas for both runtime validation and type inference.

## 5. Code Style and Linting
- Use the provided ESLint, Biome, and Prettier configs.
- Run `npm run lint` and `npm run format` before pushing.
- Prefer named exports and avoid default exports.

## 6. Preferred `index.ts` Export Rule
- **Explicit named exports only:**
  ```ts
  // Good
  export { createUser, getUser } from './user';
  // Bad
  export * from './user';
  ```
- **Group and comment exports** by concern/module.
- **Use `export type { ... }`** for type-only exports.
- **No default exports.**
- **Order exports alphabetically or by logical grouping.**
- **Prefer a single export statement per file.**

## 7. Tests
- Place all tests in a `__test__/` directory near the code they test.
- Add contract tests to ensure API implementation matches the OpenAPI spec.

## 8. Environment Variables
- Add new env vars to `.env.example` and document their purpose in the README.

## 9. Documentation
- Update the README and relevant docs for any new features, breaking changes, or setup steps.
- Add or update architecture diagrams (e.g., Mermaid) as needed.

## 10. Commit Messages
- Use clear, descriptive commit messages (e.g., `feat(auth): add passkey login endpoint`).

## 11. JSDoc and Hover Documentation
- **Rule:** Every exported value (type, function, constant) in type and schema files must have a concise, context-rich JSDoc comment.
- These comments are used for IDE hover popups and onboarding.
- See `.cursor/rules/jsdoc-per-export.md` for details and examples.

---

**Thank you for helping make this project better!** 
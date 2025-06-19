# Project Overview

This project is a modern, type-safe authentication and session management system designed for clarity, maintainability, and developer/LLM onboarding.

## Purpose
- Provide a robust authentication API with support for sessions, passkeys, and multi-factor auth.
- Ensure type safety and validation from database to API responses using Zod and TypeScript.
- Centralize error handling and documentation for easy onboarding and maintenance.

## Main Features
- **Type-Safe API:** All endpoints are validated and typed using Zod and a centralized type system.
- **Modular Architecture:** Clear separation of concerns between types, schemas, validation, queries, and error handling.
- **Comprehensive Error Handling:** Centralized error registry for consistent, type-safe error responses.
- **Developer & LLM Friendly:** Extensive JSDoc, file-level summaries, and onboarding scripts for fast ramp-up.
- **CI/CD Ready:** Automated linting, testing, docs/onboarding checks, and Vercel deployment.

## Guiding Principles
- **Single Source of Truth:** Types, schemas, and error codes are defined once and reused everywhere.
- **Explicitness:** Named exports, explicit index files, and per-export JSDoc for clarity and refactor safety.
- **Documentation-First:** Every file and export is documented for both humans and LLMs.
- **Automation:** CI/CD ensures code quality, test coverage, and up-to-date onboarding.

## Where to Learn More
- [ONBOARDING.md](./ONBOARDING.md): Quickstart and project structure
- [architecture.md](./architecture.md): High-level system architecture
- [type-system.md](./type-system.md): Type system and usage
- [error-handling.md](./error-handling.md): Error handling patterns
- [openapi.yaml](../openapi.yaml): API specification

---
For any questions, see the docs above or ask in your team chat! 
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 06/2024
### Added
- `docs/architecture.md`: High-level system architecture overview with Mermaid diagram.
- `docs/overview.md`: Project overview, purpose, features, and guiding principles.
- `docs/api.md`: API summary generated from `openapi.yaml`.
- CLI onboarding tool (`scripts/onboard-llm.ts`) with search, filter, and export options.
- `.cursor/rules/`: New rule files for JSDoc, named exports, file-level summaries, and no default exports.
- GitHub Actions workflows for linting, testing, Vercel deployment, and docs/onboarding checks.
- Badges for lint, test, docs, deployment, and onboarding status in `README.md`.
- GitHub issue and PR templates reminding contributors to follow rules and update docs.

### Changed
- Updated `README.md` to link to new docs, highlight LLM-friendliness, and reference the docs directory.
- Improved JSDoc and file-level comments across types, schemas, and queries for better IDE/LLM support.

### Fixed
- CLI onboarding script now works as a flexible CLI tool with yargs.

## [0.1.1] - 2025-06-18
### Added
- OpenAPI specification section to README

## [0.1.0] - YYYY-MM-DD
### Added
- Project initialization.

---

## Next Steps
- **Changelog-driven development:** Always add a summary of your change to the "Unreleased" section before committing.
- **Automate changelog checks:** Add a pre-commit or CI check to ensure `CHANGELOG.md` is updated for every PR.
- **Release management:** When preparing a release, move entries from "Unreleased" to a new version section with the release date.
- **Leverage changelog for LLMs:** Use the changelog as context for future LLM chats about unstaged changes, release notes, or project history.
- **Keep changelog concise:** Group related changes and keep entries clear and actionable for both humans and automation. 
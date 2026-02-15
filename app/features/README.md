# Features

Domain modules live here.

- Keep business logic in `server/`.
- Keep feature-specific UI in `components/`.
- Prefer importing feature APIs via `@/features/<feature>/server`.
- Avoid cross-feature imports unless the dependency is intentionally shared.

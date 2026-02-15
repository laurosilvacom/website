# Copilot Instructions

## Architecture Snapshot

- The app uses a feature-first structure under `app/features/*` and shared
  primitives under `app/shared/*`.
- `app/(pages)` is a thin composition layer. Keep route files focused on params,
  metadata, and feature orchestration.
- Business/data logic belongs in `app/features/*/server`.
- Shared integrations (Sanity, Resend) live in `app/shared/integrations`.

## Module Boundaries

- Prefer imports from:
  - `@/features/<feature>/server`
  - `@/features/<feature>/components`
  - `@/shared/components/*`
  - `@/shared/ui/*`
  - `@/shared/lib/*`
- Legacy aliases are blocked and must not be used:
  - `@/components/*`
  - `@/lib/*`
  - `@/hooks/*`

## Feature Ownership

- Blog:
  - server: `app/features/blog/server`
  - rendering: `app/features/blog/components/portable-text.tsx`
- Workshops:
  - server: `app/features/workshop/server`
  - UI: `app/features/workshop/components`
- Workshop newsletter flow:
  - server: `app/features/workshop-newsletter/server`

## Styling & UI

- Global Tailwind/CSS tokens live in `app/globals.css`.
- Reusable app shell/layout components are in `app/shared/components`.
- UI primitives are in `app/shared/ui`.
- Use `cn()` from `app/shared/lib/utils.ts` for class composition.

## Tooling Workflow

- Core commands:
  - `pnpm dev`
  - `pnpm type-check`
  - `pnpm lint`
  - `pnpm build`
  - `pnpm format`
  - `pnpm quality` (type-check + lint + build)
- Studio:
  - `pnpm studio` serves Sanity Studio at `/studio`.

## Quality Expectations

- Prefer server components by default.
- Keep feature modules cohesive and avoid cross-feature imports unless shared.
- Add new domains with `pnpm feature:new <feature-name>` and fill `server/`
  before route wiring.

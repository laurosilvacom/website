# Project Architecture

Next.js 16 App Router with TypeScript strict mode and a feature-first module
layout.

## Directory Structure

```
app/
  (pages)/                    # Route entrypoints only (thin composition layer)
  api/                        # HTTP handlers
  features/                   # Domain modules (business behavior)
    blog/
      components/             # Blog-specific UI
      server/                 # Blog domain + data access
    workshop/
      components/
      server/
    workshop-newsletter/
      server/
  shared/                     # Reusable primitives across features
    components/               # Layout and global app components
    hooks/                    # Reusable hooks
    integrations/             # External providers (Sanity, Resend, etc.)
    lib/                      # Generic utilities and metadata helpers
    ui/                       # Design-system primitives
  globals.css
  layout.tsx
  page.tsx
```

## Architectural Rules

- Keep routes thin: route files should compose features, not hold domain logic.
- Put domain logic in `app/features/*/server`.
- Put feature-specific UI in `app/features/*/components`.
- Put cross-feature primitives in `app/shared/*`.
- Use `@/features/*` and `@/shared/*` path aliases.
- Legacy aliases (`@/components/*`, `@/lib/*`, `@/hooks/*`) are blocked by ESLint.

## Operating Model

- Build from the inside out:
  1. Domain contracts in feature `server` modules.
  2. Data/integration adapters in `shared/integrations`.
  3. Feature UI in `features/*/components`.
  4. Route-level composition in `app/(pages)`.
- Prefer server components by default; use `'use client'` only when needed.
- Keep cross-cutting code in `shared` and avoid feature-to-feature coupling.

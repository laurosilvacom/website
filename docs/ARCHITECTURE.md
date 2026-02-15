# Architecture Guide

## Intent

This codebase is organized to optimize long-term developer experience:

- fast onboarding
- clear ownership boundaries
- low-coupling feature modules
- thin route handlers

## Module Map

```
app/
  (pages)/                    # Routing + composition
  api/                        # HTTP endpoints
  features/
    <feature>/
      components/             # Feature-only UI
      server/                 # Feature business logic + repositories
  shared/
    components/               # Reusable app-level components
    hooks/                    # Reusable hooks
    integrations/             # Third-party integrations
    lib/                      # Generic helpers
    ui/                       # Design system primitives
```

## Mental Model

- `routes` answer: "what URL maps to what composition?"
- `features` answer: "what behavior does the product need?"
- `shared` answers: "what can any feature safely reuse?"

If code is specific to one domain, it belongs in that feature.
If code is generic and reused by multiple domains, it belongs in `shared`.

## Import Conventions

- Feature/domain APIs:
  - `@/features/blog/server`
  - `@/features/workshop/server`
- Shared APIs:
  - `@/shared/components/*`
  - `@/shared/ui/*`
  - `@/shared/lib/*`
  - `@/shared/integrations/*`

Legacy aliases are blocked by lint:

- `@/components/*`
- `@/lib/*`
- `@/hooks/*`

## Route Design

Route files should stay orchestration-only:

- read params
- call feature server functions
- compose UI
- return metadata

Move domain logic out of route files into feature server modules.

## Creating A New Feature

1. Create `app/features/<feature>/server`.
2. Create `app/features/<feature>/components` if it has custom UI.
3. Keep external provider calls in `app/shared/integrations`.
4. Keep route files as a thin composition shell over the feature module.

## Guardrails

- ESLint blocks legacy import namespaces.
- TypeScript aliases expose `features` and `shared` as top-level architecture
  boundaries.

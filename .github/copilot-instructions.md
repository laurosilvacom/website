# Copilot Instructions

## Architecture Snapshot
- Next.js 16 App Router with React 19 and strict TypeScript lives under [app](app); route groups such as [app/(pages)/blog](app/(pages)/blog/page.tsx) render server components with `export const revalidate = 300` for ISR.
- Content is sourced from Sanity via [app/lib/sanity/client.ts](app/lib/sanity/client.ts) and GROQ queries in [app/lib/sanity/queries.ts](app/lib/sanity/queries.ts); `cache()` wrapped helpers in [app/lib/blog.ts](app/lib/blog.ts) expose `getBlogPosts`, `getBlogPostBySlug`, etc.
- Metadata and structured data are centralized in [app/lib/metadata.ts](app/lib/metadata.ts) and [app/components/structured-data.tsx](app/components/structured-data.tsx); new pages should call `createMetadata()` or `generateBlogPostMetadata()` to stay consistent.

## Content & Rendering Patterns
- Blog listing ([app/(pages)/blog/page.tsx](app/(pages)/blog/page.tsx)) fetches posts server-side, sorts by `metadata.publishedAt`, and renders cards; reuse `formatDate()` from [app/lib/blog-sanity.ts](app/lib/blog-sanity.ts) for consistent labels.
- Post detail pages ([app/(pages)/blog/[slug]/page.tsx](app/(pages)/blog/[slug]/page.tsx)) preload paths with `generateStaticParams`, hydrate metadata, and render Sanity Portable Text with a sticky TOC; mirror this structure for future long-form content.
- Rich text rendering lives in [app/components/portable-text.tsx](app/components/portable-text.tsx): it decorates Sanity blocks with custom images, code blocks (via Sugar High + `CodeCopyButton`), and interactive footnotes. Extend this file instead of rolling ad-hoc renderers.

## Styling & Layout System
- Use the semantic `Container` from [app/components/container.tsx](app/components/container.tsx): `width="narrow|base|wide|full"` encapsulates the spacing rules described in [LAYOUT.md](LAYOUT.md). Never combine it with `max-w-*` utilities.
- Tailwind CSS 4 is configured globally in [app/globals.css](app/globals.css); compose utilities with the `cn()` helper from [app/lib/utils.ts](app/lib/utils.ts) to avoid duplicates (twMerge aware).
- UI primitives from shadcn live under [app/components/ui](app/components/ui); prefer extending these tokens over adding new design systems.

## Data & Integration Details
- Environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN` feed the Sanity client. Use `pnpm studio` to launch the embedded Studio at `/studio` when editing content.
- Image assets require compression via `./scripts/optimize-images.sh` (see [PERFORMANCE.md](PERFORMANCE.md)); modern formats and cache hints are already wired in `next.config.ts`.
- Blog metadata includes derived reading times; `calculateReadingTime()` in [app/lib/blog-sanity.ts](app/lib/blog-sanity.ts#L5-L33) runs when Sanity doesn't provide one, so keep `content` populated to avoid undefined values.

## Implementation Conventions
- Imports use path aliases (`@/components`, `@/lib`, etc.); default to server components and add `'use client'` only when hooks or browser APIs are required (see [app/components/portable-text.tsx](app/components/portable-text.tsx)).
- Follow the brutalist spacing system: sections start with `pt-32 pb-16` on desktop and rely on consistent `py-16 lg:py-24` rhythm; reference [LAYOUT.md](LAYOUT.md) before altering page scaffolding.
- Reusable metadata, Open Graph images, and canonical URLs must go through `createMetadata()`; avoid inline `export const metadata = {...}` unless it calls into that helper.

## Tooling & Workflows
- Install and run with pnpm only: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm type-check`, `pnpm lint`, `pnpm format`. Clean artifacts via `pnpm clean`.
- Content migrations: `pnpm migrate:code-blocks` fixes legacy MDX code fences locally, while `pnpm migrate:code-blocks:cli` runs the Sanity-side transformer (requires a user token via `pnpm setup:token`).
- Performance budgets are documented in [PERFORMANCE.md](PERFORMANCE.md); after touching media-heavy pages, run `pnpm build` followed by a Lighthouse pass to keep LCP < 1.2s.

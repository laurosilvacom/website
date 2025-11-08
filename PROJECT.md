# Project Structure

## Architecture

Next.js 16 App Router with TypeScript strict mode.

### Directory Structure

```
app/
  (pages)/          # Route groups (not in URL)
    blog/            # Blog routes
      [slug]/        # Dynamic blog post pages
      posts/          # MDX blog posts (organized by date)
    tags/             # Tag pages
    services/         # Services page
  components/         # React components
    ui/               # shadcn/ui components
  lib/                # Utilities & helpers
    blog.ts           # Blog post utilities
    metadata.ts       # SEO metadata helpers
    types.ts          # TypeScript types
    utils.ts          # General utilities (cn, etc.)
  hooks/              # Custom React hooks
  globals.css         # Global styles + Tailwind
  layout.tsx          # Root layout
  page.tsx            # Home page
```

### Key Patterns

- **Route Groups**: `(pages)` doesn't appear in URL
- **Path Aliases**: Use `@/` for imports (`@/components`, `@/lib`)
- **Server Components**: Default (no 'use client')
- **Client Components**: Mark with `'use client'` when needed
- **MDX Posts**: Organized by date in `app/(pages)/blog/posts/YYYY/MM/`
- **Types**: Centralized in `app/lib/types.ts`

### Component Organization

- **UI Components**: `app/components/ui/` (shadcn)
- **Feature Components**: `app/components/` (Card, Nav, Footer, etc.)
- **Page Components**: Co-located with routes in `app/(pages)/`

### Styling

- Tailwind CSS 4 with CSS variables
- Design system in `app/globals.css`
- Minimal, spacing-based design (no borders)
- Consistent 680px content width

### Blog System

- MDX files with frontmatter (title, publishedAt, summary, tags)
- Server-side rendering with `getBlogPosts()`
- Date-based organization (shoebox method)
- Drafts in `posts/drafts/`


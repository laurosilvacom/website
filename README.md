# Lauro Silva - Personal Website

Minimal, elegant personal website built with Next.js 16, React 19, and TypeScript.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check

# Format code
pnpm format

# Lint
pnpm lint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4
- **UI**: shadcn/ui components
- **Content**: Sanity CMS
- **Newsletter**: Resend

## Project Structure

```
app/
  (pages)/        # Route groups
    blog/         # Blog posts
    tags/         # Tag pages
  components/      # React components
  lib/            # Utilities & helpers
  hooks/          # Custom React hooks
```

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `lint:fix` - Fix ESLint errors
- `type-check` - Type check without building
- `format` - Format all files with Prettier
- `format:check` - Check formatting
- `clean` - Remove build artifacts

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Resend (Newsletter)
RESEND_API_KEY=re_MXNHa13A_EoVftdhpj4TW7yXQmZPZPZrP
RESEND_AUDIENCE_ID=
```

Get your Resend API key from [resend.com/api-keys](https://resend.com/api-keys) and create an audience to get the audience ID.

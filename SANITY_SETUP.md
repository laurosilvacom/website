# Sanity CMS Setup Guide

This project uses Sanity CMS for blog content management. Follow these steps to set up and use Sanity.

## Initial Setup

1. **Create a Sanity Project**
   - Go to [sanity.io](https://www.sanity.io) and create an account
   - Create a new project
   - Note your Project ID and Dataset name

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Sanity credentials:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     ```

3. **Deploy Sanity Studio Schema**
   - Run `npx sanity init` in the project root (if needed)
   - Or manually configure the schema files in `sanity/schemas/`

4. **Access Sanity Studio**
   - Start your Next.js dev server: `pnpm dev`
   - Navigate to `/studio` to access the Sanity Studio interface
   - Log in with your Sanity account

## Blog Post Schema

The blog post schema includes:
- **Title**: Post title
- **Slug**: URL-friendly identifier (auto-generated from title)
- **Published At**: Publication date
- **Summary**: Post summary/excerpt
- **Content**: Rich text content (portable text)
- **Tags**: Array of tags
- **Draft**: Boolean to mark posts as drafts

## Migrating Existing MDX Posts

To migrate existing MDX blog posts to Sanity:

1. Open Sanity Studio at `/studio`
2. Create a new Post document for each MDX file
3. Copy the frontmatter metadata to the Sanity fields
4. Convert the MDX content to portable text format in Sanity
5. Publish the posts

## Content Management

- **Create Posts**: Use the Sanity Studio interface at `/studio`
- **Edit Posts**: Click on any post in the Studio to edit
- **Draft Posts**: Toggle the "Draft" field to hide posts from the public site
- **Tags**: Add tags as an array of strings

## Technical Details

- Blog posts are fetched from Sanity using GROQ queries
- Portable text is converted to MDX format for rendering
- Images uploaded to Sanity are automatically optimized
- The blog system maintains backward compatibility with the existing structure


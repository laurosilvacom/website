import {cache} from 'react'
import {
	fetchAllPosts,
	fetchPostBySlug,
	fetchPublishedPosts,
	fetchPublishedSlugs
} from '@/lib/blog/repository'
import {type BlogPost} from './domain'

/**
 * Public, stable “blog service” API used by pages and routes.
 * Kept intentionally small and boring; complexity lives in repository/caching.
 */

/** Get all blog posts (including drafts). */
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
	return fetchAllPosts()
})

/** Get only published blog posts (excludes drafts). */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
	return fetchPublishedPosts()
})

/** Get a single blog post by slug. */
export const getBlogPostBySlug = cache(
	async (slug: string): Promise<BlogPost | null> => {
		return fetchPostBySlug(slug)
	}
)

/** Get all published blog post slugs (for generateStaticParams). */
export const getBlogPostSlugs = cache(async (): Promise<string[]> => {
	return fetchPublishedSlugs()
})

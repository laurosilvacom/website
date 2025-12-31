import {client} from '@/lib/sanity/client'
import {unstable_cache} from 'next/cache'
import {
	allPostsQuery,
	allPostsSlugsQuery,
	postBySlugQuery,
	postsQuery
} from './queries'
import {BLOG_CACHE_TAG, BLOG_REVALIDATE_SECONDS} from '@/lib/blog/config'
import {calculateReadingTime} from '@/lib/blog/utils'
import {type PortableTextBlock} from '@sanity/types'
import {type SanityImage} from '@/lib/sanity/types'
import {type BlogPost} from '@/lib/blog/domain'

interface SanityPost {
	_id: string
	title: string
	slug: {current: string}
	publishedAt: string
	summary: string
	heroImage?: SanityImage
	content: PortableTextBlock[]
	tags?: string[]
	draft?: boolean
	readingTime?: number
}

type SanitySlugResult = {slug: string}

function toDomainPost(post: SanityPost): BlogPost {
	const readingTime = post.readingTime
		? `${post.readingTime} min read`
		: calculateReadingTime(post.content)

	return {
		slug: post.slug.current,
		metadata: {
			title: post.title,
			publishedAt: post.publishedAt,
			summary: post.summary,
			tags: post.tags ?? [],
			draft: post.draft ?? false,
			readingTime
		},
		heroImage: post.heroImage,
		content: post.content
	}
}

function cached<T>(
	keyParts: string[],
	fn: () => Promise<T>,
	options?: {revalidate?: number; tags?: string[]}
): Promise<T> {
	const cachedFn = unstable_cache(fn, keyParts, {
		revalidate: options?.revalidate ?? BLOG_REVALIDATE_SECONDS,
		tags: options?.tags ?? [BLOG_CACHE_TAG]
	})
	return cachedFn()
}

export async function fetchPublishedPosts(): Promise<BlogPost[]> {
	try {
		const posts = await cached(['blog:posts:published'], () =>
			client.fetch<SanityPost[]>(postsQuery)
		)
		return posts.filter((p) => !p.draft).map(toDomainPost)
	} catch (error) {
		console.error('Error fetching published blog posts from Sanity:', error)
		return []
	}
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
	try {
		const posts = await cached(['blog:posts:all'], () =>
			client.fetch<SanityPost[]>(allPostsQuery)
		)
		return posts.map(toDomainPost)
	} catch (error) {
		console.error('Error fetching all blog posts from Sanity:', error)
		return []
	}
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const post = await cached(['blog:post', slug], () =>
			client.fetch<SanityPost | null>(postBySlugQuery, {slug})
		)
		if (!post) return null
		return toDomainPost(post)
	} catch (error) {
		console.error('Error fetching blog post from Sanity:', error)
		return null
	}
}

export async function fetchPublishedSlugs(): Promise<string[]> {
	try {
		const results = await cached(['blog:slugs:published'], () =>
			client.fetch<SanitySlugResult[]>(allPostsSlugsQuery)
		)
		return results.map((r) => r.slug).filter(Boolean)
	} catch (error) {
		console.error('Error fetching blog post slugs from Sanity:', error)
		return []
	}
}

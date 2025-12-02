import {cache} from 'react'
import {client} from './sanity/client'
import {postsQuery, postBySlugQuery, allPostsSlugsQuery} from './sanity/queries'
import {type BlogPost, type BlogMetadata} from './types'
import {type PortableTextBlock} from '@sanity/types'

function calculateReadingTime(content: PortableTextBlock[]): string {
	// Extract text from portable text blocks
	const text = content
		.map((block: any) => {
			if (block._type === 'block' && block.children) {
				return block.children.map((child: any) => child.text || '').join('')
			}
			return ''
		})
		.join(' ')
		.trim()

	const wordsPerMinute = 200
	const words = text.split(/\s+/).filter(Boolean).length
	const minutes = Math.ceil(words / wordsPerMinute)
	return `${minutes} min read`
}

interface SanityPost {
	_id: string
	title: string
	slug: {current: string}
	publishedAt: string
	summary: string
	content: PortableTextBlock[]
	tags?: string[]
	draft?: boolean
	readingTime?: number
}

function transformSanityPost(post: SanityPost): BlogPost {
	const readingTime = post.readingTime
		? `${post.readingTime} min read`
		: calculateReadingTime(post.content)

	return {
		slug: post.slug.current,
		metadata: {
			title: post.title,
			publishedAt: post.publishedAt,
			summary: post.summary,
			tags: post.tags || [],
			draft: post.draft || false,
			readingTime
		},
		content: post.content
	}
}

/**
 * Get all blog posts (including drafts)
 */
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
	try {
		const posts = await client.fetch<SanityPost[]>(postsQuery)
		return posts.map(transformSanityPost)
	} catch (error) {
		console.error('Error fetching blog posts from Sanity:', error)
		return []
	}
})

/**
 * Get only published blog posts (excludes drafts)
 */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
	try {
		const posts = await client.fetch<SanityPost[]>(postsQuery)
		return posts
			.filter((post) => !post.draft)
			.map(transformSanityPost)
	} catch (error) {
		console.error('Error fetching blog posts from Sanity:', error)
		return []
	}
})

/**
 * Get a single blog post by slug
 */
export const getBlogPostBySlug = cache(
	async (slug: string): Promise<BlogPost | null> => {
		try {
			const post = await client.fetch<SanityPost | null>(postBySlugQuery, {
				slug
			})
			if (!post) return null
			return transformSanityPost(post)
		} catch (error) {
			console.error('Error fetching blog post from Sanity:', error)
			return null
		}
	}
)

export function extractTagsFromPosts(posts: BlogPost[]): string[] {
	const tagsSet = new Set<string>()

	for (const post of posts) {
		if (post.metadata.tags?.length) {
			for (const tag of post.metadata.tags) {
				tagsSet.add(tag)
			}
		}
	}

	return Array.from(tagsSet).sort()
}

export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date()
	const dateToUse = date.includes('T') ? date : `${date}T00:00:00`
	const targetDate = new Date(dateToUse)

	const diffTime = currentDate.getTime() - targetDate.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	let formattedDate = ''

	if (diffDays >= 365) {
		formattedDate = `${Math.floor(diffDays / 365)}y ago`
	} else if (diffDays >= 30) {
		formattedDate = `${Math.floor(diffDays / 30)}mo ago`
	} else if (diffDays > 0) {
		formattedDate = `${diffDays}d ago`
	} else {
		formattedDate = 'Today'
	}

	const fullDate = targetDate.toLocaleDateString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})

	return includeRelative ? `${fullDate} (${formattedDate})` : fullDate
}

export function filterBlogPosts(
	posts: BlogPost[],
	options: {
		tagFilter?: string
		sortBy?: 'newest'
	}
): BlogPost[] {
	let filtered = [...posts]
	const {tagFilter = '', sortBy = 'newest'} = options

	if (tagFilter && tagFilter !== 'all') {
		filtered = filtered.filter((post) =>
			post.metadata.tags?.includes(tagFilter)
		)
	}

	if (sortBy === 'newest') {
		filtered.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			)
		})
	}

	return filtered
}


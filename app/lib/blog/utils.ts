import {type PortableTextBlock} from '@sanity/types'
import {type BlogPost} from './domain'

interface PortableTextChildWithText {
	text?: string
}

function isTextBlock(
	block: PortableTextBlock
): block is PortableTextBlock & {
	_type: 'block'
	children: PortableTextChildWithText[]
} {
	const maybe = block as unknown as {
		_type?: unknown
		children?: unknown
	}

	return maybe._type === 'block' && Array.isArray(maybe.children)
}

export function calculateReadingTime(content: PortableTextBlock[]): string {
	const text = content
		.map((block) => {
			if (isTextBlock(block)) {
				return block.children
					.map((child: PortableTextChildWithText) =>
						typeof child?.text === 'string' ? child.text : ''
					)
					.join('')
			}
			return ''
		})
		.join(' ')
		.trim()

	const wordsPerMinute = 200
	const words = text.split(/\s+/).filter(Boolean).length
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
	return `${minutes} min read`
}

export function sortPostsByPublishedAtDesc(posts: BlogPost[]): BlogPost[] {
	return [...posts].sort(
		(a, b) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
	)
}

export function extractTagsFromPosts(posts: BlogPost[]): string[] {
	const tagsSet = new Set<string>()
	for (const post of posts) {
		for (const tag of post.metadata.tags ?? []) {
			tagsSet.add(tag)
		}
	}
	return Array.from(tagsSet).sort()
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
		filtered = sortPostsByPublishedAtDesc(filtered)
	}

	return filtered
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

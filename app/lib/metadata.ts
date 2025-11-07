import {type Metadata} from 'next'
import {baseUrl} from 'app/sitemap'

// Utility function to properly join URLs
function joinUrl(base: string, path: string): string {
	const cleanBase = base.replace(/\/$/, '')
	const cleanPath = path.startsWith('/') ? path : `/${path}`
	return `${cleanBase}${cleanPath}`
}

type MetadataProps = {
	title?: string
	description?: string
	image?: string
	noIndex?: boolean
	canonical?: string
	keywords?: string[]
	publishedTime?: string
	modifiedTime?: string
	authors?: string[]
	section?: string
	tags?: string[]
	type?: 'website' | 'article'
}

export function createMetadata({
	title,
	description = 'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences. Because great software comes from understanding both the code and the people who write it.',
	image,
	noIndex = false,
	canonical,
	keywords = [],
	publishedTime,
	modifiedTime,
	authors = ['Lauro Silva'],
	section,
	tags = [],
	type = 'website'
}: MetadataProps = {}): Metadata {
	const metaTitle = title || 'Lauro Silva - Software Engineer & Developer Educator'

	const ogImage = image || `${joinUrl(baseUrl, 'og')}?title=${encodeURIComponent(title || 'Lauro Silva - Software Engineer & Developer Educator')}`

	const defaultKeywords = [
		'software engineer',
		'developer educator',
		'web development',
		'programming tutorials',
		'tech blog',
		'software development',
		'coding',
		'JavaScript',
		'TypeScript',
		'React',
		'Next.js',
		'developer experience',
		'technical writing'
	]

	const allKeywords = [...defaultKeywords, ...keywords, ...tags]

	return {
		title: metaTitle,
		description,
		keywords: allKeywords,
		authors: authors.map(author => ({name: author})),
		creator: 'Lauro Silva',
		publisher: 'Lauro Silva',
		openGraph: {
			title: metaTitle,
			description,
			url: canonical ? (canonical.startsWith('http') ? canonical : joinUrl(baseUrl, canonical)) : baseUrl,
			siteName: 'Lauro Silva',
			locale: 'en_US',
			type: type === 'article' ? 'article' : 'website',
			publishedTime,
			modifiedTime,
			section,
			tags,
			authors: type === 'article' ? authors : undefined,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: metaTitle,
					type: 'image/png'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: metaTitle,
			description,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: metaTitle
				}
			]
		},
		robots: {
			index: !noIndex,
			follow: !noIndex,
			googleBot: {
				index: !noIndex,
				follow: !noIndex,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1
			}
		},
		alternates: {
			canonical: canonical ? (canonical.startsWith('http') ? canonical : joinUrl(baseUrl, canonical)) : baseUrl
		}
	}
}

export function generatePageMetadata(
	title: string,
	description?: string,
	options?: Omit<MetadataProps, 'title' | 'description'>
): Metadata {
	return createMetadata({
		title,
		description,
		...options
	})
}

export function generateBlogPostMetadata(
	title: string,
	description: string,
	slug: string,
	publishedAt: string,
	tags?: string[]
): Metadata {
	return createMetadata({
		title,
		description,
		canonical: joinUrl(baseUrl, `/blog/${slug}`),
		publishedTime: publishedAt,
		modifiedTime: publishedAt,
		type: 'article',
		section: 'Technology',
		tags,
		keywords: ['blog post', 'tutorial', 'programming', ...tags || []]
	})
}
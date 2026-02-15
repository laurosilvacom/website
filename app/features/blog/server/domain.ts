import {type PortableTextBlock} from '@sanity/types'
import {type SanityImage} from '@/shared/integrations/sanity/types'

export type BlogTag = string

export type BlogPostMetadata = {
	title: string
	publishedAt: string
	summary: string
	tags: BlogTag[]
	draft: boolean
	readingTime?: string
}

export type BlogPost = {
	slug: string
	metadata: BlogPostMetadata
	content: PortableTextBlock[]
	heroImage?: SanityImage
}

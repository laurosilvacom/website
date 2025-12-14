export type BlogMetadata = {
	title: string
	publishedAt: string
	summary: string
	tags?: string[]
	draft?: boolean
	readingTime?: string
	image?: string
}

import {type PortableTextBlock} from '@sanity/types'

export type BlogPost = {
	metadata: BlogMetadata
	slug: string
	content: PortableTextBlock[]
}

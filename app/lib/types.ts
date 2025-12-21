export type BlogMetadata = {
	title: string
	publishedAt: string
	summary: string
	tags?: string[]
	draft?: boolean
	readingTime?: string
	image?: string
}

export type SanityImage = {
	alt?: string
	caption?: string
	asset?: {
		_id?: string
		url?: string
		metadata?: {
			lqip?: string
			dimensions?: {
				width?: number
				height?: number
				aspectRatio?: number
			}
		}
	}
}

import {type PortableTextBlock} from '@sanity/types'

export type BlogPost = {
	metadata: BlogMetadata
	slug: string
	content: PortableTextBlock[]
	heroImage?: SanityImage
}

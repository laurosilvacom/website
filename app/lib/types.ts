export type BlogMetadata = {
	title: string
	publishedAt: string
	summary: string
	icon?: string
	coverImage?: string
	image?: string
	description?: string
	gradient?: [string, string] | string
	readingTime?: string
	tags?: string[]
	draft?: boolean
}

export type BlogPost = {
	metadata: BlogMetadata
	slug: string
	content: string
}


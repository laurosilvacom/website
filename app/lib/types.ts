export type BlogMetadata = {
	title: string
	publishedAt: string
	summary: string
	tags?: string[]
	draft?: boolean
	readingTime?: string
}

export type BlogPost = {
	metadata: BlogMetadata
	slug: string
	content: string
}


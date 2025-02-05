export interface WorkshopMetadata {
	title: string
	description: string
	status: 'available' | 'coming-soon'
	price: string
	imageUrl: string
	highlights: string[]
	publishedAt: string
	duration: string
	topics: string[]
	videoUrl?: string
	curriculum: {
		title: string
		lessons: {
			title: string
			duration: string
		}[]
	}[]
}

export interface Workshop {
	slug: string
	metadata: WorkshopMetadata
	content: string
}

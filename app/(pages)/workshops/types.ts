export interface LessonMetadata {
	title: string
	number: number
	duration?: string // Made optional
	section: string
}

export interface Lesson {
	slug: string
	metadata: LessonMetadata
	content: string
}

export interface WorkshopMetadata {
	title: string
	description: string
	status?: string // Made optional since we're not displaying it
	imageUrl: string
	publishedAt: string
	highlights: string[]
	curriculum: {
		title: string
		lessons: {
			title: string
		}[]
	}[]
}

export interface Workshop {
	slug: string
	metadata: WorkshopMetadata
	content: string
}

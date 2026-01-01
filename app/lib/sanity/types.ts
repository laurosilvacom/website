import type {PortableTextBlock} from '@sanity/types'

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

export type SanityProductContributor = {
	contributor?: {
		_id: string
		name: string
		picture?: SanityImage
		bio?: string
	}
}

export type SanityEmailLessonPost = {
	_id: string
	title: string
	summary?: string
	slug?: {
		current: string
	}
	content?: PortableTextBlock[]
}

export type SanityModuleEmailLesson = {
	_key?: string
	subject?: string
	preheader?: string
	sendOffsetDays?: number
	post?: SanityEmailLessonPost
}

export type SanityModule = {
	_id: string
	title: string
	slug: {
		current: string
	}
	shortDescription?: string
	wipLandingPageDescription?: PortableTextBlock[]
	image?: SanityImage
	contributors?: SanityProductContributor[]
	audience?: {
		title: string
	}[]
	resendAudienceId?: string
	testSequence?: boolean
	emailLessons?: SanityModuleEmailLesson[]
}

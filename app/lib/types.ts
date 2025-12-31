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

export type SanityModule = {
	_id: string
	title: string
	slug: {
		current: string
	}
	shortDescription?: string
	wipLandingPageDescription?: any[]
	image?: SanityImage
	contributors?: SanityProductContributor[]
	audience?: {
		title: string
	}[]
	resendAudienceId?: string
}

export type SanityProductContributor = {
	contributor?: {
		_id: string
		name: string
		picture?: SanityImage
		bio?: string
	}
}

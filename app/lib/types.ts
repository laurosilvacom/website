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

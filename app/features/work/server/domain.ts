export type CaseStudyTestimonial = {
	quote: string
	name: string
	title: string
	image?: {
		asset?: {
			_id?: string
			url?: string
		}
	}
}

export type CaseStudy = {
	slug: string
	client: string
	title: string
	type: string
	domain?: string
	tags: string[]
	challenge: string[]
	approach: string[]
	outcome: string[]
	techStack: string[]
	testimonial?: CaseStudyTestimonial
}

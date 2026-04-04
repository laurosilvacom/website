import {defineQuery} from 'next-sanity'
import {groq} from 'next-sanity'

export const caseStudiesQuery = defineQuery(groq`
	*[_type == "caseStudy"] | order(order asc, _createdAt desc) {
		"slug": slug.current,
		client,
		title,
		type,
		domain,
		tags,
		techStack
	}
`)

export const caseStudyBySlugQuery = defineQuery(groq`
	*[_type == "caseStudy" && slug.current == $slug][0] {
		"slug": slug.current,
		client,
		title,
		type,
		domain,
		tags,
		challenge,
		approach,
		outcome,
		techStack,
		testimonial {
			quote,
			name,
			title,
			image {
				"asset": asset->{
					_id,
					url
				}
			}
		}
	}
`)

export const allCaseStudySlugsQuery = defineQuery(groq`
	*[_type == "caseStudy" && defined(slug.current)] {
		"slug": slug.current
	}
`)

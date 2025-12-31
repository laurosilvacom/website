import {groq} from 'next-sanity'

export const modulesQuery = groq`
	*[_type == "module"] | order(metadata.publishedAt desc) {
		...,
		slug,
		metadata,
		audience[]->,
		contributors[]{
			...,
			contributor->
		}
	}`

export const moduleBySlugQuery = groq`
	*[_type == "module" && slug.current == $slug][0] {
		...,
		slug,
		metadata,
		audience[]->,
		contributors[]{
			...,
			contributor->
		}
	}`

export const allModulesSlugsQuery = groq`
	*[_type == "module" && defined(slug.current)][]{
		"slug": slug.current
	}`

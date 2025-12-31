import {groq} from 'next-sanity'

export const modulesQuery = groq`
	*[_type == "module"] | order(metadata.publishedAt desc) {
		...,
		slug,
		metadata,
		image{
			...,
			"asset": asset->{
				_id,
				url,
				metadata{
					lqip,
					dimensions{
						width,
						height,
						aspectRatio
					}
				}
			}
		},
		audience[]->,
		contributors[]{
			...,
			contributor->{
				...,
				picture{
					...,
					"asset": asset->{
						_id,
						url,
						metadata{
							lqip,
							dimensions{
								width,
								height,
								aspectRatio
							}
						}
					}
				}
			}
		}
	}`

export const moduleBySlugQuery = groq`
	*[_type == "module" && slug.current == $slug][0] {
		...,
		slug,
		metadata,
		image{
			...,
			"asset": asset->{
				_id,
				url,
				metadata{
					lqip,
					dimensions{
						width,
						height,
						aspectRatio
					}
				}
			}
		},
		audience[]->,
		contributors[]{
			...,
			contributor->{
				...,
				picture{
					...,
					"asset": asset->{
						_id,
						url,
						metadata{
							lqip,
							dimensions{
								width,
								height,
								aspectRatio
							}
						}
					}
				}
			}
		}
	}`

export const allModulesSlugsQuery = groq`
	*[_type == "module" && defined(slug.current)][]{
		"slug": slug.current
	}`

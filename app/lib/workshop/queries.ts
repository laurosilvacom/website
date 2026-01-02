import {defineQuery} from 'next-sanity'
import {groq} from 'next-sanity'

export const modulesQuery = defineQuery(groq`
	*[_type == "module"] | order(_createdAt desc) {
		_id,
		title,
		slug,
		shortDescription,
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
				_id,
				name,
				bio,
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
	}`)

export const moduleBySlugQuery = defineQuery(groq`
	*[_type == "module" && slug.current == $slug][0] {
		_id,
		title,
		slug,
		shortDescription,
		wipLandingPageDescription,
		resendAudienceId,
		testSequence,
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
				_id,
				name,
				bio,
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
		},
		emailLessons[]{
			_key,
			subject,
			preheader,
			sendOffsetDays,
			post->{
				_id,
				title,
				summary,
				slug,
				content
			}
		}
	}`)

export const allModulesSlugsQuery = defineQuery(groq`
	*[_type == "module" && defined(slug.current)] {
		"slug": slug.current
	}`)

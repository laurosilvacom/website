import {defineQuery} from 'next-sanity'
import {groq} from 'next-sanity'

const sanityImageFields = groq`
  ...,
  alt,
  caption,
  "asset": asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions{width, height, aspectRatio}
    }
  }
`

const portableTextWithImages = groq`
  content[]{
    ...,
    _type == "image" => {
      ${sanityImageFields}
    }
  },
`

export const postsQuery =
	defineQuery(groq`*[_type == "post" && !draft] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  heroImage{ ${sanityImageFields} },
  tags,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`)

export const allPostsQuery =
	defineQuery(groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  heroImage{ ${sanityImageFields} },
  tags,
  draft,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`)

export const postBySlugQuery =
	defineQuery(groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  heroImage{ ${sanityImageFields} },
  ${portableTextWithImages}
  tags,
  draft,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`)

export const allPostsSlugsQuery =
	defineQuery(groq`*[_type == "post" && !draft && defined(slug.current)] {
  "slug": slug.current
}`)

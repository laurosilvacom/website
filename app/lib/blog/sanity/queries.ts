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

export const postsQuery = groq`*[_type == "post" && !draft] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  heroImage{ ${sanityImageFields} },
  ${portableTextWithImages}
  tags,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`

export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
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
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
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
}`

export const allPostsSlugsQuery = groq`*[_type == "post" && !draft] {
  "slug": slug.current
}`

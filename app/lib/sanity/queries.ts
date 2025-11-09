import {groq} from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && !draft] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  content,
  tags,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  summary,
  content,
  tags,
  draft,
  "readingTime": round(length(pt::text(content)) / 5 / 180 )
}`

export const allPostsSlugsQuery = groq`*[_type == "post" && !draft] {
  "slug": slug.current
}`


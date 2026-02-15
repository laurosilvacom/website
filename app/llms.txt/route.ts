import {baseUrl} from '@/app/sitemap'
import {getBlogPosts} from '@/features/blog/server'

export const revalidate = 1800

export async function GET() {
	const posts = await getBlogPosts()
	const latest = [...posts]
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime(),
		)
		.slice(0, 12)

	const text = [
		'# Lauro Silva',
		'',
		'> Senior full-stack engineer and developer educator.',
		'',
		'## Site',
		baseUrl,
		'',
		'## Focus Areas',
		'- Full-stack web development (React, Next.js, TypeScript)',
		'- Architecture and technical leadership',
		'- Developer education and workshops',
		'',
		'## Important URLs',
		`- Home: ${baseUrl}/`,
		`- About: ${baseUrl}/about`,
		`- Blog: ${baseUrl}/blog`,
		`- Work: ${baseUrl}/work`,
		`- Workshops: ${baseUrl}/workshops`,
		`- Services: ${baseUrl}/services`,
		'',
		'## Machine-Readable Feeds',
		`- Sitemap: ${baseUrl}/sitemap.xml`,
		`- RSS: ${baseUrl}/blog/rss.xml`,
		`- JSON Feed: ${baseUrl}/feed.json`,
		`- Full LLM Index: ${baseUrl}/llms-full.txt`,
		'',
		'## Latest Articles',
		...latest.map(
			(post) =>
				`- ${post.metadata.title} (${post.metadata.publishedAt}): ${baseUrl}/blog/${post.slug}`,
		),
		'',
	].join('\n')

	return new Response(text, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
		},
	})
}

import {baseUrl} from '@/app/sitemap'
import {getBlogPosts} from '@/features/blog/server'

export const revalidate = 1800

export async function GET() {
	const posts = await getBlogPosts()
	const sorted = [...posts].sort(
		(a, b) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime(),
	)

	const lines = [
		'# Lauro Silva - Full Content Index',
		'',
		`Source: ${baseUrl}`,
		`Generated: ${new Date().toISOString()}`,
		'',
		'## Articles',
		...sorted.flatMap((post) => [
			`### ${post.metadata.title}`,
			`URL: ${baseUrl}/blog/${post.slug}`,
			`Published: ${post.metadata.publishedAt}`,
			`Tags: ${(post.metadata.tags ?? []).join(', ') || 'none'}`,
			`Summary: ${post.metadata.summary}`,
			'',
		]),
	].join('\n')

	return new Response(lines, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
		},
	})
}

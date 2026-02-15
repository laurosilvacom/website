import {baseUrl} from '@/app/sitemap'
import {getBlogPosts} from '@/features/blog/server'
import {getSanityImageUrl} from '@/shared/integrations/sanity/image'

export const revalidate = 1800

export async function GET() {
	const posts = await getBlogPosts()
	const sortedPosts = [...posts].sort(
		(a, b) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime(),
	)

	const feed = {
		version: 'https://jsonfeed.org/version/1.1',
		title: "Lauro Silva's Blog",
		home_page_url: baseUrl,
		feed_url: `${baseUrl}/feed.json`,
		description:
			'Technical writing on software architecture, modern React/Next.js, and developer education.',
		language: 'en-US',
		authors: [{name: 'Lauro Silva', url: baseUrl}],
		items: sortedPosts.map((post) => ({
			id: `${baseUrl}/blog/${post.slug}`,
			url: `${baseUrl}/blog/${post.slug}`,
			title: post.metadata.title,
			summary: post.metadata.summary,
			content_text: post.metadata.summary,
			date_published: new Date(post.metadata.publishedAt).toISOString(),
			tags: post.metadata.tags ?? [],
			image: getSanityImageUrl(post.heroImage, {
				width: 1200,
				height: 630,
				quality: 75,
				fit: 'crop',
			}),
		})),
	}

	return Response.json(feed, {
		headers: {
			'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
		},
	})
}

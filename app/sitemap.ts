import {getBlogPosts} from '@/features/blog/server'

export const baseUrl = 'https://website-red-alpha-10.vercel.app'

export default async function sitemap() {
	const posts = await getBlogPosts()

	const blogs = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}))

	const staticRoutes = [
		'',
		'/about',
		'/blog',
		'/blog/rss.xml',
		'/feed.json',
		'/llms.txt',
		'/llms-full.txt',
		'/newsletter',
		'/services',
		'/services/athletes',
		'/services/companies',
		'/tags',
		'/teaching',
		'/work',
		'/workshops',
	]

	const routes = staticRoutes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}))

	return [...routes, ...blogs]
}

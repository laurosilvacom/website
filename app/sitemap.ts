import {getBlogPosts} from 'app/blog/utils'

export const baseUrl = 'https://website-red-alpha-10.vercel.app/'

export default async function sitemap() {
	const posts = await getBlogPosts()

	const blogs = posts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt
	}))

	const routes = ['', '/blog'].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split('T')[0]
	}))

	return [...routes, ...blogs]
}

import {getBlogPosts} from '@/lib/blog'

export async function GET() {
	const posts = await getBlogPosts()
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laurosilva.com'

	// Sort by newest first
	const sortedPosts = posts.sort((a: any, b: any) => {
		return (
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
		)
	})

	// Build RSS XML
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Lauro Silva's Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Writing on web development, React, and design</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${sortedPosts
			.map(
				(post: any) => `
    <item>
      <title><![CDATA[${post.metadata.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.metadata.summary}]]></description>
      ${post.metadata.tags ? post.metadata.tags.map((tag: string) => `<category>${tag}</category>`).join('') : ''}
      <content:encoded><![CDATA[${post.metadata.summary}]]></content:encoded>
    </item>`
			)
			.join('')}
  </channel>
</rss>`

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600, s-maxage=18000'
		}
	})
}

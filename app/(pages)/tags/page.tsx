import Link from 'next/link'
import Container from '@/components/container'
import {getBlogPosts, extractTagsFromPosts} from '@/lib/blog'

export const metadata = {
	title: 'Blog Tags',
	description: 'Browse writing by tag'
}

export default async function TagsPage() {
	const posts = await getBlogPosts()
	const allTags = extractTagsFromPosts(posts)

	// Get tag counts
	const tagCounts = allTags.reduce(
		(acc, tag) => {
			const count = posts.filter((post: any) =>
				post.metadata.tags?.includes(tag)
			).length
			acc[tag] = count
			return acc
		},
		{} as Record<string, number>
	)

	return (
		<>
			<section className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-border">
				<Container size="xl">
					<div className="space-y-6">
						<Link
							href="/blog"
							className="text-muted-foreground inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors mb-4">
							← Back to writing
						</Link>
						<h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight max-w-5xl">
							Tags
						</h1>
						<p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
							Browse writing by topic
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container size="xl">
					<div className="flex flex-wrap gap-3">
						{allTags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${encodeURIComponent(tag)}`}
								className="group bg-card hover:bg-muted text-foreground border border-border hover:border-border rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300">
								{tag} <span className="text-muted-foreground">({tagCounts[tag]})</span>
							</Link>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}

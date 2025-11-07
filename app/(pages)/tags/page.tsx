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
			const count = posts.filter((post) =>
				post.metadata.tags?.includes(tag)
			).length
			acc[tag] = count
			return acc
		},
		{} as Record<string, number>
	)

	return (
		<Container>
			<main className="py-16">
				<section className="mb-14">
					<Link
						href="/blog"
						className="text-muted-foreground mb-5 inline-block text-sm hover:text-foreground transition-colors">
						← Back to writing
					</Link>

					<h1 className="mb-3 text-2xl font-semibold leading-tight">
						Tags
					</h1>
					<p className="text-muted-foreground text-lg leading-relaxed">
						Browse writing by topic
					</p>
				</section>

				<section>
					<div className="flex flex-wrap gap-3">
						{allTags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${encodeURIComponent(tag)}`}
								className="bg-card hover:bg-secondary/80 text-foreground border-border rounded-full border px-4 py-1.5 text-sm font-medium transition-colors">
								{tag} ({tagCounts[tag]})
							</Link>
						))}
					</div>
				</section>
			</main>
		</Container>
	)
}

import Link from 'next/link'
import {getBlogPosts, extractTagsFromPosts} from '@/app/(pages)/blog/utils'
import Container from '@/app/components/container'

export const metadata = {
	title: 'Blog Tags',
	description: 'Browse articles by tag'
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
		<Container className="mx-auto w-full max-w-screen-xl">
			<main className="mx-auto py-12">
				<section className="mb-10">
					<Link
						href="/blog"
						className="text-primary mb-6 inline-block hover:opacity-80">
						← Back to all posts
					</Link>

					<h1 className="mb-4 text-4xl font-semibold tracking-tight">
						Browse by Tag
					</h1>
					<div className="text-muted-foreground space-y-4 text-xl">
						<p className="leading-relaxed">Find articles on specific topics</p>
					</div>
				</section>

				<section>
					<div className="flex flex-wrap gap-4">
						{allTags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${encodeURIComponent(tag)}`}
								className="bg-card hover:bg-secondary/80 text-foreground border-border rounded-full border px-5 py-2 text-sm font-medium transition">
								{tag} ({tagCounts[tag]})
							</Link>
						))}
					</div>
				</section>
			</main>
		</Container>
	)
}

import Link from 'next/link'
import Container from '@/shared/components/container'
import {getBlogPosts, extractTagsFromPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {ArrowLeft, ArrowRight} from 'lucide-react'

export const metadata = {
	title: 'Tags',
	description: 'Browse writing by topic',
}

export default async function TagsPage() {
	const posts = await getBlogPosts()
	const allTags = extractTagsFromPosts(posts)

	const tagCounts = allTags.reduce(
		(acc, tag) => {
			const count = posts.filter((post: BlogPost) =>
				post.metadata.tags?.includes(tag),
			).length
			acc[tag] = count
			return acc
		},
		{} as Record<string, number>,
	)

	const sortedTags = allTags.sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="max-w-2xl space-y-4">
						<Link
							href="/blog"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
							<ArrowLeft className="h-3 w-3" />
							Writing
						</Link>
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Topics
						</h1>
						<p className="text-muted-foreground text-lg">
							{allTags.length} topics across {posts.length} posts
						</p>
					</div>
				</Container>
			</section>

			{/* All tags */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						All Topics
					</h2>
					<div className="divide-border mt-4 divide-y">
						{sortedTags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${encodeURIComponent(tag)}`}
								className="group flex items-center justify-between gap-4 py-3 transition-opacity hover:opacity-70">
								<span className="text-foreground text-sm font-medium">
									{tag}
								</span>
								<div className="flex shrink-0 items-center gap-3">
									<span className="text-muted-foreground font-mono text-[10px]">
										{tagCounts[tag]} {tagCounts[tag] === 1 ? 'post' : 'posts'}
									</span>
									<ArrowRight className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
								</div>
							</Link>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}

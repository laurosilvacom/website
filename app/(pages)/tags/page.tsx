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
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<Link
							href="/blog"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
							<ArrowLeft className="h-3 w-3" />
							Writing
						</Link>
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
							Topics
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							{allTags.length} topics across {posts.length} posts
						</p>
					</div>
				</Container>
			</section>

			{/* All tags */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="space-y-1">
						{sortedTags.map((tag) => (
							<Link
								key={tag}
								href={`/tags/${encodeURIComponent(tag)}`}
								className="group flex items-center justify-between gap-4 py-3 transition-opacity hover:opacity-70">
								<span className="text-foreground text-sm font-medium">{tag}</span>
								<div className="flex shrink-0 items-center gap-3">
									<span className="font-mono text-xs tabular-nums text-muted-foreground">
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

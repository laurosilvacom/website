import Link from 'next/link'
import Container from '@/shared/components/container'
import {getBlogPosts, extractTagsFromPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'

export const metadata = {
	title: 'Tags',
	description: 'Browse writing by topic',
}

export default async function TagsPage() {
	const posts = await getBlogPosts()
	const allTags = extractTagsFromPosts(posts)

	// Get tag counts and sort by count
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

	// Sort tags by count (descending)
	const sortedTags = allTags.sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))

	return (
		<>
			{/* Hero */}
			<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
				<Container width="base">
					<div className="mx-auto max-w-3xl space-y-8 text-center">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
									Topics
								</span>
							</div>
							<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
								Explore by Tag
							</h1>
							<p className="text-muted-foreground text-xl leading-relaxed">
								Browse {allTags.length} topics across {posts.length} writings
							</p>
						</div>
						<div className="pt-4">
							<Link
								href="/blog"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
								← Back to all writing
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Tags Grid */}
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="space-y-12">
						{/* Popular Tags */}
						<div className="space-y-6">
							<h2 className="text-lg font-semibold tracking-tight">Popular Topics</h2>
							<div className="flex flex-wrap gap-3">
								{sortedTags.slice(0, 6).map((tag) => (
									<Link
										key={tag}
										href={`/tags/${encodeURIComponent(tag)}`}
										className="group border-border hover:border-primary/50 bg-muted/50 hover:bg-muted relative overflow-hidden rounded-2xl border px-6 py-4 transition-all duration-300">
										<div className="relative space-y-1">
											<div className="flex items-baseline gap-2">
												<span className="text-foreground text-base font-semibold">
													{tag}
												</span>
												<span className="text-muted-foreground text-xs">
													({tagCounts[tag]})
												</span>
											</div>
											<div className="text-muted-foreground text-xs">
												{tagCounts[tag] === 1 ? '1 post' : `${tagCounts[tag]} posts`}
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>

						{/* All Tags */}
						<div className="border-border space-y-6 border-t pt-12">
							<h2 className="text-lg font-semibold tracking-tight">All Topics</h2>
							<div className="flex flex-wrap gap-2.5">
								{sortedTags.map((tag) => (
									<Link
										key={tag}
										href={`/tags/${encodeURIComponent(tag)}`}
										className="border-border hover:border-foreground/20 hover:bg-muted/50 group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all">
										<span className="text-foreground font-medium">{tag}</span>
										<span className="text-muted-foreground text-xs">
											{tagCounts[tag]}
										</span>
									</Link>
								))}
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

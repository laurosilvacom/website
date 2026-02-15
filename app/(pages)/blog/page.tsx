import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {ArrowRight} from 'lucide-react'

export const revalidate = 30

export const metadata = {
	title: 'Writing',
	description:
		'Thoughts, ideas, and explorations at the intersection of technology and the outdoor industry.',
}

export default async function BlogPage() {
	const posts = await getBlogPosts()

	if (!posts) {
		return (
			<section className="py-32">
				<Container width="base">
					<p className="text-muted-foreground">No posts found.</p>
				</Container>
			</section>
		)
	}

	const sortedPosts = posts.sort(
		(a: BlogPost, b: BlogPost) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime(),
	)

	// Group posts by year
	const postsByYear = sortedPosts.reduce<Record<string, BlogPost[]>>(
		(acc, post) => {
			const year = new Date(post.metadata.publishedAt).getFullYear().toString()
			if (!acc[year]) acc[year] = []
			acc[year].push(post)
			return acc
		},
		{},
	)

	const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Writing
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Thoughts, ideas, and explorations at the intersection of technology
							and the outdoor industry.
						</p>
						<div className="flex items-center gap-4 pt-2">
							<Link
								href="/blog/rss.xml"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								RSS Feed
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
							<Link
								href="/newsletter"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								Newsletter
								<ArrowRight className="h-3.5 w-3.5" />
							</Link>
						</div>
					</div>
				</Container>
			</section>

			{/* Divider */}
			<div className="border-border border-t" />

			{/* Posts by year */}
			{years.map((year) => (
				<section key={year} className="border-border border-b py-16 lg:py-20">
					<Container width="base">
						<h2 className="text-sm font-semibold uppercase tracking-wider">
							{year}
						</h2>
						<div className="divide-border mt-4 divide-y">
							{postsByYear[year].map((post: BlogPost) => (
								<Link
									key={post.slug}
									href={`/blog/${post.slug}`}
									prefetch
									className="group flex items-center justify-between gap-4 py-4 transition-opacity hover:opacity-70">
									<div className="min-w-0 space-y-1">
										<span className="text-foreground text-sm font-medium">
											{post.metadata.title}
										</span>
										<p className="text-muted-foreground line-clamp-1 text-xs">
											{post.metadata.summary}
										</p>
									</div>
									<div className="flex shrink-0 items-center gap-3">
										<span className="text-muted-foreground hidden font-mono text-[10px] sm:inline">
											{formatDate(post.metadata.publishedAt)}
										</span>
										<ArrowRight className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
									</div>
								</Link>
							))}
						</div>
					</Container>
				</section>
			))}
		</>
	)
}

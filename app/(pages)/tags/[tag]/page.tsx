import Link from 'next/link'
import {notFound} from 'next/navigation'
import Container from '@/shared/components/container'
import {formatDate} from '@/features/blog/server'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {type Metadata} from 'next'
import {getBlogPosts, extractTagsFromPosts, filterBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'

interface TagPageProps {
	params: Promise<{
		tag: string
	}>
}

export async function generateMetadata({params}: TagPageProps): Promise<Metadata> {
	const resolvedParams = await params
	const tag = decodeURIComponent(resolvedParams.tag)

	return {
		title: `${tag}`,
		description: `Writing tagged with ${tag}`,
	}
}

export async function generateStaticParams() {
	const posts = await getBlogPosts()
	const tags = extractTagsFromPosts(posts)

	return tags.map((tag) => ({
		tag: tag,
	}))
}

export default async function TagPage({params}: TagPageProps) {
	const resolvedParams = await params
	const tag = decodeURIComponent(resolvedParams.tag)
	const allPosts = await getBlogPosts()
	const allTags = extractTagsFromPosts(allPosts)

	if (!allTags.includes(tag)) {
		notFound()
	}

	const taggedPosts = filterBlogPosts(allPosts, {
		tagFilter: tag,
		sortBy: 'newest',
	})

	const relatedTagsMap = new Map<string, number>()
	taggedPosts.forEach((post: BlogPost) => {
		post.metadata.tags?.forEach((t: string) => {
			if (t !== tag) {
				relatedTagsMap.set(t, (relatedTagsMap.get(t) || 0) + 1)
			}
		})
	})

	const relatedTags = Array.from(relatedTagsMap.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([t]) => t)

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="max-w-2xl space-y-4">
						<Link
							href="/tags"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
							<ArrowLeft className="h-3 w-3" />
							All topics
						</Link>

						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							{tag}
						</h1>
						<p className="text-muted-foreground text-lg">
							{taggedPosts.length}{' '}
							{taggedPosts.length === 1 ? 'post' : 'posts'}
						</p>
					</div>
				</Container>
			</section>

			{/* Related tags */}
			{relatedTags.length > 0 && (
				<section className="border-border border-y">
					<Container width="base">
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-5">
							<span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
								Related
							</span>
							{relatedTags.map((relatedTag) => (
								<Link
									key={relatedTag}
									href={`/tags/${encodeURIComponent(relatedTag)}`}
									className="text-foreground/80 hover:text-foreground text-sm font-medium transition-colors">
									{relatedTag}
								</Link>
							))}
						</div>
					</Container>
				</section>
			)}

			{/* Posts */}
			<section className="py-16 lg:py-20">
				<Container width="base">
					<h2 className="text-sm font-semibold uppercase tracking-wider">
						Posts
					</h2>
					<div className="divide-border mt-4 divide-y">
						{taggedPosts.map((post: BlogPost) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
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
										{formatDate(post.metadata.publishedAt, false)}
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

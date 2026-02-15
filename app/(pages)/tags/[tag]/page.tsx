import Link from 'next/link'
import {notFound} from 'next/navigation'
import Container from '@/components/container'
import {formatDate} from '@/lib/blog'
import {ArrowRight} from 'lucide-react'
import {type Metadata} from 'next'
import {getBlogPosts, extractTagsFromPosts, filterBlogPosts} from '@/lib/blog'
import {type BlogPost} from '@/lib/blog'

interface TagPageProps {
	params: Promise<{
		tag: string
	}>
}

export async function generateMetadata({
	params
}: TagPageProps): Promise<Metadata> {
	const resolvedParams = await params
	const tag = decodeURIComponent(resolvedParams.tag)

	return {
		title: `${tag}`,
		description: `Writing tagged with ${tag}`
	}
}

export async function generateStaticParams() {
	const posts = await getBlogPosts()
	const tags = extractTagsFromPosts(posts)

	return tags.map((tag) => ({
		tag: tag
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
		sortBy: 'newest'
	})

	// Get related tags (tags that appear in same posts)
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
			{/* Hero */}
			<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
				<Container width="base">
					<div className="mx-auto max-w-3xl space-y-8 text-center">
						<div className="space-y-4">
							<Link
								href="/tags"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors">
								← All topics
							</Link>
							<div className="space-y-3">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground font-mono text-xs font-medium tracking-wide uppercase">
										Topic
									</span>
								</div>
								<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
									{tag}
								</h1>
								<p className="text-muted-foreground text-xl leading-relaxed">
									{taggedPosts.length}{' '}
									{taggedPosts.length === 1 ? 'writing' : 'writings'}
								</p>
							</div>
						</div>

						{/* Related Tags */}
						{relatedTags.length > 0 && (
							<div className="border-border border-t pt-8">
								<div className="space-y-4">
									<p className="text-muted-foreground text-sm font-medium">
										Related topics
									</p>
									<div className="flex flex-wrap justify-center gap-2">
										{relatedTags.map((relatedTag) => (
											<Link
												key={relatedTag}
												href={`/tags/${encodeURIComponent(relatedTag)}`}
												className="border-border hover:border-foreground/20 hover:bg-muted/50 rounded-full border px-3 py-1.5 text-xs font-medium transition-all">
												{relatedTag}
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</Container>
			</section>

			{/* Posts Grid */}
			<section className="py-24 lg:py-32">
				<Container width="wide">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
						{taggedPosts.map((post: BlogPost, index: number) => (
							<article
								key={post.slug}
								className="group relative"
								style={{
									animationDelay: `${index * 50}ms`
								}}>
								<Link href={`/blog/${post.slug}`} className="block h-full">
									<div className="flex h-full flex-col">
										<div className="mb-4">
											<time className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
												{formatDate(post.metadata.publishedAt, false)}
											</time>
										</div>
										<h2 className="group-hover:text-primary mb-3 text-xl leading-tight font-semibold transition-colors lg:text-2xl">
											{post.metadata.title}
										</h2>
										<p className="text-muted-foreground mb-4 line-clamp-3 grow text-sm leading-relaxed lg:text-base">
											{post.metadata.summary}
										</p>
										<div className="text-primary flex items-center text-sm font-medium transition-all group-hover:gap-2">
											Read more
											<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}

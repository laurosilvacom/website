import Link from 'next/link'
import {notFound} from 'next/navigation'
import Container from '@/shared/components/container'
import {formatDate} from '@/features/blog/server'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import {type Metadata} from 'next'
import {getBlogPosts, extractTagsFromPosts, filterBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {Button} from '@/shared/ui/button'

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
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/tags" className="inline-flex items-center gap-1.5">
								<ArrowLeft className="h-3 w-3" />
								All topics
							</Link>
						</Button>

						<h1 className="type-page-title">
							{tag}
						</h1>
						<p className="type-page-intro">
							{taggedPosts.length} {taggedPosts.length === 1 ? 'post' : 'posts'}
						</p>
					</div>
				</Container>
			</section>

			{/* Related tags */}
			{relatedTags.length > 0 && (
				<section className="pb-6">
					<Container>
						<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
							<span className="type-meta">Related</span>
							{relatedTags.map((relatedTag) => (
								<Button
									key={relatedTag}
									asChild
									variant="link"
									size="sm"
									className="type-item-title text-foreground/80 hover:text-foreground h-auto px-0 transition-colors">
									<Link href={`/tags/${encodeURIComponent(relatedTag)}`}>{relatedTag}</Link>
								</Button>
							))}
						</div>
					</Container>
				</section>
			)}

			{/* Posts */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="space-y-1">
						{taggedPosts.map((post: BlogPost) => (
							<Button
								key={post.slug}
								asChild
								variant="ghost"
								size="sm"
								className="group h-auto w-full justify-between gap-4 px-0 py-4 transition-opacity hover:opacity-70">
								<Link href={`/blog/${post.slug}`}>
									<div className="min-w-0 space-y-1 text-left">
										<span className="type-item-title">{post.metadata.title}</span>
										<p className="type-meta line-clamp-1">{post.metadata.summary}</p>
									</div>
									<div className="flex shrink-0 items-center gap-3">
										<span className="type-meta hidden font-mono tabular-nums sm:inline">
											{formatDate(post.metadata.publishedAt, false)}
										</span>
										<ArrowRight className="text-muted-foreground h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
									</div>
								</Link>
							</Button>
						))}
					</div>
				</Container>
			</section>
		</>
	)
}

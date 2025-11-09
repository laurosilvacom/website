import Link from 'next/link'
import {notFound} from 'next/navigation'
import Container from '@/components/container'
import {formatDate} from '@/lib/blog'
import {ArrowRight} from 'lucide-react'
import {type Metadata} from 'next'
import {
	getBlogPosts,
	extractTagsFromPosts,
	filterBlogPosts
} from '@/lib/blog'

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
		title: `${tag} - Blog Posts`,
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

	return (
		<>
			<section className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-border/50">
				<Container size="lg">
					<div className="space-y-6">
						<Link
							href="/blog"
							className="text-muted-foreground inline-flex items-center gap-2 text-sm hover:text-foreground transition-colors mb-4">
							← Back to all posts
						</Link>
						<h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
							Posts tagged with &ldquo;{tag}&rdquo;
						</h1>
						<p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
							{taggedPosts.length} writing{taggedPosts.length !== 1 ? 's' : ''} with this tag
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container size="lg">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
						{taggedPosts.map((post: any, index: number) => (
							<article
								key={post.slug}
								className="group relative"
								style={{
									animationDelay: `${index * 50}ms`
								}}>
								<Link
									href={`/blog/${post.slug}`}
									className="block h-full">
									<div className="flex flex-col h-full">
										<div className="mb-4">
											<time className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
												{formatDate(post.metadata.publishedAt, false)}
											</time>
										</div>
										<h2 className="text-xl lg:text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
											{post.metadata.title}
										</h2>
										<p className="text-muted-foreground text-sm lg:text-base leading-relaxed flex-grow mb-4 line-clamp-3">
											{post.metadata.summary}
										</p>
										<div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
											Read more
											<ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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

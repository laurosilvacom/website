import Link from 'next/link'
import {notFound} from 'next/navigation'
import {
	formatDate,
	getBlogPosts,
	extractTagsFromPosts
} from '@/app/(pages)/blog/utils'
import Container from '@/app/components/container'
import {Card} from '@/app/components/card'
import {CardGrid} from '@/app/components/card-grid'
import {TagFooter} from '@/app/components/tag-footer'
import {type Metadata} from 'next'

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
		description: `Articles tagged with ${tag}`
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

	// Verify the tag exists
	if (!allTags.includes(tag)) {
		notFound()
	}

	// Filter posts by tag
	const taggedPosts = allPosts.filter((post) =>
		post.metadata.tags?.includes(tag)
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
						Posts tagged with &ldquo;{tag}&rdquo;
					</h1>
					<div className="text-muted-foreground space-y-4 text-xl">
						<p className="leading-relaxed">
							{taggedPosts.length} article{taggedPosts.length !== 1 ? 's' : ''}{' '}
							with this tag
						</p>
					</div>
				</section>

				<section>
					{taggedPosts.length > 0 ? (
						<CardGrid>
							{taggedPosts.map((post) => (
								<Card
									key={post.slug}
									href={`/blog/${post.slug}`}
									title={post.metadata.title}
									description={
										post.metadata.description || post.metadata.summary
									}
									icon={post.metadata.icon}
									date={formatDate(post.metadata.publishedAt, false)}
									footer={
										post.metadata.tags && post.metadata.tags.length > 0 ? (
											<TagFooter tags={post.metadata.tags} />
										) : undefined
									}
								/>
							))}
						</CardGrid>
					) : (
						<div className="bg-muted/30 rounded-lg p-10 text-center">
							<h3 className="mb-2 text-xl font-medium">No articles found</h3>
							<p className="text-muted-foreground mb-4">
								No articles with the tag &ldquo;{tag}&rdquo;.
							</p>
							<Link
								href="/blog"
								className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
								View All Posts
							</Link>
						</div>
					)}
				</section>
			</main>
		</Container>
	)
}

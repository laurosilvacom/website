import Link from 'next/link'
import {notFound} from 'next/navigation'
import Container from '@/components/container'
import {Card} from '@/components/card'
import {TagFooter} from '@/components/tag-footer'
import {formatDate} from '@/lib/blog'
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
		<Container>
			<main className="py-16">
				<section className="mb-14">
					<Link
						href="/blog"
						className="text-muted-foreground mb-5 inline-block text-sm hover:text-foreground transition-colors">
						← Back to all posts
					</Link>

					<h1 className="mb-3 text-2xl font-normal leading-relaxed">
						Posts tagged with &ldquo;{tag}&rdquo;
					</h1>
					<p className="text-muted-foreground text-lg leading-relaxed">
						{taggedPosts.length} writing{taggedPosts.length !== 1 ? 's' : ''}{' '}
						with this tag
					</p>
				</section>

				<section>
					<div className="space-y-10">
						{taggedPosts.map((post) => (
							<Card
								key={post.slug}
								href={`/blog/${post.slug}`}
								title={post.metadata.title}
								description={post.metadata.summary}
								date={formatDate(post.metadata.publishedAt, false)}
								footer={
									post.metadata.tags && post.metadata.tags.length > 0 ? (
										<TagFooter tags={post.metadata.tags} />
									) : undefined
								}
							/>
						))}
					</div>
				</section>
			</main>
		</Container>
	)
}

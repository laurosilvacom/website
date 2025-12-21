import Link from 'next/link'
import Container from '@/components/container'
import {formatDate, getBlogPosts} from '@/lib/blog'
import {type BlogPost} from '@/lib/blog'

export const revalidate = 300 // Revalidate every 5 minutes

export const metadata = {
	title: 'Writing',
	description: 'Thoughts on software, design, and building products.'
}

export default async function BlogPage() {
	const posts = await getBlogPosts()

	// Fix TS issue: Handle potential undefined/null return
	if (!posts) {
		return (
			<section className="py-32">
				<Container width="narrow">
					<p className="text-muted-foreground text-center">No posts found.</p>
				</Container>
			</section>
		)
	}

	const sortedPosts = posts.sort(
		(a: BlogPost, b: BlogPost) =>
			new Date(b.metadata.publishedAt).getTime() -
			new Date(a.metadata.publishedAt).getTime()
	)

	return (
		<>
			<section className="border-border border-b pt-32 pb-16 lg:pt-40 lg:pb-24">
				<Container width="narrow">
					<div className="space-y-6 text-center">
						<h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
							Writing
						</h1>
						<p className="text-muted-foreground mx-auto max-w-lg text-lg leading-relaxed">
							Thoughts, ideas, and explorations at the intersection of
							technology and the outdoor industry.
						</p>
					</div>
				</Container>
			</section>

			<section className="py-16 lg:py-24">
				<Container width="narrow">
					<div className="space-y-16">
						{sortedPosts.map((post: BlogPost) => (
							<article
								key={post.slug}
								className="group relative flex flex-col gap-2">
								<Link href={`/blog/${post.slug}`} className="block space-y-3">
									<div className="text-muted-foreground flex items-center gap-2 text-sm">
										<time dateTime={post.metadata.publishedAt}>
											{formatDate(post.metadata.publishedAt)}
										</time>
									</div>

									<h2 className="text-foreground group-hover:text-primary text-2xl leading-tight font-bold transition-colors md:text-3xl">
										{post.metadata.title}
									</h2>

									<p className="text-muted-foreground line-clamp-3 text-base leading-relaxed md:text-lg">
										{post.metadata.summary}
									</p>

									<div className="text-primary pt-2 text-sm font-medium underline-offset-4 group-hover:underline">
										Read full post
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

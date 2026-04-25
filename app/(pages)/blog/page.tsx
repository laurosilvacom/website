import Link from 'next/link'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {Button} from '@/shared/ui/button'

export const revalidate = 30

export const metadata = {
	title: 'Writing',
	description:
		'Engineering notes on React, Next.js, TypeScript, developer education, and shipping production software.',
}

export default async function BlogPage() {
	const posts = await getBlogPosts()

	if (!posts) {
		return (
			<section className="py-32">
				<Container>
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

	return (
		<>
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="type-page-title">
							Writing
						</h1>
						<p className="type-page-intro">
							Engineering notes on building production software, teaching developers, and
							improving team workflows.{' '}
							<Button asChild variant="link" size="sm" className="h-auto px-0">
								<Link href="/blog/rss.xml">RSS</Link>
							</Button>
						</p>
					</div>
				</Container>
			</section>

			<section className="pb-24 lg:pb-32">
				<Container>
					<div className="space-y-6">
						{sortedPosts.map((post: BlogPost) => (
							<Button
								key={post.slug}
								asChild
								variant="ghost"
								size="sm"
								className="group h-auto w-full justify-start px-0 text-left transition-opacity hover:opacity-60">
								<Link href={`/blog/${post.slug}`} prefetch>
									<div>
										<p className="type-item-title">{post.metadata.title}</p>
										<p className="type-meta mt-0.5">
											{formatDate(post.metadata.publishedAt, false)}
										</p>
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

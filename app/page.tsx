import {ArrowRight} from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/card'
import {TagFooter} from '@/components/tag-footer'
import {formatDate, getBlogPosts} from '@/lib/blog'

export default async function Page() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, 6)

	return (
		<Container>
			<main>
				<section className="py-24">
					<div className="space-y-6">
						<h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
							Learn, build, and grow as a developer
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Technical insights and real experiences. Great software comes from understanding both the code and the people who write it.
						</p>
						<div className="pt-2">
							<Button asChild size="lg">
								<Link href="/blog">
									Read writing
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</section>

				<section className="py-16 border-t">
					<div className="space-y-10">
						<div className="flex items-center justify-between">
							<h2 className="text-2xl font-semibold leading-tight tracking-tight">Recent Writings</h2>
							<Button variant="ghost" asChild>
								<Link href="/blog">
									View all
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<div className="space-y-8">
							{latestPosts.map((post) => (
								<Card
									key={post.slug}
									href={`/blog/${post.slug}`}
									title={post.metadata.title}
									description={post.metadata.description || post.metadata.summary}
									date={formatDate(post.metadata.publishedAt, false)}
									footer={
										post.metadata.tags && post.metadata.tags.length > 0 ? (
											<TagFooter tags={post.metadata.tags} />
										) : undefined
									}
								/>
							))}
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

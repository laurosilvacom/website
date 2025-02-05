import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {formatDate, getBlogPosts} from './(pages)/blog/utils'
import {Card} from 'app/components/card'
import {CardGrid} from 'app/components/card-grid'
import Container from 'app/components/container'
import {Button} from 'app/components/ui/button'

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
		<Container className="mx-auto w-full max-w-screen-xl">
			<main>
				<div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-24 lg:grid-cols-2 lg:gap-16">
					{/* Content Section */}
					<div className="flex flex-col justify-center">
						{/* Main Content */}
						<div className="max-w-[40rem] space-y-6">
							<h1 className="motion-safe:animate-hero-text-reveal">
								<span className="text-foreground block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
									Learn, build, and grow as a developer
								</span>
							</h1>

							<p className="text-muted-foreground text-lg md:text-xl">
								Deep technical insights mixed with real experiences. Because
								great software comes from understanding both the code and the
								people who write it.
							</p>

							<div className="flex flex-col gap-4 pt-8 sm:flex-row">
								<Button asChild size="lg">
									<Link href="/blog" className="group">
										Read the blog
										<ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</div>

					{/* Image Section */}
					<div className="relative lg:flex lg:items-center">
						<div className="border-muted bg-card relative aspect-square w-full overflow-hidden rounded-2xl border">
							<Image
								src="/heroavatar.jpg"
								alt="Lauro Silva"
								fill
								priority
								quality={85}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
							/>
						</div>
					</div>
				</div>

				{/* Latest Articles Section */}
				<section className="mx-auto max-w-7xl px-4 py-32">
					<div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
						<div className="col-span-full flex items-center justify-between">
							<h2 className="text-3xl font-bold lg:text-4xl">
								Latest Articles
							</h2>
							<Button variant="link" asChild>
								<Link href="/blog" className="group">
									View all articles
									<ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>

						<div className="col-span-full">
							<CardGrid>
								{latestPosts.map((post) => (
									<Card
										key={post.slug}
										href={`/blog/${post.slug}`}
										title={post.metadata.title}
										description={post.metadata.description}
										icon={post.metadata.icon}
										coverImage={post.metadata.coverImage}
										date={formatDate(post.metadata.publishedAt, false)}
									/>
								))}
							</CardGrid>
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

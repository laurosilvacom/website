import {ArrowRight} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {Card} from 'app/components/card'
import {CardGrid} from 'app/components/card-grid'
import Container from 'app/components/container'
import {Button} from 'app/components/ui/button'
import {formatDate, getBlogPosts} from './(pages)/blog/utils'

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
				{/* Hero Section */}
				<section className="px-4 pt-24 pb-20 md:pt-32 md:pb-28">
					<div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
						{/* Content Section */}
						<div className="flex flex-col justify-center">
							{/* Badge */}
							<div className="mb-6 inline-flex">
								<div className="bg-primary/5 border-primary/10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
									<div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
									<span className="text-primary text-xs font-medium">
										Developer Educator & Software Engineer
									</span>
								</div>
							</div>

							{/* Main Content */}
							<div className="space-y-6">
								<h1>
									<span className="text-foreground block text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
										Learn, build, and grow as a developer
									</span>
								</h1>

								<p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
									Deep technical insights mixed with real experiences. Because
									great software comes from understanding both the code and the
									people who write it.
								</p>

								<div className="flex flex-col gap-4 pt-6 sm:flex-row">
									<Button asChild size="lg">
										<Link href="/blog" className="group">
											Read the blog
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Link>
									</Button>

									<Button asChild variant="outline" size="lg">
										<Link href="/workshops" className="group">
											Explore workshops
										</Link>
									</Button>
								</div>
							</div>
						</div>

						{/* Image Section */}
						<div className="relative">
							<div className="relative">
								<div className="bg-primary/5 absolute -inset-1 rounded-2xl opacity-70 blur-xl"></div>
								<div className="border-border relative overflow-hidden rounded-2xl border shadow-sm">
									<Image
										src="/heroavatar.jpg"
										alt="Lauro Silva"
										width={600}
										height={600}
										priority
										quality={90}
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
										className="aspect-square w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Latest Articles Section */}
				<section className="px-4 py-24">
					<div className="mx-auto max-w-7xl">
						<div className="flex flex-col space-y-10">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<span className="text-primary mb-2 block text-sm font-medium">
										The Latest
									</span>
									<h2 className="text-foreground text-3xl font-bold lg:text-4xl">
										Recent Articles
									</h2>
								</div>

								<Button variant="outline" asChild className="self-start">
									<Link href="/blog" className="group">
										View all articles
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>

							<CardGrid>
								{latestPosts.map((post) => (
									<Card
										key={post.slug}
										href={`/blog/${post.slug}`}
										title={post.metadata.title}
										description={post.metadata.description}
										icon={post.metadata.icon}
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

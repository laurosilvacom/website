import {ArrowRight, BookOpen, Mail, Newspaper} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {type ReactNode} from 'react'
import {formatDate, getBlogPosts} from 'app/blog/utils'
import {Card} from 'app/components/card'
import {CardGrid} from 'app/components/card-grid'
import Container from 'app/components/container'

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
				<div className="relative mx-auto mt-10 mb-24 grid h-auto max-w-7xl grid-cols-4 gap-x-4 pt-24 md:grid-cols-8 lg:mb-64 lg:min-h-[40rem] lg:grid-cols-12 lg:gap-x-6 lg:pb-12">
					{/* Image Section */}
					<div className="lg:-mr-5vw col-span-full mb-12 flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:mb-0 lg:px-10">
						<div className="max-h-75vh relative aspect-square w-full">
							<Image
								src="/heroavatar.jpg"
								alt="Lauro Silva"
								fill
								className="motion-safe:animate-hero-image-reveal rounded-[3rem] object-cover shadow-[0_0_30px_rgba(var(--primary),0.2)]"
								priority
							/>
							{/* Decorative Elements */}
							<div
								className="from-primary/30 via-primary/10 to-primary/30 absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-tr blur-2xl"
								aria-hidden="true"
							/>
						</div>
					</div>

					{/* Content Section */}
					<div className="col-span-full pt-6 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col">
						<div className="flex flex-auto flex-col">
							{/* Main Heading */}
							<h2 className="text-primary motion-safe:animate-hero-text-reveal text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
								Helping developers build better software through quality
								education.
							</h2>

							{/* Buttons */}
							<div className="motion-safe:animate-hero-text-reveal mt-14 flex flex-col space-y-4">
								<div className="mr-auto flex flex-col gap-4">
									<Link
										href="/blog"
										className="group bg-primary text-primary-foreground hover:bg-primary/90 relative inline-flex items-center rounded-full px-8 py-4 text-lg font-medium shadow-[0_0_15px_rgba(var(--primary),0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(var(--primary),0.35)]">
										Read the blog
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
									<Link
										href="/courses"
										className="group bg-secondary/10 text-primary hover:bg-secondary/20 border-primary/10 relative inline-flex items-center rounded-full border-2 px-8 py-4 text-lg font-medium transition-all hover:-translate-y-0.5">
										Take a course
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</div>
							</div>
						</div>

						{/* Learn More Section */}
						<div className="motion-safe:animate-hero-text-reveal hidden pt-12 lg:block">
							<Link
								href="#about"
								className="text-primary hover:text-primary/80 inline-flex items-center text-lg font-medium transition-colors">
								<div className="relative inline-flex h-14 w-14 items-center justify-center p-1">
									<div className="border-primary/20 absolute animate-pulse rounded-full border-2 p-3">
										<ArrowRight className="h-6 w-6 rotate-90" />
									</div>
								</div>
								<span className="ml-8 text-xl">Learn more about Lauro</span>
							</Link>
						</div>
					</div>
				</div>

				<section className="mx-auto max-w-7xl px-4 py-32">
					<div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
						<div className="col-span-full lg:col-span-4">
							<h2 className="text-primary text-3xl font-bold lg:text-4xl">
								Free Resources
							</h2>
							<p className="text-muted-foreground mt-4 text-xl">
								Level up your development skills with practical resources
							</p>
						</div>

						<div className="col-span-full lg:col-span-8">
							<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
								<ResourceCard
									href="/blog"
									icon={<Newspaper className="text-primary h-6 w-6" />}
									title="Technical Articles"
									description="Deep dives into React, TypeScript, and modern web development practices."
								/>
								<ResourceCard
									href="/tutorials"
									icon={<BookOpen className="text-primary h-6 w-6" />}
									title="Free Tutorials"
									description="Step-by-step guides to help you master web development fundamentals."
								/>
								<ResourceCard
									href="/newsletter"
									icon={<Mail className="text-primary h-6 w-6" />}
									title="Newsletter"
									description="Get weekly insights and resources straight to your inbox."
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Latest Articles Section */}
				<section className="bg-secondary/5 mx-auto max-w-7xl px-4 py-32">
					<div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
						<div className="col-span-full flex items-center justify-between">
							<h2 className="text-primary text-3xl font-bold lg:text-4xl">
								Latest Articles
							</h2>
							<Link
								href="/blog"
								className="text-primary hover:text-primary/80 group inline-flex items-center gap-2 transition-colors">
								View all articles
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
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
										date={formatDate(post.metadata.publishedAt, false)}
									/>
								))}
							</CardGrid>
						</div>
					</div>
				</section>

				{/* Newsletter Section */}
				<section className="mx-auto max-w-7xl px-4 py-32">
					<div className="from-primary/5 border-primary/10 relative rounded-3xl border bg-gradient-to-b to-transparent p-12">
						<div className="grid grid-cols-4 gap-8 md:grid-cols-8 lg:grid-cols-12">
							<div className="col-span-full text-center lg:col-span-6 lg:col-start-4">
								<h2 className="text-primary mb-4 text-3xl font-bold">
									Stay Updated
								</h2>
								<p className="text-muted-foreground mb-8 text-lg">
									Join my newsletter for weekly insights on modern web
									development.
								</p>

								<form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
									<input
										type="email"
										placeholder="Enter your email"
										className="bg-background/50 border-primary/10 focus:border-primary/20 focus:ring-primary/10 flex-1 rounded-xl border px-4 py-3 focus:ring-2 focus:outline-none"
										required
									/>
									<button
										type="submit"
										className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3 font-medium shadow-[0_0_15px_rgba(var(--primary),0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(var(--primary),0.35)]">
										Subscribe
									</button>
								</form>
							</div>
						</div>

						{/* Decorative Elements */}
						<div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
							<div className="bg-primary/10 absolute -top-1/2 left-1/2 aspect-square w-1/2 rounded-full blur-3xl" />
							<div className="bg-primary/10 absolute right-1/2 -bottom-1/2 aspect-square w-1/2 rounded-full blur-3xl" />
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

interface ResourceCardProps {
	href: string
	icon: ReactNode
	title: string
	description: string
}

function ResourceCard({href, icon, title, description}: ResourceCardProps) {
	return (
		<Link
			href={href}
			className="group border-primary/10 from-primary/5 relative overflow-hidden rounded-2xl border bg-gradient-to-b to-transparent p-8 transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)]">
			<div className="space-y-4">
				<div className="bg-primary/10 group-hover:bg-primary/15 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
					{icon}
				</div>

				<h3 className="text-xl font-bold">{title}</h3>

				<p className="text-muted-foreground">{description}</p>

				<div className="text-primary flex items-center pt-4">
					Learn more
					<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
				</div>
			</div>
		</Link>
	)
}

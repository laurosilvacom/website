import {formatDate, getBlogPosts} from 'app/blog/utils'
import {Card} from 'app/components/card'
import {CardGrid} from 'app/components/card-grid'
import Container from 'app/components/container'
import {ArrowRight, BookOpen, Mail, Newspaper} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {type ReactNode} from 'react'

export default async function Page() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, 4)

	return (
		<Container className="mx-auto w-full max-w-screen-xl">
			<main className="mx-auto space-y-32 py-24">
				{/* Hero Section */}
				<section className="relative">
					<div className="flex flex-col-reverse gap-16 md:flex-row md:items-center md:justify-between">
						<div className="space-y-8 md:max-w-[600px]">
							<h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
								Hey, I'm Lauro{' '}
								<span className="animate-wave inline-block">👋</span>
							</h1>

							<div className="text-muted-foreground space-y-4 text-xl">
								<p className="leading-relaxed">
									I'm a JavaScript Engineer and Educator passionate about
									helping developers build better software.
								</p>
								<p className="leading-relaxed">
									When I'm not coding or teaching, you'll find me running in the
									mountains, pushing my limits on long-distance trails.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								{['JavaScript Engineer', 'Educator', 'Ultra Runner'].map(
									(role) => (
										<span
											key={role}
											className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-medium">
											{role}
										</span>
									)
								)}
							</div>
						</div>

						<div className="relative mx-auto md:mx-0">
							<div className="relative aspect-square w-[280px] md:w-[320px] lg:w-[380px]">
								<Image
									src="/heroavatar.jpg"
									alt="Lauro Silva"
									fill
									className="rounded-[2rem] object-cover"
									priority
								/>
							</div>
							{/* Decorative background for image */}
							<div
								className="bg-secondary/50 absolute -inset-4 -z-10 rounded-[2.5rem] blur-2xl"
								aria-hidden="true"
							/>
						</div>
					</div>
				</section>

				{/* Resources Grid */}
				<section className="space-y-12">
					<div className="space-y-4">
						<h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
							Free Resources
						</h2>
						<p className="text-muted-foreground text-xl">
							Practical resources to help you become a better developer
						</p>
					</div>

					<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
						<ResourceCard
							href="/blog"
							icon={<Newspaper className="h-6 w-6 text-orange-200/90" />}
							title="Technical Articles"
							description="Deep dives into React, TypeScript, and modern web development practices. New articles every week."
							gradient="from-[#FF8F8F] to-[#FFB6B6]"
						/>
						<ResourceCard
							href="/tutorials"
							icon={<BookOpen className="h-6 w-6 text-sky-200/90" />}
							title="Free Tutorials"
							description="Hands-on tutorials covering everything from basics to advanced patterns in React and JavaScript."
							gradient="from-[#84B7FF] to-[#B5D1FF]"
						/>
						<ResourceCard
							href="/newsletter"
							icon={<Mail className="h-6 w-6 text-yellow-200/90" />}
							title="Newsletter"
							description="Get weekly insights, tips, and resources straight to your inbox. Join over 1,000 developers."
							gradient="from-[#FFB561] to-[#FFCD94]"
							cta="Subscribe"
						/>
					</div>
				</section>
				{/* Latest Articles Section */}
				<section className="space-y-8">
					<div className="flex items-end justify-between">
						<h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
							Latest Articles
						</h2>
						<Link
							href="/blog"
							className="group text-primary hover:text-primary/70 inline-flex items-center gap-2 transition-colors">
							<span className="font-medium">View All</span>
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
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
	gradient: string
	cta?: string
}

function ResourceCard({
	href,
	icon,
	title,
	description,
	gradient,
	cta = 'Learn more'
}: ResourceCardProps) {
	return (
		<Link
			href={href}
			className="group relative overflow-hidden rounded-2xl p-px">
			<div
				className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-30`}
			/>

			<div className="bg-card relative flex h-full flex-col rounded-2xl p-6">
				<div className="bg-primary/10 mb-4 w-fit rounded-xl p-3">{icon}</div>

				<h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>

				<p className="text-muted-foreground mb-4">{description}</p>

				<div className="text-primary mt-auto flex items-center gap-2 font-medium">
					{cta}
					<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</div>
			</div>
		</Link>
	)
}

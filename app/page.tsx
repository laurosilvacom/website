import {Suspense} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {formatDate, getBlogPosts} from '@/lib/blog'
import {ArrowRight} from 'lucide-react'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: any, b: any) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
		.slice(0, 6)

	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
			{latestPosts.map((post, index) => (
				<article
					key={post.slug}
					className="group relative"
					style={{
						animationDelay: `${index * 100}ms`
					}}>
					<Link href={`/blog/${post.slug}`} className="block h-full">
						<div className="flex h-full flex-col">
							<div className="mb-4">
								<time className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
									{formatDate(post.metadata.publishedAt, false)}
								</time>
							</div>
							<h3 className="group-hover:text-primary mb-3 text-xl leading-tight font-semibold transition-colors lg:text-2xl">
								{post.metadata.title}
							</h3>
							<p className="text-muted-foreground mb-4 line-clamp-3 grow text-sm leading-relaxed lg:text-base">
								{post.metadata.summary}
							</p>
							<div className="text-primary flex items-center text-sm font-medium transition-all group-hover:gap-2">
								Read more
								<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
							</div>
						</div>
					</Link>
				</article>
			))}
		</div>
	)
}

function BlogPostsFallback() {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
			{Array.from({length: 6}).map((_, i) => (
				<div key={i} className="space-y-4">
					<div className="bg-muted h-4 w-24 animate-pulse rounded" />
					<div className="bg-muted h-8 w-full animate-pulse rounded" />
					<div className="bg-muted h-20 w-full animate-pulse rounded" />
				</div>
			))}
		</div>
	)
}

export default async function Page() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-24 pb-16 lg:min-h-screen lg:pt-32 lg:pb-24">
				<div className="from-background via-background/95 to-background pointer-events-none absolute inset-0 bg-linear-to-b" />

				<Container size="xl" className="relative z-10">
					<div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Image */}
						<div className="order-2 lg:order-1 lg:col-span-5">
							<div className="relative aspect-4/5 lg:aspect-3/4">
								<Image
									src="/photos/website-photo-1.jpg"
									alt="Lauro Silva"
									fill
									className="rounded-2xl object-cover"
									style={{objectPosition: 'right center'}}
									priority
									sizes="(max-width: 1024px) 100vw, 40vw"
								/>
							</div>
						</div>

						{/* Content */}
						<div className="order-1 space-y-8 lg:order-2 lg:col-span-7 lg:space-y-12">
							<div className="space-y-6 lg:space-y-8">
								<h1 className="max-w-5xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-7xl xl:text-8xl">
									Hey, I'm Lauro!
								</h1>
								<div className="text-muted-foreground max-w-2xl space-y-4 text-lg leading-relaxed lg:text-xl">
									<p>
										This is a{' '}
										<strong className="text-foreground">digital garden</strong>.
										where I share my work, writing, and learning process at the
										intersection of technology and the outdoor industry.
									</p>
									<p>
										I work as a software engineer building cutting-edge
										technology for the outdoor industry, help professional
										athletes use technology to build brands, and build inclusive
										communities in the trail running space.
									</p>
								</div>
							</div>
							<div className="pt-4">
								<Button asChild size="lg" className="group">
									<Link href="/blog">
										Explore the garden
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</Container>
			</section>

			{/* Recent Writings */}
			<section className="border-border/50 border-t py-24 lg:py-32">
				<Container size="xl">
					<div className="space-y-12 lg:space-y-16">
						<div className="flex items-end justify-between">
							<div>
								<h2 className="mb-2 text-3xl font-bold tracking-tight lg:text-5xl">
									Recent Writings
								</h2>
								<p className="text-muted-foreground text-lg">
									Latest thoughts and explorations
								</p>
							</div>
							<Button variant="ghost" asChild className="hidden lg:flex">
								<Link href="/blog">
									View all
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<Suspense fallback={<BlogPostsFallback />}>
							<BlogPosts />
						</Suspense>

						<div className="pt-8 lg:hidden">
							<Button variant="outline" asChild className="w-full">
								<Link href="/blog">
									View all writings
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

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
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
			{latestPosts.map((post, index) => (
				<article
					key={post.slug}
					className="group relative"
					style={{
						animationDelay: `${index * 100}ms`
					}}>
					<Link
						href={`/blog/${post.slug}`}
						className="block h-full">
						<div className="flex flex-col h-full">
							<div className="mb-4">
								<time className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
									{formatDate(post.metadata.publishedAt, false)}
								</time>
							</div>
							<h3 className="text-xl lg:text-2xl font-semibold mb-3 leading-tight group-hover:text-primary transition-colors">
								{post.metadata.title}
							</h3>
							<p className="text-muted-foreground text-sm lg:text-base leading-relaxed flex-grow mb-4 line-clamp-3">
								{post.metadata.summary}
							</p>
							<div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
								Read more
								<ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
			<section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
				
				<Container size="xl" className="relative z-10">
					<div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
						{/* Image */}
						<div className="lg:col-span-5 order-2 lg:order-1">
							<div className="relative aspect-[4/5] lg:aspect-[3/4]">
								<Image
									src="/photos/website-photo-1.jpg"
									alt="Lauro Silva"
									fill
									className="object-cover rounded-2xl"
									priority
									sizes="(max-width: 1024px) 100vw, 40vw"
								/>
							</div>
						</div>

						{/* Content */}
						<div className="lg:col-span-7 order-1 lg:order-2 space-y-8 lg:space-y-12">
							<div className="space-y-6 lg:space-y-8">
								<h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
									Cultivating ideas in the open,
									<br />
									<span className="text-primary">learning in public</span>
								</h1>
								<div className="space-y-4 text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-2xl">
									<p>
										I&apos;m <strong className="text-foreground">Lauro Silva</strong>. This is a digital garden where I share my work, writing, and learning process at the intersection of technology and the outdoor industry.
									</p>
									<p>
										Ideas evolve here. Some are polished, others are works in progress. This is learning in public.
									</p>
								</div>
								<p className="text-base lg:text-lg text-muted-foreground/80 max-w-2xl">
									I work as a software engineer building cutting-edge technology for the outdoor industry, help professional athletes use technology to build brands and communities, and build communities in the trail running space.
								</p>
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
			<section className="py-24 lg:py-32 border-t border-border/50">
				<Container size="xl">
					<div className="space-y-12 lg:space-y-16">
						<div className="flex items-end justify-between">
							<div>
								<h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-2">
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

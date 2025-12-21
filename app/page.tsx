import {Suspense} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {formatDate, getBlogPosts} from '@/lib/blog'
import {ArrowRight} from 'lucide-react'
import {type BlogPost} from '@/lib/blog'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: BlogPost, b: BlogPost) =>
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
			<section className="border-border border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
				<Container width="base">
					<div className="mx-auto max-w-4xl space-y-12 text-center">
						<div className="space-y-8">
							<h1 className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl sm:leading-[1.1] lg:text-6xl xl:text-7xl">
								Where Software, Belonging, and Trail Running Converge
							</h1>
							<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed sm:text-xl">
								I'm Lauro Silva. I write code for the outdoor industry, founded
								Tierra Libre Run to make trail running more accessible, and race
								as a semi-pro athlete. This is where I share what I'm learning.
							</p>
						</div>
						<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
							<Button asChild size="lg" className="group">
								<Link href="/blog">
									Read my writing
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="ghost">
								<Link href="/about">About me</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>

			{/* Hero Image */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="wide">
					<div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-video">
						<Image
							src="/photos/website-photo-1.jpg"
							alt="Lauro Silva"
							fill
							className="object-cover"
							style={{objectPosition: 'center'}}
							priority
							sizes="100vw"
						/>
					</div>
				</Container>
			</section>

			{/* What I Do */}
			<section className="border-border border-b py-24 lg:py-32">
				<Container width="base">
					<div className="grid gap-8 md:grid-cols-3">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<h3 className="text-lg font-semibold">Software Engineer</h3>
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								I build products for companies like HOKA and Sentry, and custom
								platforms for professional athletes.
							</p>
						</div>

						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<h3 className="text-lg font-semibold">Community Builder</h3>
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								Founded Tierra Libre Run, a nonprofit expanding access to trail
								running for BIPOC athletes across the Pacific Northwest.
							</p>
						</div>

						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<h3 className="text-lg font-semibold">Trail Runner</h3>
							</div>
							<p className="text-muted-foreground text-base leading-relaxed">
								Racing ultras and mountain races while helping other athletes
								build their brands through technology.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Recent Writings */}
			<section className="py-24 lg:py-32">
				<Container width="wide">
					<div className="space-y-12 lg:space-y-16">
						<div className="flex items-end justify-between">
							<div className="space-y-2">
								<div className="inline-flex items-center gap-2">
									<div className="bg-primary h-2 w-2 rounded-full" />
									<span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
										Writing
									</span>
								</div>
								<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
									Recent Posts
								</h2>
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

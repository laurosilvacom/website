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
						<div className="border-border-subtle bg-card hover:border-border flex h-full flex-col rounded-2xl border p-6 transition-all duration-200">
							<div className="mb-4">
								<time className="text-muted-foreground text-sm font-medium">
									{formatDate(post.metadata.publishedAt, false)}
								</time>
							</div>
							<h3 className="mb-3 text-2xl leading-tight font-bold transition-colors">
								{post.metadata.title}
							</h3>
							<p className="text-muted-foreground mb-6 line-clamp-3 grow text-base leading-relaxed">
								{post.metadata.summary}
							</p>
							<div className="flex items-center text-sm font-medium transition-all group-hover:gap-2">
								Read more
								<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
			<section className="relative flex min-h-[90vh] items-center justify-center px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
				<div className="mx-auto max-w-5xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 duration-1000">
						<h1 className="text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
							Building Software,
							<br />
							Growing Communities,
							<br />
							Chasing Mountains
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed sm:text-2xl">
							Software engineer and educator crafting digital products for
							outdoor brands while building inclusive communities that connect
							people with nature.
						</p>
					</div>
					<div className="animate-in fade-in slide-in-from-bottom-4 flex flex-wrap items-center justify-center gap-4 pt-12 delay-150 duration-1000">
						<Button asChild size="lg" className="group">
							<Link href="/blog">
								Read my writing
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link href="/about">About me</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Featured Image */}
			<section className="py-12 lg:py-20">
				<Container width="wide">
					<div className="border-border-subtle animate-in fade-in slide-in-from-bottom-8 relative aspect-video overflow-hidden rounded-3xl border shadow-2xl delay-300 duration-1000">
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
			<section className="py-24 lg:py-32">
				<Container width="base">
					<div className="grid gap-12 md:grid-cols-3 md:gap-16">
						<div className="group space-y-4">
							<h3 className="text-2xl font-bold">Software Engineer</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								I build products for companies like HOKA and Sentry, and custom
								platforms for professional athletes.
							</p>
						</div>

						<div className="group space-y-4">
							<h3 className="text-2xl font-bold">Community Builder</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Founded Tierra Libre Run, a nonprofit expanding access to trail
								running for BIPOC athletes across the Pacific Northwest.
							</p>
						</div>

						<div className="group space-y-4">
							<h3 className="text-2xl font-bold">Trail Runner</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
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
					<div className="space-y-16">
						<div className="flex items-end justify-between">
							<div className="space-y-3">
								<h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
									Recent Posts
								</h2>
								<p className="text-muted-foreground text-lg">
									Thoughts on software, community, and trail running
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

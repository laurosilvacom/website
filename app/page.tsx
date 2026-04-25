import {Suspense} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {formatDate, getBlogPosts} from '@/features/blog/server'
import {type BlogPost} from '@/features/blog/server'
import {getCaseStudies} from '@/features/work/server'
import {ArrowRight} from 'lucide-react'
import {Skeleton} from '@/shared/ui/skeleton'
import {Button} from '@/shared/ui/button'

async function BlogPosts() {
	const allBlogs = await getBlogPosts()
	const latestPosts = allBlogs
		.sort(
			(a: BlogPost, b: BlogPost) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime(),
		)
		.slice(0, 3)

	return (
		<div className="space-y-6">
			{latestPosts.map((post) => (
				<Button
					key={post.slug}
					asChild
					variant="ghost"
					size="sm"
					className="group h-auto w-full justify-start px-0 text-left transition-opacity hover:opacity-60">
					<Link href={`/blog/${post.slug}`}>
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
	)
}

async function SelectedWork() {
	const caseStudies = await getCaseStudies()
	const featuredStudies = caseStudies.slice(0, 4)

	return (
		<div className="space-y-1">
			{featuredStudies.map((study) => (
				<Button
					key={study.slug}
					asChild
					variant="ghost"
					size="sm"
					className="group h-auto w-full justify-between gap-4 px-0 py-4 transition-opacity hover:opacity-70">
					<Link href={`/work/${study.slug}`}>
						<div className="min-w-0 space-y-1 text-left">
							<p className="type-item-title">{study.client}</p>
							<p className="type-meta">
								{study.title} · {study.type}
							</p>
						</div>
						<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
					</Link>
				</Button>
			))}
		</div>
	)
}

function BlogPostsFallback() {
	return (
		<div className="space-y-6">
			{Array.from({length: 3}).map((_, i) => (
				<div key={i}>
					<Skeleton className="h-4 w-48 rounded-md" />
				</div>
			))}
		</div>
	)
}

function SelectedWorkFallback() {
	return (
		<div className="space-y-6">
			{Array.from({length: 4}).map((_, i) => (
				<div key={i}>
					<Skeleton className="h-4 w-56 rounded-md" />
				</div>
			))}
		</div>
	)
}

export default async function Page() {
	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-14 lg:pt-32 lg:pb-18">
				<Container>
					<div className="space-y-5">
						<h1 className="type-page-title">
							Senior software engineer and developer educator
						</h1>
						<p className="type-page-intro">
							I help teams ship better software and level up their engineers through
							hands-on delivery, technical leadership, and practical training.
						</p>
					</div>
					<div className="pt-12 lg:pt-16">
						<div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:aspect-[3/4] lg:aspect-[16/10]">
							<Image
								src="/heroavatar.png"
								alt="Lauro Silva"
								fill
								sizes="(max-width: 1024px) 100vw, 680px"
								className="object-cover"
								priority
							/>
						</div>
					</div>
				</Container>
			</section>

			{/* Selected Work */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="type-section-label">Selected Work</h2>
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/work">All case studies</Link>
						</Button>
					</div>
					<Suspense fallback={<SelectedWorkFallback />}>
						<SelectedWork />
					</Suspense>
				</Container>
			</section>

			{/* Recent Writing */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<div className="mb-6 flex items-center justify-between">
						<h2 className="type-section-label">Recent Writing</h2>
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/blog">All posts</Link>
						</Button>
					</div>
					<Suspense fallback={<BlogPostsFallback />}>
						<BlogPosts />
					</Suspense>
				</Container>
			</section>
		</>
	)
}

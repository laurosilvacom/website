import Link from 'next/link'
import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/components/container'
import {PortableText} from '@/components/portable-text'
import {TocSidebar} from '@/components/toc-sidebar'
import {StructuredData} from '@/components/structured-data'
import {generateBlogPostMetadata} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPosts, getBlogPostBySlug} from '@/lib/blog'

export const revalidate = 300 // Revalidate every 5 minutes

interface BlogHeaderProps {
	date: string
	readingTime: string | undefined
	title: string
	summary: string
	tags?: string[]
}

function BlogHeader({
	date,
	readingTime,
	title,
	summary,
	tags
}: BlogHeaderProps) {
	return (
		<header className="mb-16">
			<div className="space-y-8">
				<div className="space-y-6">
					<h1 className="text-foreground text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
						{title}
					</h1>
					<p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
						{summary}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
					<time className="text-muted-foreground">{formatDate(date)}</time>
					{readingTime && (
						<>
							<span className="text-muted-foreground">·</span>
							<span className="text-muted-foreground">{readingTime}</span>
						</>
					)}
					{tags && tags.length > 0 && (
						<>
							<span className="text-muted-foreground">·</span>
							<div className="flex flex-wrap gap-x-3 gap-y-1">
								{tags.map((tag) => (
									<Link
										key={tag}
										href={`/tags/${encodeURIComponent(tag)}`}
										className="text-muted-foreground hover:text-foreground transition-colors">
										{tag}
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

export async function generateStaticParams() {
	const posts = await getBlogPosts()
	return posts.map((post: any) => ({
		slug: post.slug
	}))
}

export async function generateMetadata(props: Props): Promise<Metadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const post = await getBlogPostBySlug(params.slug)
	if (!post) return null

	const {title, publishedAt, summary, tags} = post.metadata

	return generateBlogPostMetadata(
		title,
		summary,
		params.slug,
		publishedAt,
		tags
	)
}

export default async function Blog(props: Props) {
	const params = await props.params
	const post = await getBlogPostBySlug(params.slug)

	if (!post) {
		notFound()
	}

	return (
		<>
			<StructuredData
				type="article"
				title={post.metadata.title}
				description={post.metadata.summary}
				image={`${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`}
				datePublished={post.metadata.publishedAt}
				dateModified={post.metadata.publishedAt}
				author="Lauro Silva"
				url={`${baseUrl}/blog/${post.slug}`}
			/>

			<article>
				{/* Header */}
				<header className="border-border border-b pt-32 pb-16 lg:pt-40 lg:pb-20">
					<Container width="base">
						<div className="space-y-8">
							<div className="space-y-6">
								<h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
									{post.metadata.title}
								</h1>
								<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
									{post.metadata.summary}
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
								<time className="text-muted-foreground">
									{formatDate(post.metadata.publishedAt)}
								</time>
								{post.metadata.readingTime && (
									<>
										<span className="text-muted-foreground">·</span>
										<span className="text-muted-foreground">
											{post.metadata.readingTime}
										</span>
									</>
								)}
								{post.metadata.tags && post.metadata.tags.length > 0 && (
									<>
										<span className="text-muted-foreground">·</span>
										<div className="flex flex-wrap gap-x-3 gap-y-1">
											{post.metadata.tags.map((tag: string) => (
												<Link
													key={tag}
													href={`/tags/${encodeURIComponent(tag)}`}
													className="text-muted-foreground hover:text-foreground transition-colors">
													{tag}
												</Link>
											))}
										</div>
									</>
								)}
							</div>
						</div>
					</Container>
				</header>

				{/* Content with TOC */}
				<div className="py-16 lg:py-24">
					<Container width="base">
						<div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
							{/* Main Content */}
							<div className="lg:col-span-8">
								<div className="prose">
									<PortableText blocks={post.content} />
								</div>
							</div>

							{/* TOC Sidebar - Sticky */}
							<div className="lg:col-span-4">
								<div className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
									<TocSidebar />
								</div>
							</div>
						</div>
					</Container>
				</div>
			</article>
		</>
	)
}

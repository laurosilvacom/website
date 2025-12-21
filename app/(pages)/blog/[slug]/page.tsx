import Link from 'next/link'
import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/components/container'
import {PortableText} from '@/components/portable-text'
import {TocSidebar} from '@/components/toc-sidebar'
import {StructuredData} from '@/components/structured-data'
import {NewsletterPopup} from '@/components/newsletter-popup'
import {generateBlogPostMetadata, defaultOgImageUrl} from '@/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPostBySlug, getBlogPostSlugs} from '@/lib/blog'
import Image from 'next/image'
import {type SanityImage} from '@/lib/types'

export const revalidate = 300 // Revalidate every 5 minutes

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

export async function generateStaticParams() {
	const slugs = await getBlogPostSlugs()
	return slugs.map((slug) => ({slug}))
}

export async function generateMetadata(props: Props): Promise<Metadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const post = await getBlogPostBySlug(params.slug)
	if (!post) return null

	const {title, publishedAt, summary, tags} = post.metadata
	const heroUrl = post.heroImage?.asset?.url

	return generateBlogPostMetadata(
		title,
		summary,
		params.slug,
		publishedAt,
		tags,
		heroUrl
	)
}

export default async function BlogPostPage(props: {
	params: Promise<{slug: string}>
}) {
	const params = await props.params
	const post = await getBlogPostBySlug(params.slug)

	if (!post) {
		notFound()
	}

	const hero: SanityImage | undefined = post.heroImage
	const heroUrl: string | undefined = hero?.asset?.url
	const heroAlt: string = hero?.alt ?? post.metadata.title
	const heroLqip: string | undefined = hero?.asset?.metadata?.lqip
	const heroCaption: string | undefined = hero?.caption
	const articleImage = heroUrl ?? defaultOgImageUrl

	return (
		<>
			<StructuredData
				type="article"
				title={post.metadata.title}
				description={post.metadata.summary}
				image={articleImage}
				datePublished={post.metadata.publishedAt}
				dateModified={post.metadata.publishedAt}
				author="Lauro Silva"
				url={`${baseUrl}/blog/${post.slug}`}
			/>

			<article>
				{/* Hero (Title + Meta + Image) */}
				<header className="border-border relative overflow-hidden border-b pt-32 pb-24 lg:pt-40 lg:pb-32">
					{heroUrl ? (
						<>
							<div className="absolute inset-0">
								<Image
									src={heroUrl}
									alt={heroAlt}
									fill
									priority
									className="object-cover"
									sizes="100vw"
									placeholder={heroLqip ? 'blur' : 'empty'}
									blurDataURL={heroLqip}
								/>
							</div>
							<div className="from-background/60 via-background/85 to-background absolute inset-0 bg-linear-to-b" />
						</>
					) : null}

					<Container width="base">
						<div className="relative space-y-10">
							<div className="space-y-6">
								<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
									{post.metadata.title}
								</h1>
								<p className="text-muted-foreground max-w-2xl text-lg leading-relaxed lg:text-xl">
									{post.metadata.summary}
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
								<time className="text-muted-foreground">
									{formatDate(post.metadata.publishedAt)}
								</time>
								{post.metadata.readingTime ? (
									<>
										<span className="text-muted-foreground">·</span>
										<span className="text-muted-foreground">
											{post.metadata.readingTime}
										</span>
									</>
								) : null}
								{post.metadata.tags && post.metadata.tags.length > 0 ? (
									<>
										<span className="text-muted-foreground">·</span>
										<div className="flex flex-wrap gap-x-3 gap-y-1">
											{post.metadata.tags.map((tag: string) => (
												<Link
													key={tag}
													href={`/tags/${encodeURIComponent(tag)}`}
													className="text-muted-foreground hover:text-foreground underline-offset-4 transition-colors hover:underline">
													{tag}
												</Link>
											))}
										</div>
									</>
								) : null}
							</div>

							{heroCaption ? (
								<p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
									{heroCaption}
								</p>
							) : null}
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

			{/* Newsletter Popup */}
			<NewsletterPopup />
		</>
	)
}

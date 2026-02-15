import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/shared/components/container'
import {PortableText} from '@/features/blog/components/portable-text'
import {StructuredData} from '@/shared/components/structured-data'
import {generateBlogPostMetadata, defaultOgImageUrl} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPostBySlug, getBlogPostSlugs} from '@/features/blog/server'
import {getImageClass} from '@/shared/lib/image-utils'
import Image from 'next/image'
import {highlightCode} from '@/shared/lib/highlight-code'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
import {ArrowLeft, ArrowUpRight} from 'lucide-react'
import {
	getSanityImageBlurDataUrl,
	getSanityImageUrl,
} from '@/shared/integrations/sanity/image'

export const revalidate = 30

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

type PortableCodeBlock = PortableTextBlock & {
	_type: 'code'
	code?: string
	language?: string
}

function isPortableCodeBlock(block: PortableTextBlock): block is PortableCodeBlock {
	return (block as {_type?: string})._type === 'code'
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
	const heroUrl = getSanityImageUrl(post.heroImage, {
		width: 1200,
		height: 630,
		quality: 75,
		fit: 'crop',
	})

	return generateBlogPostMetadata(title, summary, params.slug, publishedAt, tags, heroUrl)
}

export default async function BlogPost({params}: Props) {
	const {slug} = await params
	const post = await getBlogPostBySlug(slug)

	if (!post) {
		notFound()
	}

	// Pre-highlight all code blocks server-side
	const processedBlocks = await Promise.all(
		post.content.map(async (block) => {
			if (isPortableCodeBlock(block) && block.code) {
				const highlightedHTML = await highlightCode(
					block.code,
					block.language ?? 'plaintext',
				)
				return {...block, highlightedHTML}
			}
			return block
		}),
	)

	const readingTime =
		post.metadata.readingTime ??
		`${Math.max(1, Math.ceil(JSON.stringify(post.content).length / 1500))} min read`

	const heroUrl = getSanityImageUrl(post.heroImage, {
		width: 1600,
		height: 900,
		quality: 76,
		fit: 'crop',
	})
	const heroAlt = post.heroImage?.alt || post.metadata.title
	const heroLqip = getSanityImageBlurDataUrl(post.heroImage)

	return (
		<>
			<StructuredData
				type="article"
				title={post.metadata.title}
				description={post.metadata.summary}
				image={heroUrl ?? defaultOgImageUrl}
				datePublished={post.metadata.publishedAt}
				dateModified={post.metadata.publishedAt}
				author="Lauro Silva"
				url={`${baseUrl}/blog/${post.slug}`}
			/>

			<article>
				{/* Header */}
				<header className="pt-40 pb-20 lg:pt-48 lg:pb-24">
					<Container width="base">
						<div className="space-y-4">
							<Link
								href="/blog"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
								<ArrowLeft className="h-3 w-3" />
								Writing
							</Link>

							<div className="flex items-center gap-2 text-xs">
								<time
									className="text-muted-foreground font-medium"
									dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span className="text-muted-foreground">·</span>
								<span className="text-muted-foreground font-medium">
									{readingTime}
								</span>
							</div>

							<h1 className="text-foreground text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
								{post.metadata.title}
							</h1>

							<p className="text-muted-foreground max-w-xl text-base leading-relaxed text-balance">
								{post.metadata.summary}
							</p>

							{post.metadata.tags && post.metadata.tags.length > 0 && (
								<div className="flex flex-wrap items-center gap-2 pt-1">
									{post.metadata.tags.slice(0, 4).map((tag) => (
										<Link
											key={tag}
											href={`/tags/${encodeURIComponent(tag)}`}
											className="text-muted-foreground hover:text-foreground font-mono text-[10px] font-medium uppercase tracking-wider transition-colors">
											{tag}
										</Link>
									))}
								</div>
							)}
						</div>
					</Container>
				</header>

				{/* Cover Image */}
				{heroUrl && (
					<section className="border-border border-y py-10 lg:py-14">
						<Container width="base">
							<div className="relative aspect-video overflow-hidden rounded-xl">
								<Image
									src={heroUrl}
									alt={heroAlt}
									fill
									priority
									unoptimized
									className={`object-cover ${getImageClass('EDITORIAL_BW')}`}
									sizes="(min-width: 1024px) 680px, 100vw"
									placeholder={heroLqip ? 'blur' : 'empty'}
									blurDataURL={heroLqip}
								/>
							</div>
							{post.heroImage?.caption && (
								<p className="text-muted-foreground mt-3 text-xs">
									{post.heroImage.caption}
								</p>
							)}
						</Container>
					</section>
				)}

				{/* Content */}
				<section className="py-16 lg:py-20">
					<Container width="base">
						<div className="prose prose-sm dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-li:text-muted-foreground max-w-none">
							<PortableText blocks={processedBlocks} />
						</div>
					</Container>
				</section>
			</article>

			{/* CTA */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					<div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-foreground text-sm font-medium">
								Have questions or feedback?
							</p>
							<p className="text-muted-foreground text-sm">
								Reach out on LinkedIn or send me an email.
							</p>
						</div>
						<div className="flex items-center gap-3">
							<a
								href="https://www.linkedin.com/in/laurosilvacom/"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
								LinkedIn
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
							<a
								href="mailto:hello@laurosilva.com"
								className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium transition-colors">
								Email
								<ArrowUpRight className="h-3.5 w-3.5" />
							</a>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

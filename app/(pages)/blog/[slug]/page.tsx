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
import {Button} from '@/shared/ui/button'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
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
				{/* Header Section - Title and Information */}
				<header className="pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
					<Container width="wide">
						<div className="mx-auto max-w-7xl space-y-8 text-center">
							<div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
								<time dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span className="mx-3">•</span>
								<span>{readingTime}</span>
							</div>

							<h1 className="text-foreground text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
								{post.metadata.title}
							</h1>

							<p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed text-balance sm:text-2xl">
								{post.metadata.summary}
							</p>

							{post.metadata.tags && post.metadata.tags.length > 0 && (
								<div className="flex flex-wrap items-center justify-center gap-2">
									{post.metadata.tags.slice(0, 3).map((tag) => (
										<Link
											key={tag}
											href={`/tags/${encodeURIComponent(tag)}`}
											className="bg-background/70 border-border/30 text-muted-foreground rounded-full border px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur-xl">
											{tag}
										</Link>
									))}
								</div>
							)}
						</div>
					</Container>
				</header>

				{/* Cover Image Section */}
				{heroUrl && (
					<section className="pb-16 sm:pb-20 lg:pb-24">
						<Container width="wide">
							<div className="mx-auto max-w-5xl">
								<div className="border-border/30 relative aspect-video overflow-hidden rounded-2xl border shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
									<Image
										src={heroUrl}
										alt={heroAlt}
										fill
										priority
										unoptimized
										className={`object-cover ${getImageClass('EDITORIAL_BW')}`}
										sizes="(min-width: 1024px) 1000px, 100vw"
										placeholder={heroLqip ? 'blur' : 'empty'}
										blurDataURL={heroLqip}
									/>
								</div>
								{post.heroImage?.caption && (
									<figcaption className="text-muted-foreground mx-auto mt-4 max-w-3xl text-center text-sm">
										{post.heroImage.caption}
									</figcaption>
								)}
							</div>
						</Container>
					</section>
				)}

				{/* Content Section */}
				<section className="py-16 sm:py-20 lg:py-24">
					<Container width="wide">
						<div className="mx-auto max-w-3xl">
							<PortableText blocks={processedBlocks} />
						</div>
					</Container>
				</section>
			</article>

			<section className="py-24 lg:py-32">
				<Container width="narrow">
					<div className="bg-background/70 border-border/30 mx-auto max-w-2xl space-y-8 rounded-2xl border p-12 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:p-16">
						<div className="space-y-6">
							<h3 className="text-3xl font-bold tracking-tight lg:text-4xl">
								Have questions?
							</h3>
							<p className="text-muted-foreground text-lg leading-relaxed">
								Feel free to reach out on LinkedIn or send me an email.
							</p>
						</div>
						<div className="flex flex-wrap items-center justify-center gap-4">
							<Button asChild size="lg">
								<a
									href="https://www.linkedin.com/in/laurosilvacom/"
									target="_blank"
									rel="noopener noreferrer">
									Connect on LinkedIn
								</a>
							</Button>
							<Button asChild size="lg" variant="outline">
								<a href="mailto:hello@laurosilva.com">Send an email</a>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

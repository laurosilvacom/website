import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import Container from '@/shared/components/container'
import {PortableText} from '@/features/blog/components/portable-text'
import {StructuredData} from '@/shared/components/structured-data'
import {generateBlogPostMetadata, defaultOgImageUrl} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {formatDate, getBlogPostBySlug, getBlogPostSlugs} from '@/features/blog/server'
import Image from 'next/image'
import {highlightCode} from '@/shared/lib/highlight-code'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
import {
	getSanityImageBlurDataUrl,
	getSanityImageUrl,
} from '@/shared/integrations/sanity/image'
import {Button} from '@/shared/ui/button'

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
				<header className="pt-28 pb-12 lg:pt-32 lg:pb-16">
					<Container>
						<div className="space-y-4">
							<Button asChild variant="link" size="sm" className="type-link-muted inline-block h-auto px-0">
								<Link href="/blog">← Writing</Link>
							</Button>

							<h1 className="type-page-title">
								{post.metadata.title}
							</h1>

							<div className="type-meta flex items-center gap-1.5">
								<time dateTime={post.metadata.publishedAt}>
									{formatDate(post.metadata.publishedAt)}
								</time>
								<span>·</span>
								<span>{readingTime}</span>
							</div>

							{post.metadata.summary && (
								<p className="type-page-intro">
									{post.metadata.summary}
								</p>
							)}
						</div>
					</Container>
				</header>

				{heroUrl && (
					<section className="pb-10 lg:pb-14">
						<Container>
							<div className="relative aspect-video overflow-hidden rounded-lg">
								<Image
									src={heroUrl}
									alt={heroAlt}
									fill
									priority
									unoptimized
									className="object-cover"
									sizes="(min-width: 1024px) 680px, 100vw"
									placeholder={heroLqip ? 'blur' : 'empty'}
									blurDataURL={heroLqip}
								/>
							</div>
							{post.heroImage?.caption && (
								<p className="type-meta mt-3">
									{post.heroImage.caption}
								</p>
							)}
						</Container>
					</section>
				)}

				<section className="pb-24 lg:pb-32">
					<Container>
						<PortableText blocks={processedBlocks} />
					</Container>
				</section>

				<footer className="pb-24 lg:pb-32">
					<Container>
						{post.metadata.tags && post.metadata.tags.length > 0 && (
							<div className="flex flex-wrap gap-x-3 gap-y-1">
								{post.metadata.tags.map((tag) => (
									<Button
										key={tag}
										asChild
										variant="link"
										size="sm"
										className="type-meta hover:text-foreground h-auto px-0 transition-colors">
										<Link href={`/tags/${encodeURIComponent(tag)}`}>#{tag}</Link>
									</Button>
								))}
							</div>
						)}
					</Container>
				</footer>
			</article>
		</>
	)
}

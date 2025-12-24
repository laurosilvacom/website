'use client'

import {PortableText as SanityPortableText} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
import {urlForImage} from '@/lib/sanity/image'
import {CodeCopyButton} from './copy-button'
import {Footnote} from './footnote'

interface PortableTextProps {
	blocks: PortableTextBlock[]
}

let footnoteDefinitions = new Map<string, any>()

function RoundedImage({value}: {value: any}) {
	if (!value?.asset) return null

	const imageUrl = urlForImage(value.asset).url()
	const alt = value.alt || ''

	return (
		<figure className="-mx-6 my-12 sm:-mx-16 lg:-mx-24">
			<Image
				src={imageUrl}
				alt={alt}
				width={1200}
				height={675}
				quality={95}
				className="w-full rounded-lg shadow-lg"
				sizes="(min-width: 1024px) 1200px, 100vw"
			/>
			{alt && alt.toLowerCase() !== 'description' && (
				<figcaption className="text-muted-foreground mt-4 px-6 text-center text-sm italic sm:px-16 lg:px-24">
					{alt}
				</figcaption>
			)}
		</figure>
	)
}

function CodeBlock({value}: {value: any}) {
	const code = value?.code || ''
	const language = value?.language || 'plaintext'
	const highlightedHTML =
		value?.highlightedHTML || `<pre><code>${code}</code></pre>`

	return (
		<div className="code-block not-prose group">
			<div className="code-block-header">
				<span className="code-block-lang">{language}</span>
				<CodeCopyButton code={code} />
			</div>
			<div
				className="code-block-content"
				dangerouslySetInnerHTML={{__html: highlightedHTML}}
			/>
		</div>
	)
}

function InlineCode({children}: {children: any}) {
	return (
		<code className="inline-code rounded px-1.5 py-0.5 font-mono text-[0.9em] font-medium">
			{children}
		</code>
	)
}

function FootnoteReference({value, children}: {value: any; children: any}) {
	const footnoteId = value?.footnoteId
	if (!footnoteId) return <>{children}</>

	const definition = footnoteDefinitions.get(footnoteId)
	const footnoteContent = definition?.content

	return (
		<>
			{children}
			<Footnote id={footnoteId}>
				{footnoteContent ? (
					<SanityPortableText
						value={footnoteContent}
						components={createComponents()}
					/>
				) : (
					'Footnote content not found'
				)}
			</Footnote>
		</>
	)
}

function FootnoteDefinition({value}: {value: any}) {
	const footnoteId = value?.id
	const content = value?.content

	if (!footnoteId || !content) return null

	footnoteDefinitions.set(footnoteId, {id: footnoteId, content})

	const components = createComponents()

	return (
		<Footnote id={footnoteId}>
			<SanityPortableText value={content} components={components} />
		</Footnote>
	)
}

function slugify(str: string) {
	return str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
}

let components: any = null

function createComponents() {
	if (components) return components

	components = {
		types: {
			image: ({value}: {value: any}) => {
				const width = value?.asset?.metadata?.dimensions?.width ?? 1600
				const height = value?.asset?.metadata?.dimensions?.height ?? 900

				const src =
					value?.asset?.url ??
					urlForImage(value).width(1600).fit('max').auto('format').url()

				if (!src) return null

				return (
					<figure className="-mx-6 my-12 sm:-mx-16 lg:-mx-24">
						<Image
							src={src}
							alt={value?.alt ?? ''}
							width={width}
							height={height}
							className="h-auto w-full rounded-2xl"
							sizes="(min-width: 1024px) 1200px, 100vw"
						/>
						{value?.caption ? (
							<figcaption className="text-muted-foreground mt-4 px-6 text-sm italic sm:px-16 lg:px-24">
								{value.caption}
							</figcaption>
						) : null}
					</figure>
				)
			},
			code: CodeBlock,
			footnote: FootnoteDefinition
		},
		marks: {
			link: ({value, children}: any) => {
				const href = value?.href || ''
				const isInternal = href.startsWith('/') || href.startsWith('#')

				if (isInternal) {
					return <Link href={href}>{children}</Link>
				}

				return (
					<a href={href} target="_blank" rel="noopener noreferrer">
						{children}
					</a>
				)
			},
			footnote: FootnoteReference,
			strong: ({children}: any) => <strong>{children}</strong>,
			em: ({children}: any) => <em>{children}</em>,
			code: InlineCode
		},
		block: {
			h1: ({children}: any) => <h1 className="text-foreground">{children}</h1>,
			h2: ({children}: any) => <h2 className="text-foreground">{children}</h2>,
			h3: ({children}: any) => <h3 className="text-foreground">{children}</h3>,
			h4: ({children}: any) => <h4 className="text-foreground">{children}</h4>,
			h5: ({children}: any) => <h5 className="text-foreground">{children}</h5>,
			h6: ({children}: any) => <h6 className="text-foreground">{children}</h6>,
			blockquote: ({children}: any) => (
				<blockquote className="border-muted-foreground/30 my-7 border-l-3 pl-6 italic">
					{children}
				</blockquote>
			)
		}
	}

	return components
}

export function PortableText({blocks}: PortableTextProps) {
	footnoteDefinitions.clear()

	blocks.forEach((block: any) => {
		if (block._type === 'footnote' && block.id) {
			footnoteDefinitions.set(block.id, block)
		}
	})

	const components = createComponents()
	return (
		<div className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mt-20 prose-h1:mb-10 prose-h1:leading-tight prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-tight prose-h3:text-2xl prose-h3:mt-14 prose-h3:mb-6 prose-h3:leading-snug prose-h4:text-xl prose-h4:mt-12 prose-h4:mb-5 prose-h5:text-lg prose-h5:mt-10 prose-h5:mb-4 prose-h6:text-base prose-h6:mt-8 prose-h6:mb-3 prose-h6:uppercase prose-h6:text-muted-foreground prose-p:text-base prose-p:leading-relaxed prose-p:mb-10 prose-p:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-img:rounded-2xl sm:prose-p:text-lg sm:prose-p:leading-relaxed lg:prose-p:text-lg lg:prose-p:leading-loose sm:prose-h1:text-5xl sm:prose-h2:text-4xl sm:prose-h3:text-3xl lg:prose-h1:text-6xl lg:prose-h2:text-5xl lg:prose-h3:text-4xl dark:prose-invert dark:prose-p:text-muted-foreground max-w-none">
			<SanityPortableText value={blocks} components={components} />
		</div>
	)
}

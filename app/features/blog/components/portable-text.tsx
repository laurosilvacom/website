'use client'

import {
	PortableText as SanityPortableText,
	type PortableTextComponents,
	type PortableTextComponentProps,
	type PortableTextMarkComponentProps,
	type PortableTextTypeComponentProps,
} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
import {
	getSanityImageBlurDataUrl,
	getSanityImageUrl,
} from '@/shared/integrations/sanity/image'
import {CodeCopyButton} from '@/shared/components/copy-button'
import {Footnote} from '@/shared/components/footnote'

interface PortableTextProps {
	blocks: PortableTextBlock[]
}

type FootnoteDefinitionRecord = {
	id: string
	content: PortableTextBlock[]
}

type PortableTextImageValue = {
	asset?: {
		url?: string
		metadata?: {
			lqip?: string
			dimensions?: {
				width?: number
				height?: number
			}
		}
	}
	alt?: string
	caption?: string
}

type CodeBlockValue = {
	code?: string
	language?: string
	highlightedHTML?: string
}

type MarkLinkValue = {
	_type: 'link'
	href?: string
}

type MarkFootnoteValue = {
	_type: 'footnote'
	footnoteId?: string
}

type FootnoteBlock = PortableTextBlock & {
	_type: 'footnote'
	id: string
	content: PortableTextBlock[]
}

function isFootnoteBlock(block: PortableTextBlock): block is FootnoteBlock {
	const maybe = block as unknown as {
		_type?: unknown
		id?: unknown
		content?: unknown
	}

	return (
		maybe._type === 'footnote' &&
		typeof maybe.id === 'string' &&
		Array.isArray(maybe.content)
	)
}

const footnoteDefinitions = new Map<string, FootnoteDefinitionRecord>()

function CodeBlock({value}: PortableTextTypeComponentProps<CodeBlockValue>) {
	const code = value.code ?? ''
	const language = value.language ?? 'plaintext'
	const highlightedHTML = value.highlightedHTML ?? `<pre><code>${code}</code></pre>`

	return (
		<div className="not-prose my-10">
			<div className="code-block group">
				<div className="code-block-header">
					<span className="code-block-lang">{language}</span>
					<CodeCopyButton code={code} />
				</div>
				<div
					className="code-block-content"
					dangerouslySetInnerHTML={{__html: highlightedHTML}}
				/>
			</div>
		</div>
	)
}

function InlineCode({children}: PortableTextMarkComponentProps) {
	return (
		<code className="inline-code rounded px-1.5 py-0.5 font-mono text-sm font-medium">
			{children}
		</code>
	)
}

function FootnoteReference({
	value,
	children,
}: PortableTextMarkComponentProps<MarkFootnoteValue>) {
	const footnoteId = value?.footnoteId
	if (!footnoteId) return <>{children}</>

	const definition = footnoteDefinitions.get(footnoteId)
	const footnoteContent = definition?.content

	return (
		<>
			{children}
			<Footnote id={footnoteId}>
				{footnoteContent ? (
					<SanityPortableText value={footnoteContent} components={createComponents()} />
				) : (
					'Footnote content not found'
				)}
			</Footnote>
		</>
	)
}

function FootnoteDefinition({
	value,
}: PortableTextTypeComponentProps<FootnoteDefinitionRecord>) {
	const footnoteId = value.id
	const content = value.content

	if (!footnoteId || !content) return null

	footnoteDefinitions.set(footnoteId, {id: footnoteId, content})

	const components = createComponents()

	return (
		<Footnote id={footnoteId}>
			<SanityPortableText value={content} components={components} />
		</Footnote>
	)
}

let components: PortableTextComponents | undefined

function createComponents(): PortableTextComponents {
	if (components) return components

	const created: PortableTextComponents = {
		types: {
			image: ({value}: PortableTextTypeComponentProps<PortableTextImageValue>) => {
				const width = value.asset?.metadata?.dimensions?.width ?? 1600
				const height = value.asset?.metadata?.dimensions?.height ?? 900
				const clampedWidth = Math.min(width, 1600)
				const clampedHeight = Math.max(
					1,
					Math.round((height / Math.max(width, 1)) * clampedWidth),
				)
				const src =
					getSanityImageUrl(value, {
						width: clampedWidth,
						height: clampedHeight,
						quality: 76,
						fit: 'max',
					}) ?? value.asset?.url
				const blurDataURL = getSanityImageBlurDataUrl(value)

				if (!src) return null

				return (
					<figure className="my-10">
						<Image
							src={src}
							alt={value.alt ?? ''}
							width={width}
							height={height}
							unoptimized
							className="h-auto w-full rounded-lg"
							sizes="(min-width: 1024px) 680px, 100vw"
							placeholder={blurDataURL ? 'blur' : 'empty'}
							blurDataURL={blurDataURL}
						/>
						{value.caption ? (
							<figcaption className="text-muted-foreground mt-3 text-xs">
								{value.caption}
							</figcaption>
						) : null}
					</figure>
				)
			},
			code: CodeBlock,
			footnote: FootnoteDefinition,
		},
		marks: {
			link: ({value, children}: PortableTextMarkComponentProps<MarkLinkValue>) => {
				const href = value?.href ?? ''
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
			strong: ({children}: PortableTextMarkComponentProps) => <strong>{children}</strong>,
			em: ({children}: PortableTextMarkComponentProps) => <em>{children}</em>,
			code: InlineCode,
		},
		block: {
			h1: ({children}: PortableTextComponentProps<any>) => (
				<h1 className="text-foreground">{children ?? null}</h1>
			),
			h2: ({children}: PortableTextComponentProps<any>) => (
				<h2 className="text-foreground">{children ?? null}</h2>
			),
			h3: ({children}: PortableTextComponentProps<any>) => (
				<h3 className="text-foreground">{children ?? null}</h3>
			),
			h4: ({children}: PortableTextComponentProps<any>) => (
				<h4 className="text-foreground">{children ?? null}</h4>
			),
			h5: ({children}: PortableTextComponentProps<any>) => (
				<h5 className="text-foreground">{children ?? null}</h5>
			),
			h6: ({children}: PortableTextComponentProps<any>) => (
				<h6 className="text-foreground">{children ?? null}</h6>
			),
			blockquote: ({children}: PortableTextComponentProps<any>) => (
				<blockquote className="border-foreground/15 text-foreground/60 my-8 border-l-2 py-1 pl-6 text-[0.9375rem] leading-[1.75]">
					{children ?? null}
				</blockquote>
			),
		},
	}

	components = created
	return created
}

export function PortableText({blocks}: PortableTextProps) {
	footnoteDefinitions.clear()

	for (const block of blocks) {
		if (isFootnoteBlock(block)) {
			footnoteDefinitions.set(block.id, {id: block.id, content: block.content})
		}
	}

	const components = createComponents()
	return (
		<div className="prose prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-2xl prose-h1:mt-16 prose-h1:mb-6 prose-h2:text-xl prose-h2:mt-14 prose-h2:mb-5 prose-h3:text-lg prose-h3:mt-12 prose-h3:mb-4 prose-h4:text-base prose-h4:mt-10 prose-h4:mb-3 prose-h5:text-sm prose-h5:mt-8 prose-h5:mb-2 prose-h6:text-xs prose-h6:mt-6 prose-h6:mb-2 prose-h6:text-muted-foreground prose-p:text-[0.9375rem] prose-p:leading-[1.75] prose-p:mb-6 prose-p:text-foreground/85 prose-li:text-[0.9375rem] prose-li:leading-[1.75] prose-li:text-foreground/85 prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-foreground/30 hover:prose-a:decoration-foreground/70 prose-strong:font-semibold prose-strong:text-foreground prose-code:text-sm prose-code:font-mono prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-foreground/15 prose-blockquote:text-foreground/60 prose-blockquote:not-italic prose-img:rounded-lg prose-hr:border-border prose-hr:my-16 dark:prose-invert max-w-none">
			<SanityPortableText value={blocks} components={components} />
		</div>
	)
}

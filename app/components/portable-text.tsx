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
		<figure className="my-9">
			<Image
				src={imageUrl}
				alt={alt}
				width={1200}
				height={675}
				quality={95}
				className="w-full rounded-lg shadow-lg"
			/>
			{alt && alt.toLowerCase() !== 'description' && (
				<figcaption className="text-muted-foreground mt-3 text-center text-sm">
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
					<figure className="my-8">
						<Image
							src={src}
							alt={value?.alt ?? ''}
							width={width}
							height={height}
							className="h-auto w-full"
							sizes="(min-width: 1024px) 768px, 100vw"
						/>
						{value?.caption ? (
							<figcaption className="text-muted-foreground mt-2 text-sm">
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
	return <SanityPortableText value={blocks} components={components} />
}

'use client'

import {PortableText as SanityPortableText} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import {type PortableTextBlock} from '@sanity/types'
import {highlight} from 'sugar-high'
import {urlForImage} from '@/lib/sanity/image'
import {CodeCopyButton} from './copy-button'
import {Footnote} from './footnote'

interface PortableTextProps {
	blocks: PortableTextBlock[]
}

// Store footnote definitions for reference lookups
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
	const language = value?.language || ''
	const codeHTML = highlight(code)

	return (
		<div className="border-border bg-card my-7 overflow-hidden rounded-lg border">
			<div className="border-border flex items-center justify-between border-b px-4 py-2">
				{language && (
					<span className="text-muted-foreground font-mono text-xs">
						{language}
					</span>
				)}
				<CodeCopyButton code={code} />
			</div>
			<pre className="overflow-auto p-4 text-sm leading-relaxed">
				<code
					className={`language-${language}`}
					dangerouslySetInnerHTML={{__html: codeHTML}}
				/>
			</pre>
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

	// Find the footnote definition
	const definition = footnoteDefinitions.get(footnoteId)
	const footnoteContent = definition?.content

	// Render the footnote button inline with the text
	// The footnote definition will be rendered separately as a type
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

	// Store the footnote definition for reference lookups
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

// Create components object that can reference itself for nested rendering
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
			h1: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h1 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h1>
				)
			},
			h2: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h2 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h2>
				)
			},
			h3: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h3 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h3>
				)
			},
			h4: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h4 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h4>
				)
			},
			h5: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h5 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h5>
				)
			},
			h6: ({children}: any) => {
				const text = typeof children === 'string' ? children : String(children)
				const slug = slugify(text)
				return (
					<h6 id={slug} className="text-foreground scroll-mt-20">
						{children}
					</h6>
				)
			},
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
	// Clear footnote definitions before rendering
	footnoteDefinitions.clear()

	// First pass: collect all footnote definitions
	blocks.forEach((block: any) => {
		if (block._type === 'footnote' && block.id) {
			footnoteDefinitions.set(block.id, block)
		}
	})

	const components = createComponents()
	return <SanityPortableText value={blocks} components={components} />
}

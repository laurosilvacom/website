import Image, {type ImageProps as NextImageProps} from 'next/image'
import Link from 'next/link'
import {MDXRemote, type MDXRemoteProps} from 'next-mdx-remote/rsc'
import React, {type ReactNode} from 'react'
import {highlight} from 'sugar-high'
import {CodeCopyButton} from './copy-button'
import {AlertCircle, AlertTriangle, CheckCircle, XCircle} from 'lucide-react'

interface StackBlitzProps {
	id: string
	height?: string
	file?: string
	view?: 'preview' | 'editor' | 'both'
	hideNavigation?: boolean
	hideDevTools?: boolean
	hideExplorer?: boolean
	hideTerminal?: boolean
	terminalHeight?: number
	devToolsHeight?: number
	theme?: 'dark' | 'light'
	clickToLoad?: boolean
	isGithub?: boolean
}

function StackBlitz({
	id,
	height = '500px',
	file = 'src/App.tsx',
	view = 'both',
	hideNavigation = true,
	hideDevTools = false,
	hideExplorer = false,
	hideTerminal = false,
	terminalHeight,
	devToolsHeight,
	theme = 'dark',
	clickToLoad = false,
	isGithub = false
}: StackBlitzProps) {
	const params = new URLSearchParams({
		embed: '1',
		file,
		view,
		hideNavigation: hideNavigation ? '1' : '0',
		hideDevTools: hideDevTools ? '1' : '0',
		hideExplorer: hideExplorer ? '1' : '0',
		hideTerminal: hideTerminal ? '1' : '0',
		theme,
		...(terminalHeight && {terminalHeight: terminalHeight.toString()}),
		...(devToolsHeight && {devToolsHeight: devToolsHeight.toString()}),
		...(clickToLoad && {clickToLoad: '1'})
	})

	const baseUrl = isGithub
		? `https://stackblitz.com/github/${id}`
		: `https://stackblitz.com/edit/${id}`

	return (
		<div className="bg-card text-card-foreground border-border my-8 overflow-hidden rounded-xl border shadow-xs">
			<div className="bg-muted border-border border-b px-4 py-2">
				<div className="text-muted-foreground text-sm">StackBlitz Example</div>
			</div>
			<iframe
				src={`${baseUrl}?${params.toString()}`}
				className="bg-card w-full"
				style={{height}}
				title="StackBlitz Example"
				loading="lazy"
			/>
		</div>
	)
}

type ImageProps = Omit<NextImageProps, 'width' | 'height'> & {
	width?: number
	height?: number
}

function Table({data}) {
	return (
		<div className="bg-card text-foreground border-border my-8 overflow-hidden rounded-xl border shadow-xs">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr>
							{data.headers.map((header, i) => (
								<th
									key={`header-${i}`}
									className="border-border text-foreground bg-muted text-md border-b px-4 py-3 text-left font-medium">
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.rows.map((row, i) => (
							<tr
								key={`row-${i}`}
								className="border-border hover:bg-muted/50 border-b transition-colors last:border-0">
								{row.map((cell, j) => (
									<td key={`cell-${i}-${j}`} className="px-4 py-3">
										{cell}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

function CustomLink({href, children, ...props}) {
	const isInternal = href.startsWith('/')
	const isAnchor = href.startsWith('#')

	const linkClass =
		'text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm transition-colors'

	if (isInternal) {
		return (
			<Link href={href} className={linkClass} {...props}>
				{children}
			</Link>
		)
	}

	if (isAnchor) {
		return (
			<a href={href} className={linkClass} {...props}>
				{children}
			</a>
		)
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`${linkClass} inline-flex items-center gap-1`}
			{...props}>
			{children}
			<span className="text-xs">↗</span>
		</a>
	)
}

function RoundedImage({alt, ...imageProps}: ImageProps) {
	return (
		<figure className="bg-card border-border my-8 overflow-hidden rounded-xl border">
			<Image
				className="w-full"
				width={1200}
				height={675}
				quality={95}
				alt={alt || 'Image'}
				{...imageProps}
			/>
			{alt && (
				<figcaption className="bg-muted border-border text-muted-foreground mt-0 border-t p-3 text-center text-sm">
					{alt}
				</figcaption>
			)}
		</figure>
	)
}

function Code({children, ...props}) {
	const codeHTML = highlight(children)
	const isInPre = props.className?.includes('language-')

	if (isInPre) {
		return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
	}

	// Josh-style inline code
	return (
		<code
			className="bg-secondary/70 text-secondary-foreground ring-border/40 relative inline-block rounded px-1.5 py-0.5 font-mono text-sm font-medium ring-1"
			dangerouslySetInnerHTML={{__html: codeHTML}}
		/>
	)
}

function Pre({
	children,
	...props
}: {children: React.ReactNode} & React.HTMLAttributes<HTMLPreElement>) {
	// Initialize language as null
	let language: string | null = null
	let filePath: string | null = null

	// Extract code content
	const originalCode = extractTextFromChildren(children)
	let displayCode = originalCode

	// Check if the first line contains a file path comment
	if (originalCode && originalCode.trim() !== '') {
		const lines = originalCode.split('\n')
		if (lines.length > 0 && lines[0]) {
			const firstLine = lines[0].trim()

			// Check for // path.tsx or /* path.tsx */ or # path.tsx format
			if (
				firstLine.startsWith('// ') ||
				firstLine.startsWith('/* ') ||
				firstLine.startsWith('# ')
			) {
				// Extract the file path
				filePath = firstLine
					.replace(/^(\/\/|\/\*|#)\s+/, '')
					.replace(/\s+\*\/$/, '')

				// Remove the first line for display
				displayCode = lines.slice(1).join('\n')
			}
		}
	}

	// Type-safe check for React element and extract language
	let className = ''
	if (React.isValidElement(children)) {
		// Type assertion with proper type checking
		const childProps = children.props as {className?: string} | undefined

		if (childProps && childProps.className) {
			className = childProps.className
			const match = childProps.className.match(/language-(\w+)/)
			language = match && match[1] ? match[1] : null
		}
	}

	return (
		<div className="not-prose border-border bg-card ring-border/40 my-10 overflow-hidden rounded-xl border ring-1 shadow-sm">
			{/* Josh-style header */}
			<div className="border-border bg-secondary/30 flex items-center justify-between border-b px-4 py-2.5">
				<div className="flex items-center space-x-2">
					{/* Simple dot indicator */}
					<div className="bg-primary/60 h-2 w-2 rounded-full"></div>

					{/* File path takes precedence over language badge */}
					{filePath ? (
						<span className="text-primary/60 font-mono text-xs font-semibold">
							{filePath}
						</span>
					) : (
						language && (
							<span className="text-primary/60 font-mono text-xs font-semibold">
								{language}
							</span>
						)
					)}
				</div>

				{/* Copy button - always use the original code for copying */}
				<CodeCopyButton code={originalCode} />
			</div>

			{/* Code content with refined styling - manually render the highlighted code */}
			<div className="relative">
				<pre className="overflow-auto p-4 text-sm leading-relaxed" {...props}>
					<code
						className={className}
						dangerouslySetInnerHTML={{__html: highlight(displayCode)}}
					/>
				</pre>
			</div>
		</div>
	)
}

function extractTextFromChildren(children: React.ReactNode): string {
	if (typeof children === 'string') return children

	if (React.isValidElement(children)) {
		const childProps = children.props as {children?: React.ReactNode}

		if (childProps.children) {
			if (typeof childProps.children === 'string') {
				return childProps.children
			}
			return extractTextFromChildren(childProps.children)
		}
	}

	if (Array.isArray(children)) {
		return children
			.map((child) => extractTextFromChildren(child))
			.filter(Boolean)
			.join('')
	}

	return ''
}

function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
	return function Heading({
		children,
		...props
	}: {children: React.ReactNode} & React.HTMLAttributes<HTMLElement>) {
		const content = React.isValidElement(children)
			? extractTextFromChildren(children)
			: String(children)

		const slug = slugify(content)

		return React.createElement(
			`h${level}`,
			{
				id: slug,
				className: `text-foreground group relative my-6 font-bold scroll-mt-20`,
				...props
			},
			React.createElement(
				'a',
				{
					href: `#${slug}`,
					key: `link-${slug}`,
					className: `absolute -left-5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-opacity`
				},
				'#'
			),
			children
		)
	}
}

function Blockquote({children}: {children: ReactNode}) {
	return (
		<blockquote className="bg-card border-primary text-card-foreground my-8 border-l-4 py-4 pl-6">
			{children}
		</blockquote>
	)
}

function Em({children}) {
	return (
		<em className="bg-secondary text-secondary-foreground rounded-sm px-2 py-0.5 not-italic">
			{children}
		</em>
	)
}

function Strong({children}: {children: ReactNode}) {
	return (
		<strong className="relative inline-block font-bold">
			<span className="text-primary relative z-10">{children}</span>
			<span className="bg-primary/15 absolute bottom-0.5 left-0 z-0 h-3 w-full rounded-sm"></span>
		</strong>
	)
}

function Hr() {
	return (
		<div className="my-12 flex items-center">
			<div className="border-border flex-grow border-t"></div>
			<div className="mx-4 flex space-x-1.5">
				<div className="bg-primary/30 h-1.5 w-1.5 rounded-full"></div>
				<div className="bg-primary/50 h-1.5 w-1.5 rounded-full"></div>
				<div className="bg-primary/30 h-1.5 w-1.5 rounded-full"></div>
			</div>
			<div className="border-border flex-grow border-t"></div>
		</div>
	)
}

function UnorderedList({children}: {children: ReactNode}) {
	return <ul className="my-6 ml-6 space-y-3">{children}</ul>
}

function OrderedList({children}: {children: ReactNode}) {
	return (
		<ol className="marker:text-primary my-6 ml-6 list-decimal space-y-3 marker:font-medium">
			{children}
		</ol>
	)
}

function ListItem({children}: {children: ReactNode}) {
	return <li className="relative pl-1">{children}</li>
}

function Alert({
	children,
	type = 'info'
}: {
	children: ReactNode
	type?: 'info' | 'warning' | 'error' | 'success'
}) {
	// Enhanced styling with better contrast
	const styles = {
		info: 'bg-primary/5 border-primary/20 text-foreground',
		warning: 'bg-destructive/5 border-destructive/20 text-foreground',
		error: 'bg-destructive/10 border-destructive/30 text-foreground',
		success: 'bg-primary/5 border-primary/20 text-foreground'
	}

	// Icon mapping using Lucide icons
	const icons = {
		info: <AlertCircle className="text-primary h-5 w-5 flex-shrink-0" />,
		warning: (
			<AlertTriangle className="text-destructive/70 h-5 w-5 flex-shrink-0" />
		),
		error: <XCircle className="text-destructive h-5 w-5 flex-shrink-0" />,
		success: <CheckCircle className="text-primary/70 h-5 w-5 flex-shrink-0" />
	}

	// Labels for screen readers
	const ariaLabels = {
		info: 'Information',
		warning: 'Warning',
		error: 'Error',
		success: 'Success'
	}

	return (
		<div className={`my-8 rounded-lg border p-4 ${styles[type]}`}>
			<div className="flex items-center">
				{/* Icon with flex-shrink-0 to prevent distortion */}
				<div className="flex-shrink-0">{icons[type]}</div>

				{/* Content with proper spacing */}
				<div className="ml-3">
					<span className="sr-only">{ariaLabels[type]}</span>
					<div>{children}</div>
				</div>
			</div>
		</div>
	)
}

function Callout({children, emoji}: {children: ReactNode; emoji: string}) {
	return (
		<div className="bg-muted/40 border-border my-8 overflow-hidden rounded-lg border">
			<div className="flex items-center gap-4 p-5">
				{/* Emoji container - perfectly centered */}
				<div
					className="bg-card flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl"
					role="img"
					aria-label={`Callout emoji: ${emoji}`}>
					{emoji}
				</div>

				{/* Content container */}
				<div className="text-foreground flex-1">{children}</div>
			</div>
		</div>
	)
}

function Demo({children}) {
	return (
		<div className="bg-card my-8 overflow-hidden rounded-lg border">
			<div className="bg-card border-b p-3 text-sm font-medium">Demo</div>
			<div className="p-4">{children}</div>
		</div>
	)
}

function Kbd({children}) {
	return (
		<kbd className="bg-secondary text-secondary-foreground rounded border px-1.5 py-0.5 font-mono text-xs">
			{children}
		</kbd>
	)
}

function Details({children, title}: {children: ReactNode; title: string}) {
	return (
		<details className="bg-card my-6 overflow-hidden rounded-lg border">
			<summary className="bg-muted cursor-pointer px-4 py-3 font-medium">
				{title}
			</summary>
			<div className="p-4">{children}</div>
		</details>
	)
}

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
	pre: Pre,
	Table,
	blockquote: Blockquote,
	em: Em,
	strong: Strong,
	hr: Hr,
	ul: UnorderedList,
	ol: OrderedList,
	li: ListItem,
	InfoBox: Alert, // Map InfoBox to our Alert component
	Callout,
	Demo,
	Kbd,
	Details,
	StackBlitz
}

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{...components, ...(props.components || {})}}
		/>
	)
}

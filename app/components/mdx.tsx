import Image, {type ImageProps as NextImageProps} from 'next/image'
import Link from 'next/link'
import {MDXRemote, type MDXRemoteProps} from 'next-mdx-remote/rsc'
import React, {type ReactNode} from 'react'
import {highlight} from 'sugar-high'
import {CodeCopyButton} from './copy-button'

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
		<div className="bg-card my-8 overflow-auto rounded-xl border p-4 text-base shadow-xs md:my-8">
			<iframe
				src={`${baseUrl}?${params.toString()}`}
				className="border-border bg-card w-full rounded-xl border"
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

// Whimsical table with hover effects and playful borders
function Table({data}) {
	return (
		<div className="-mx-0 my-8 overflow-x-auto rounded-xl border p-4 text-base shadow-xs md:-mx-14 md:my-8">
			<table className="animate-fade-in w-full border-collapse">
				<thead>
					<tr className="border-border border-b-2">
						{data.headers.map((header, i) => (
							<th key={i} className="text-foreground p-4 text-left font-bold">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((row, i) => (
						<tr
							key={i}
							className="border-border hover:bg-secondary border-b transition-colors duration-150">
							{row.map((cell, j) => (
								<td key={j} className="p-4">
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function CustomLink({href, children, ...props}) {
	const isInternal = href.startsWith('/')
	const isAnchor = href.startsWith('#')

	const baseStyles = `
    relative
    text-foreground
    outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2
    rounded-sm
    decoration-[0.1em]
    decoration-primary/40
    underline
    underline-offset-[0.2em]
    transition-all
    hover:decoration-[0.15em]
    hover:text-foreground
    motion-safe:transition-all
  `

	const hoverStyles = `
    hover:after:scale-x-100
    after:absolute
    after:inset-x-0
    after:bottom-0
    after:h-[0.1em]
    after:bg-current
    after:scale-x-0
    after:origin-right
    after:transition-transform
    after:duration-300
    motion-safe:after:transition-transform
    motion-safe:hover:-translate-y-[0.05em]
  `

	if (isInternal) {
		return (
			<Link href={href} className={`${baseStyles} ${hoverStyles}`} {...props}>
				{children}
			</Link>
		)
	}

	if (isAnchor) {
		return (
			<a href={href} className={`${baseStyles} ${hoverStyles}`} {...props}>
				{children}
			</a>
		)
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`${baseStyles} ${hoverStyles} inline-flex items-center gap-0.5`}
			{...props}>
			{children}
			<span className="text-[0.7em] transition-transform duration-150 motion-safe:group-hover:translate-x-[0.1em] motion-safe:group-hover:translate-y-[-0.1em]">
				↗
			</span>
		</a>
	)
}

// Delightful image component with subtle animations
function RoundedImage({alt, ...imageProps}: ImageProps) {
	return (
		<div className="not-prose group relative my-16 w-full overflow-hidden">
			<div className="relative overflow-hidden rounded-xl transition-all duration-500">
				{/* Ambient light effect */}
				<div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					<div className="from-primary/20 to-chart-2/20 absolute inset-0 bg-gradient-to-br via-transparent blur-2xl" />
				</div>

				{/* Subtle border that shows on hover */}
				<div className="border-primary/10 absolute inset-0 border opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

				{/* Image with hover effect */}
				<div className="transform-gpu transition-transform duration-500 ease-out will-change-transform">
					<Image
						className="h-auto w-full object-cover"
						width={1200}
						height={675}
						quality={95}
						alt={alt || 'Default alt text'}
						{...imageProps}
					/>
				</div>
			</div>

			{/* Optional caption with fade-in effect */}
			{alt && (
				<figcaption className="text-muted-foreground mt-3 text-center text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
					{alt}
				</figcaption>
			)}
		</div>
	)
}

function Code({children, ...props}) {
	const codeHTML = highlight(children)
	const isInPre = props.className?.includes('language-')

	if (isInPre) {
		return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
	}

	return (
		<span className="relative inline-flex">
			<CodeCopyButton code={children?.toString() ?? ''} />
			<code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
		</span>
	)
}

function Pre({children, ...props}) {
	return (
		<pre className="group relative" {...props}>
			<CodeCopyButton code={extractTextFromChildren(children)} />
			{children}
		</pre>
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

// Helper function for creating heading anchors
function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/\-\-+/g, '-')
}

// Interactive headings with hover effects
function createHeading(level: number) {
	return function Heading({
		children,
		...props
	}: {children: React.ReactNode} & React.HTMLAttributes<HTMLElement>) {
		const slug = slugify(children)
		return React.createElement(
			`h${level}`,
			{
				id: slug,
				className: `
					group relative
					flex items-center
					my-6 font-bold
                    text-foreground
				`,
				...props
			},
			React.createElement(
				'a',
				{
					href: `#${slug}`,
					key: `link-${slug}`,
					className: `
						absolute -left-6
                        opacity-0 group-hover:opacity-100
						transition-opacity duration-200
						text-muted-foreground hover:text-foreground
					`
				},
				'#'
			),
			children
		)
	}
}

function Blockquote({children}: {children: ReactNode}) {
	return (
		<blockquote className="bg-card border-border relative my-20 rounded-xl border-2 p-16 shadow-xl">
			<div className="border-primary bg-background absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-xl border-2 shadow-md">
				<span className="text-primary translate-y-[3px] text-2xl">❝</span>
			</div>

			<div className="relative">
				<div className="text-foreground pt-2 leading-relaxed font-medium">
					{children}
				</div>
				<div className="from-primary/30 mt-4 h-px w-16 bg-gradient-to-r to-transparent" />
			</div>
		</blockquote>
	)
}

function Em({children}) {
	return (
		<em className="py-0.4 from-primary/20 to-primary/10 text-foreground rounded-sm bg-gradient-to-r px-2 font-medium not-italic">
			{children}
		</em>
	)
}

function Strong({children}: {children: ReactNode}) {
	return (
		<strong className="text-foreground decoration-primary font-semibold underline decoration-wavy underline-offset-[5px] transition-all duration-500 ease-out hover:underline-offset-[6px]">
			{children}
		</strong>
	)
}

function Hr() {
	return (
		<hr className="via-border my-12 h-[2px] border-none bg-gradient-to-r from-transparent to-transparent" />
	)
}

function UnorderedList({children}: {children: ReactNode}) {
	return <ul className="my-6 ml-6 list-none space-y-2">{children}</ul>
}

function OrderedList({children}: {children: ReactNode}) {
	return (
		<ol className="marker:text-primary my-6 ml-6 list-decimal space-y-2 marker:font-medium">
			{children}
		</ol>
	)
}

function ListItem({children}: {children: ReactNode}) {
	return (
		<li className="group [&:not(ol>&)]:before:text-primary relative pl-2 [&:not(ol>&)]:before:absolute [&:not(ol>&)]:before:top-0 [&:not(ol>&)]:before:-left-4 [&:not(ol>&)]:before:transition-transform [&:not(ol>&)]:before:duration-200 [&:not(ol>&)]:before:content-['•'] [&:not(ol>&)]:hover:before:scale-150">
			{children}
		</li>
	)
}

function InfoBox({
	children,
	type = 'info'
}: {
	children: ReactNode
	type?: 'info' | 'warning' | 'error' | 'success'
}) {
	const styles = {
		info: {
			containerClass: 'bg-primary/5 border-primary/20',
			iconClass: 'text-primary',
			icon: '💡'
		},
		warning: {
			containerClass: 'bg-destructive/5 border-destructive/20',
			iconClass: 'text-destructive',
			icon: '⚠️'
		},
		error: {
			containerClass: 'bg-destructive/10 border-destructive/30',
			iconClass: 'text-destructive',
			icon: '❌'
		},
		success: {
			containerClass: 'bg-primary/5 border-primary/20',
			iconClass: 'text-primary',
			icon: '✅'
		}
	}

	return (
		<div
			className={`relative my-8 rounded-lg border-2 ${styles[type].containerClass} p-6 pt-8 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}>
			<div
				className={`absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full border-2 ${styles[type].containerClass} bg-background shadow-md`}>
				<span className="text-lg">{styles[type].icon}</span>
			</div>
			<div className="prose dark:prose-invert max-w-none">{children}</div>
		</div>
	)
}

function Callout({children, emoji}: {children: ReactNode; emoji: string}) {
	return (
		<div className="group relative my-8">
			{/* Subtle glow effect */}
			<div className="from-primary/30 via-primary/20 to-primary/30 absolute -inset-[1px] animate-pulse rounded-xl bg-gradient-to-r opacity-25 blur-xl" />

			{/* Main card */}
			<div className="bg-card relative rounded-xl p-6 shadow-sm">
				<div className="flex items-baseline gap-5">
					{/* Emoji container */}
					<div
						className="relative flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:-rotate-6"
						role="img"
						aria-label={`Callout indicated by ${emoji}`}>
						<span className="text-2xl">{emoji}</span>
					</div>

					{/* Content */}
					<div className="flex-1">
						<div className="text-foreground text-lg leading-relaxed [text-wrap:pretty]">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function Demo({children}) {
	return (
		<div className="border-border bg-card my-8 transform rounded-lg border p-6 shadow-lg transition-all duration-300 hover:-translate-y-0.5">
			{children}
		</div>
	)
}

function Kbd({children}) {
	return (
		<kbd className="border-border bg-secondary rounded border px-2 py-1 font-mono text-sm shadow-sm">
			{children}
		</kbd>
	)
}

function Details({children, title}: {children: ReactNode; title: string}) {
	return (
		<details className="group my-4 rounded-lg">
			{/* Native details/summary elements for built-in functionality */}
			<summary className="bg-card hover:bg-primary/5 flex cursor-pointer items-center justify-between rounded-lg p-4 text-lg font-medium transition-all">
				<span>{title}</span>
				{/* Unicode chevron that rotates */}
				<span className="text-primary/60 transition-transform duration-200 group-open:rotate-90">
					›
				</span>
			</summary>

			{/* Content with slide animation */}
			<div className="border-primary/10 bg-card/50 rounded-b-lg border-x border-b p-4 pt-2">
				{children}
			</div>
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
	InfoBox,
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

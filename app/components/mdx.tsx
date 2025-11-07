import Image, {type ImageProps as NextImageProps} from 'next/image'
import Link from 'next/link'
import {MDXRemote, type MDXRemoteProps} from 'next-mdx-remote/rsc'
import React, {type ReactNode} from 'react'
import {highlight} from 'sugar-high'
import {CodeCopyButton} from './copy-button'

type ImageProps = Omit<NextImageProps, 'width' | 'height'> & {
	width?: number
	height?: number
}

function CustomLink({
	href,
	children,
	...props
}: {
	href: string
	children: ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	const isInternal = href.startsWith('/') || href.startsWith('#')

	if (isInternal) {
		return (
			<Link href={href} {...props}>
				{children}
			</Link>
		)
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			{...props}>
			{children}
		</a>
	)
}

function RoundedImage({alt, ...imageProps}: ImageProps) {
	return (
		<figure className="my-9">
			<Image
				className="w-full rounded-lg"
				width={1200}
				height={675}
				quality={95}
				alt={alt || ''}
				{...imageProps}
			/>
			{alt && (
				<figcaption className="text-muted-foreground mt-3 text-center text-sm">
					{alt}
				</figcaption>
			)}
		</figure>
	)
}

function Code({
	children,
	...props
}: {
	children: string
} & React.HTMLAttributes<HTMLElement>) {
	const codeHTML = highlight(children)
	const isInPre = props.className?.includes('language-')

	if (isInPre) {
		return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
	}

	return (
		<code
			className="inline-code rounded px-1.5 py-0.5 font-mono text-[0.9em] font-medium"
			dangerouslySetInnerHTML={{__html: codeHTML}}
			{...props}
		/>
	)
}

function extractTextFromChildren(children: React.ReactNode): string {
	if (typeof children === 'string') return children

	if (React.isValidElement(children)) {
		const childProps = children.props as {children?: React.ReactNode}
		if (childProps?.children) {
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

function Pre({
	children,
	...props
}: {children: React.ReactNode} & React.HTMLAttributes<HTMLPreElement>) {
	let language: string | null = null
	let className = ''

	if (React.isValidElement(children)) {
		const childProps = children.props as {className?: string}
		if (childProps?.className) {
			className = childProps.className
			const match = childProps.className.match(/language-(\w+)/)
			language = match?.[1] || null
		}
	}

	const code = extractTextFromChildren(children)

	return (
		<div className="my-7 overflow-hidden rounded-lg border border-border bg-card">
			<div className="flex items-center justify-between border-b border-border px-4 py-2">
				{language && (
					<span className="text-muted-foreground font-mono text-xs">
						{language}
					</span>
				)}
				<CodeCopyButton code={code} />
			</div>
			<pre className="overflow-auto p-4 text-sm leading-relaxed" {...props}>
				<code
					className={className}
					dangerouslySetInnerHTML={{__html: highlight(code)}}
				/>
			</pre>
		</div>
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

function createHeading(level: number) {
	return function Heading({
		children,
		...props
	}: {children: React.ReactNode} & React.HTMLAttributes<HTMLElement>) {
		const content = React.isValidElement(children)
			? extractTextFromChildren(children)
			: String(children)

		const slug = slugify(content)

		return React.createElement(`h${level}`, {
			id: slug,
			className: 'scroll-mt-20 text-foreground',
			...props
		}, children)
	}
}

function Table({
	data
}: {
	data: {headers: string[]; rows: string[][]}
}) {
	return (
		<div className="my-7 overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b">
						{data.headers.map((header: string, i: number) => (
							<th
								key={`header-${i}`}
								className="px-4 py-3 text-left text-sm font-medium">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((row: string[], i: number) => (
						<tr key={`row-${i}`} className="border-b last:border-0">
							{row.map((cell: string, j: number) => (
								<td key={`cell-${i}-${j}`} className="px-4 py-3 text-sm">
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

function Alert({
	children,
	type = 'info'
}: {
	children: ReactNode
	type?: 'info' | 'warning' | 'error' | 'success'
}) {
	return (
		<div className="my-7 rounded-lg border border-muted-foreground/20 p-5">
			{children}
		</div>
	)
}

function Callout({children, emoji}: {children: ReactNode; emoji?: string}) {
	return (
		<div className="my-7 rounded-lg border border-muted-foreground/20 p-5">
			{children}
		</div>
	)
}

function Demo({children}: {children: ReactNode}) {
	return (
		<div className="my-7 rounded-lg border p-5">
			{children}
		</div>
	)
}

function Kbd({children}: {children: ReactNode}) {
	return (
		<kbd className="bg-muted rounded border px-1.5 py-0.5 font-mono text-xs">
			{children}
		</kbd>
	)
}

function StackBlitz({id, height}: {id?: string; height?: string}) {
	// Embed functionality removed - component renders nothing
	return null
}

function Details({children, title}: {children: ReactNode; title: string}) {
	return (
		<details className="my-7 rounded-lg border">
			<summary className="cursor-pointer px-4 py-3 text-sm font-medium">
				{title}
			</summary>
			<div className="border-t p-4 text-sm">{children}</div>
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
	blockquote: ({children}: {children: ReactNode}) => (
		<blockquote className="my-7 border-l-3 border-muted-foreground/30 pl-6 italic">
			{children}
		</blockquote>
	),
	InfoBox: Alert,
	Callout,
	Demo,
	Kbd,
	StackBlitz,
	Details
}

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{...components, ...(props.components || {})}}
		/>
	)
}

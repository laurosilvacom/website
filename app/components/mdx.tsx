import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {highlight} from 'sugar-high'
import type {MDXRemoteProps} from 'next-mdx-remote/rsc'

function Table({data}) {
	const headers = data.headers.map((header, index) => (
		<th key={index}>{header}</th>
	))
	const rows = data.rows.map((row, index) => (
		<tr key={index}>
			{row.map((cell, cellIndex) => (
				<td key={cellIndex}>{cell}</td>
			))}
		</tr>
	))

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	)
}

function CustomLink({href, children, ...props}) {
	if (href.startsWith('/')) {
		return (
			<Link href={href} {...props}>
				{children}
			</Link>
		)
	}

	if (href.startsWith('#')) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		)
	}

	return (
		<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
			{children}
		</a>
	)
}

function RoundedImage(props) {
	return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Code({children, ...props}) {
	const codeHTML = highlight(children)
	return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
}

function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/\-\-+/g, '-')
}

function createHeading(level) {
	return function Heading({children, ...props}) {
		const slug = slugify(children)
		return React.createElement(
			`h${level}`,
			{id: slug, ...props},
			[
				React.createElement('a', {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: 'anchor'
				})
			],
			children
		)
	}
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
	Table
}

export function CustomMDX(props: MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{...components, ...(props.components || {})}}
		/>
	)
}

'use client'

import Container from 'app/components/container'
import Link from 'next/link'
import {useEffect, useState} from 'react'

interface FooterLink {
	href: string
	text: string
	external?: boolean
}

interface FooterSections {
	[key: string]: FooterLink[]
}

interface FooterSectionProps {
	title: string
	links: FooterLink[]
	isExpanded?: boolean
	onToggle?: () => void
}

const FooterSection = ({
	title,
	links,
	isExpanded,
	onToggle
}: FooterSectionProps) => {
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

	return (
		<div className="w-full sm:w-auto">
			<button
				onClick={onToggle}
				className="text-primary flex w-full items-center justify-between text-left font-mono text-xs tracking-wider uppercase opacity-80 sm:cursor-default"
				aria-expanded={isMobile ? isExpanded : true}
				aria-controls={`footer-${title.toLowerCase()}`}>
				<strong>{title}</strong>
				{isMobile && (
					<span
						className="transition-transform duration-200 sm:hidden"
						aria-hidden="true">
						{isExpanded ? '−' : '+'}
					</span>
				)}
			</button>
			<ul
				id={`footer-${title.toLowerCase()}`}
				className={`space-y-2 overflow-hidden pt-3 text-sm font-medium transition-all duration-300 ease-in-out ${isMobile && !isExpanded ? 'max-h-0' : 'max-h-[500px]'}`}
				role="menu">
				{links.map((link) => (
					<li key={link.text} role="none">
						{link.external ? (
							<a
								href={link.href}
								className="text-muted-foreground hover:text-foreground inline-block py-2 transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								role="menuitem">
								{link.text}
								<span className="sr-only">(opens in new tab)</span>
							</a>
						) : (
							<Link
								href={link.href}
								className="text-muted-foreground hover:text-foreground inline-block py-2 transition-colors"
								role="menuitem">
								{link.text}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default function Footer() {
	const [expandedSections, setExpandedSections] = useState<{
		[key: string]: boolean
	}>({})
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const sections: FooterSections = {
		Resources: [
			{href: '/blog', text: 'Blog'},
			{href: '/tutorials', text: 'Tutorials'},
			{href: '/workshops', text: 'Workshops'}
		],
		Social: [
			{
				href: 'https://github.com/laurosilvacom',
				text: 'GitHub',
				external: true
			},
			{href: 'https://twitter.com', text: 'Twitter', external: true},
			{href: '/rss', text: 'RSS'}
		]
	}

	const toggleSection = (title: string) => {
		if (window.innerWidth >= 640) return // Don't toggle on desktop
		setExpandedSections((prev) => ({
			...prev,
			[title]: !prev[title]
		}))
	}

	if (!isMounted) {
		return null // Prevent hydration mismatch
	}

	return (
		<footer
			className="bg-card border-border relative mt-32 w-full border-t pb-32 print:hidden"
			role="contentinfo">
			<Container className="mx-auto w-full max-w-screen-lg">
				<div
					className="via-border absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"
					aria-hidden="true"
				/>

				<div className="relative mx-auto flex w-full max-w-screen-lg flex-col items-start justify-between gap-16 pt-14 pb-48 sm:flex-row sm:pt-16">
					<div className="relative mx-auto flex w-full flex-col items-start gap-8 sm:flex-row sm:items-start sm:gap-16">
						{Object.entries(sections).map(([title, links]) => (
							<FooterSection
								key={title}
								title={title}
								links={links}
								isExpanded={expandedSections[title]}
								onToggle={() => toggleSection(title)}
							/>
						))}
					</div>

					{/* Copyright and Terms */}
					<div className="text-muted-foreground absolute bottom-5 flex items-center gap-5 text-sm">
						<span>© {new Date().getFullYear()} Lauro Silva, LLC</span>
					</div>
				</div>
			</Container>
		</footer>
	)
}

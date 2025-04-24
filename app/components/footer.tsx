'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import Container from 'app/components/container'
import {ModeToggle} from './toggle'
import {cn} from '@/lib/utils'

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

// Icon components remain the same
const HireIcon = () => (
	<svg
		className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-[-2px]"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
		<path d="M12 22v-8" />
		<path d="M12 14l8-4.5" />
		<path d="M12 14l-8-4.5" />
		<path d="M12 6l8 4.5" />
		<path d="M12 6l-8 4.5" />
	</svg>
)

const ResourceIcon = () => (
	<svg
		className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor">
		<path
			d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
)

const TutorialIcon = () => (
	<svg
		className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor">
		<path
			d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)

const WorkshopIcon = () => (
	<svg
		className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor">
		<path
			d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
)

const GithubIcon = () => (
	<svg
		className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor">
		<path
			d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
			strokeWidth="2"
		/>
	</svg>
)

const SocialIcon = () => (
	<svg
		className="h-4 w-4 transition-all duration-200 group-hover:scale-110 group-hover:-rotate-12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M12 8C9.5 4.5 4.5 5 3.5 8S5 14 7 15.5C9 17 12 15 12 15" />
		<path d="M12 8C14.5 4.5 19.5 5 20.5 8S19 14 17 15.5C15 17 12 15 12 15" />
		<path d="M12 15C10 15.5 7 17 6 19S7 21 9 20.5C11 20 12 17 12 15" />
		<path d="M12 15C14 15.5 17 17 18 19S17 21 15 20.5C13 20 12 17 12 15" />
		<path d="M12 8V15" strokeWidth="2" />
		<path d="M11 7.5C10.5 6.5 10.5 5.5 11 4.5" />
		<path d="M13 7.5C13.5 6.5 13.5 5.5 13 4.5" />
	</svg>
)

const RssIcon = () => (
	<svg
		className="h-4 w-4 transition-all duration-200 group-hover:scale-110"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<circle cx="6" cy="18" r="2" />
		<path d="M4 4a16 16 0 0 1 16 16" />
		<path d="M4 11a9 9 0 0 1 9 9" />
	</svg>
)

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
				className="text-primary mb-4 flex w-full items-center justify-between text-left text-xs font-medium tracking-wider uppercase"
				aria-expanded={isMobile ? isExpanded : true}
				aria-controls={`footer-${title.toLowerCase()}`}>
				<span>{title}</span>
				{isMobile && (
					<span
						className="ml-2 text-xs transition-transform duration-200 sm:hidden"
						aria-hidden="true">
						{isExpanded ? '−' : '+'}
					</span>
				)}
			</button>
			<ul
				id={`footer-${title.toLowerCase()}`}
				className={`space-y-3 overflow-hidden transition-all duration-200 ease-in-out ${
					isMobile && !isExpanded ? 'max-h-0' : 'max-h-[500px]'
				}`}
				role="menu">
				{links.map((link) => (
					<li key={link.text} role="none">
						{link.external ? (
							<a
								href={link.href}
								className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								role="menuitem">
								{title === 'Resources' && link.text === 'Blog' && (
									<ResourceIcon />
								)}
								{title === 'Resources' && link.text === 'Tutorials' && (
									<TutorialIcon />
								)}
								{title === 'Services' && link.text === 'Workshops' && (
									<WorkshopIcon />
								)}
								{title === 'Social' && link.text === 'GitHub' && <GithubIcon />}
								{title === 'Social' && link.text === 'Bsky' && <SocialIcon />}
								{title === 'Social' && link.text === 'RSS' && <RssIcon />}
								<span>{link.text}</span>
							</a>
						) : (
							<Link
								href={link.href}
								className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
								role="menuitem">
								{title === 'Resources' && link.text === 'Blog' && (
									<ResourceIcon />
								)}
								{title === 'Resources' && link.text === 'Tutorials' && (
									<TutorialIcon />
								)}
								{title === 'Services' && link.text === 'Hire Me' && (
									<HireIcon />
								)}
								{title === 'Services' && link.text === 'Workshops' && (
									<WorkshopIcon />
								)}
								{title === 'Social' && link.text === 'GitHub' && <GithubIcon />}
								{title === 'Social' && link.text === 'Bsky' && <SocialIcon />}
								{title === 'Social' && link.text === 'RSS' && <RssIcon />}
								<span>{link.text}</span>
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
		Resources: [{href: '/blog', text: 'Blog'}],
		Services: [
			{href: '/hire-lauro', text: 'Hire Me'},
			{href: '/workshops', text: 'Workshops'}
		],
		Social: [
			{
				href: 'https://github.com/laurosilvacom',
				text: 'GitHub',
				external: true
			},
			{
				href: 'https://bsky.app/profile/laurosilva.com',
				text: 'Bsky',
				external: true
			},
			{href: '/rss', text: 'RSS'}
		]
	}

	const toggleSection = (title: string) => {
		if (window.innerWidth >= 640) return
		setExpandedSections((prev) => ({
			...prev,
			[title]: !prev[title]
		}))
	}

	if (!isMounted) {
		return null
	}

	return (
		<footer className="border-border bg-background/60 mt-32 border-t py-16">
			<Container className="mx-auto max-w-screen-xl">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-6">
					{/* Logo and Info Column */}
					<div className="md:col-span-3">
						<div className="mb-6">
							<Link
								href="/"
								className="text-foreground hover:text-primary text-xl font-medium transition-colors">
								Lauro Silva
							</Link>
						</div>
						<p className="text-muted-foreground mb-6 max-w-md">
							Helping developers build exceptional products and upskill their
							communities.
						</p>

						<div className="flex items-center space-x-3">
							<ModeToggle />
							<span className="text-muted-foreground text-xs">
								© {new Date().getFullYear()} Lauro Silva
							</span>
						</div>
					</div>

					{/* Navigation Sections - Right Side */}
					<div className="grid grid-cols-3 gap-8 md:col-span-3">
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
				</div>
			</Container>
		</footer>
	)
}

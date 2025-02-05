'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

const HireIcon = () => (
	<svg
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-2px]"
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
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:-rotate-12"
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
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:scale-110"
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
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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

const HomeIcon = () => (
	<svg
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-2px]"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
)

const AboutIcon = () => (
	<svg
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<circle cx="12" cy="12" r="10" />
		<path d="M12 16v-4" />
		<path d="M12 8h.01" />
	</svg>
)

const NewsletterIcon = () => (
	<svg
		className="ease-bounce h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-2px]"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
		<path d="m3 7 9 6 9-6" />
	</svg>
)

// Then update the getIconForPath function to include it:
const getIconForPath = (path: string) => {
	switch (path) {
		case '/':
			return <HomeIcon />
		case '/about':
			return <AboutIcon />
		case '/blog':
			return <ResourceIcon />
		case '/tutorials':
			return <TutorialIcon />
		case '/workshops':
			return <WorkshopIcon />
		case '/hire-lauro':
			return <HireIcon />
		case '/newsletter':
			return <NewsletterIcon />
		default:
			return null
	}
}
const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Articles'
	},
	'/newsletter': {
		name: 'Newsletter'
	}
}
export function Navbar() {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false)
	}, [])

	// Handle keyboard navigation
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeMenu()
			}
		},
		[closeMenu]
	)

	useEffect(() => {
		setMounted(true)

		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	// Close menu when pathname changes
	useEffect(() => {
		closeMenu()
	}, [pathname, closeMenu])

	// Prevent scrolling when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	// Prevent hydration errors
	if (!mounted) {
		return null
	}

	return (
		<>
			<nav
				role="navigation"
				aria-label="Main navigation"
				className="border-border sticky top-0 z-40 w-full border-b bg-[hsl(var(--card))] backdrop-blur-sm transition-all duration-300 ease-in-out print:hidden">
				<div
					className={`mx-auto flex max-w-screen-xl items-center justify-between px-5 transition-all duration-300 ease-in-out sm:px-10 lg:px-0 ${isScrolled ? 'h-16' : 'h-20'}`}>
					<Link
						href="/"
						aria-label="Home"
						className="group text-foreground flex items-center gap-2 text-lg font-semibold transition-all duration-300 ease-in-out">
						<span className="group-hover:text-primary transition-all duration-300 ease-in-out">
							Lauro Silva
						</span>
					</Link>

					{/* Desktop Menu */}
					<div
						className="hidden items-center gap-1 transition-all duration-300 ease-in-out md:flex"
						role="menubar">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<Link
									key={path}
									href={path}
									role="menuitem"
									aria-current={isActive ? 'page' : undefined}
									className={`group inline-flex items-center gap-2 px-4 py-2 text-base font-medium transition-all duration-300 ease-out ${
										isActive
											? 'text-foreground underline decoration-[hsl(var(--primary))] decoration-wavy underline-offset-[6px]'
											: 'text-muted-foreground hover:text-foreground'
									}`}>
									{getIconForPath(path)}
									{name}
								</Link>
							)
						})}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="hover:bg-secondary/10 relative z-50 flex h-12 w-12 items-center justify-center rounded-full transition-colors md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-6 items-center justify-center">
							<span
								className={`absolute h-0.5 w-6 transform bg-[hsl(var(--foreground))] transition duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'}`}
								aria-hidden="true"
							/>
							<span
								className={`absolute h-0.5 transform bg-[hsl(var(--foreground))] transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`}
								aria-hidden="true"
							/>
							<span
								className={`absolute h-0.5 w-6 transform bg-[hsl(var(--foreground))] transition duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'}`}
								aria-hidden="true"
							/>
						</div>
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 backdrop-blur-sm transition-all duration-300 md:hidden ${
					mounted ? 'bg-card/80' : 'bg-card/80'
				} ${mounted ? 'dark:bg-card/80' : 'dark:bg-card/80'} ${
					isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			{/* Mobile Menu Panel */}
			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`border-border bg-card dark:bg-card fixed top-0 right-0 z-40 h-full w-[300px] transform border-l transition-all duration-300 ease-in-out md:hidden ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<nav
					role="navigation"
					aria-label="Mobile navigation"
					className="flex flex-col space-y-4 px-6 pt-24">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? 'page' : undefined}
								className={`group inline-flex items-center gap-2 px-4 py-3 text-xl font-medium transition-colors duration-300 ease-out ${
									isActive
										? 'text-foreground underline decoration-[hsl(var(--primary))] decoration-wavy underline-offset-[6px]'
										: 'text-muted-foreground hover:text-foreground'
								}`}>
								{getIconForPath(path)}
								{name}
							</Link>
						)
					})}
				</nav>
			</div>
		</>
	)
}

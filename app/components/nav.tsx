'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Articles'
	},
	'/tutorials': {
		name: 'Tutorials'
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
	const isBlogArticle = pathname.includes('/blog/')

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
				className={`border-border sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-all duration-300 ease-in-out print:hidden ${
					mounted ? 'bg-[hsl(225,25%,97%,0.8)]' : 'bg-[hsl(225,25%,97%)]'
				} ${mounted ? 'supports-[backdrop-filter]:bg-[hsl(225,25%,97%,0.5)]' : ''} ${
					mounted
						? 'dark:bg-[hsl(225,25%,9%,0.8)]'
						: 'dark:bg-[hsl(225,25%,9%)]'
				} ${mounted ? 'supports-[backdrop-filter]:dark:bg-[hsl(225,25%,9%,0.6)]' : ''} `}>
				<div
					className={`mx-auto flex max-w-screen-xl items-center justify-between px-5 transition-all duration-300 ease-in-out sm:px-10 lg:px-0 ${
						isScrolled ? 'h-16' : 'h-20'
					}`}>
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
									className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
										isActive
											? 'text-foreground'
											: 'text-muted-foreground hover:text-foreground'
									} `}>
									{name}
									{isActive && (
										<span
											className="from-primary/0 via-primary to-primary/0 absolute inset-x-1 -bottom-px h-px bg-gradient-to-r transition-all duration-300 ease-in-out"
											aria-hidden="true"
										/>
									)}
								</Link>
							)
						})}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="relative z-50 flex h-12 w-12 items-center justify-center md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-6 items-center justify-center">
							<span
								className={`absolute h-0.5 w-6 transform bg-[hsl(var(--foreground))] transition duration-300 ease-in-out ${
									isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`absolute h-0.5 transform bg-[hsl(var(--foreground))] transition-all duration-300 ease-in-out ${
									isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`absolute h-0.5 w-6 transform bg-[hsl(var(--foreground))] transition duration-300 ease-in-out ${
									isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'
								}`}
								aria-hidden="true"
							/>
						</div>
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 backdrop-blur-sm transition-all duration-300 md:hidden ${mounted ? 'bg-[hsl(225,25%,97%,0.1)]' : 'bg-[hsl(225,25%,97%)]'} ${mounted ? 'dark:bg-[hsl(225,25%,9%,0.1)]' : 'dark:bg-[hsl(225,25%,9%)]'} ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			{/* Mobile Menu */}
			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`fixed top-0 right-0 z-40 h-full w-[300px] transform border-l border-[hsl(var(--border))] bg-[hsl(225,25%,98%)] transition-all duration-300 ease-in-out md:hidden dark:bg-[hsl(225,25%,11%)] ${
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
								className={`text-lg font-medium transition-colors duration-200 ${
									isActive
										? 'text-[hsl(var(--foreground))]'
										: 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
								}`}>
								{name}
							</Link>
						)
					})}
				</nav>
			</div>
		</>
	)
}

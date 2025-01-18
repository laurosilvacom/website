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

	const closeMenu = useCallback(() => setIsMenuOpen(false), [])

	useEffect(() => {
		setMounted(true)
		const handleScroll = () => setIsScrolled(window.scrollY > 20)
		const handleKeyDown = (e: KeyboardEvent) =>
			e.key === 'Escape' && closeMenu()

		window.addEventListener('scroll', handleScroll)
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [closeMenu])

	useEffect(() => {
		closeMenu()
		document.body.style.overflow = isMenuOpen ? 'hidden' : ''
	}, [pathname, closeMenu, isMenuOpen])

	if (!mounted) return null

	return (
		<>
			<nav
				role="navigation"
				aria-label="Main navigation"
				className={`sticky top-0 z-50 w-full border-b border-[hsl(var(--border)/0.2)] transition-all duration-500 ease-out print:hidden ${isScrolled ? 'h-16' : 'h-20'} bg-[hsl(var(--card)/0.95)] backdrop-blur-xl`}>
				<div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-5 sm:px-10 lg:px-0">
					{/* Logo */}
					<Link href="/" aria-label="Home" className="group text-foreground">
						<span className="text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[hsl(var(--primary))]">
							Lauro Silva
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden items-center gap-2 md:flex" role="menubar">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<Link
									key={path}
									href={path}
									role="menuitem"
									aria-current={isActive ? 'page' : undefined}
									className={`px-4 py-2 text-base font-medium transition-all duration-300 ease-out ${
										isActive
											? 'text-foreground underline decoration-[hsl(var(--primary))] decoration-wavy underline-offset-[6px]'
											: 'text-foreground/70 hover:text-foreground'
									} `}>
									{name}
								</Link>
							)
						})}
					</div>

					{/* Mobile Menu Button */}
					<button
						className="relative z-50 flex h-12 w-12 items-center justify-center transition-opacity duration-300 hover:opacity-70 md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-6 items-center justify-center">
							{['-translate-y-2', '', 'translate-y-2'].map((translate, i) => (
								<span
									key={i}
									className={`bg-foreground absolute h-[2px] transition-all duration-300 ease-out ${isMenuOpen ? 'w-6' : 'w-6'} ${isMenuOpen && i === 0 ? 'translate-y-0 rotate-45' : ''} ${isMenuOpen && i === 1 ? 'opacity-0' : ''} ${isMenuOpen && i === 2 ? 'translate-y-0 -rotate-45' : ''} ${!isMenuOpen ? translate : ''} `}
								/>
							))}
						</div>
					</button>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-40 bg-[hsl(var(--card)/0.7)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
				onClick={closeMenu}
				aria-hidden="true"
			/>

			{/* Mobile Menu */}
			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`fixed inset-y-0 right-0 z-40 w-[300px] border-l border-[hsl(var(--border)/0.2)] bg-[hsl(var(--card)/0.95)] shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} `}>
				<nav
					role="navigation"
					aria-label="Mobile navigation"
					className="flex flex-col space-y-2 px-6 pt-24">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? 'page' : undefined}
								className={`px-4 py-3 text-xl font-medium transition-colors duration-300 ease-out ${
									isActive
										? 'text-foreground underline decoration-[hsl(var(--primary))] decoration-wavy underline-offset-[6px]'
										: 'text-foreground/70 hover:text-foreground'
								} `}>
								{name}
							</Link>
						)
					})}
				</nav>
			</div>
		</>
	)
}

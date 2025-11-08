'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Writing'
	}
}

export function Navbar() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false)
	}, [])

	useEffect(() => {
		closeMenu()
	}, [pathname, closeMenu])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<>
			<nav
				role="navigation"
				aria-label="Main navigation"
				className={`lg:hidden sticky top-0 z-40 w-full transition-all duration-300 print:hidden border-b ${
					isScrolled
						? 'bg-background/80 backdrop-blur-md border-border/50'
						: 'bg-background/40 backdrop-blur-sm border-border/30'
				}`}>
				<div className="mx-auto flex max-w-7xl items-center justify-between h-16 px-4 sm:px-6">
					<Link
						href="/"
						aria-label="Home"
						className="flex items-center gap-3 hover:opacity-80 transition-opacity -ml-1">
						<svg
							width="16"
							height="26"
							viewBox="0 0 385 655"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-foreground dark:fill-foreground flex-shrink-0">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
							/>
						</svg>
						<span className="text-sm font-semibold leading-tight tracking-tight">
							Lauro Silva
						</span>
					</Link>

					<div className="hidden items-center gap-6 md:flex" role="menubar">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<Link
									key={path}
									href={path}
									role="menuitem"
									aria-current={isActive ? 'page' : undefined}
									className={`text-sm transition-colors ${
										isActive
											? 'text-foreground font-medium'
											: 'text-muted-foreground hover:text-foreground'
									}`}>
									{name}
								</Link>
							)
						})}
					</div>

					<button
						className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-5 items-center justify-center">
							<span
								className={`bg-foreground absolute h-0.5 w-5 transition-all ${
									isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 w-5 transition-all ${
									isMenuOpen ? 'opacity-0' : 'opacity-100'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 w-5 transition-all ${
									isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
								}`}
								aria-hidden="true"
							/>
						</div>
					</button>
				</div>
			</nav>

			{isMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`bg-background fixed top-0 right-0 z-40 h-full w-[280px] md:hidden transition-transform duration-200 ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<div className="flex h-16 items-center justify-between px-6 mb-8">
					<span className="text-lg font-normal">Menu</span>
					<button
						onClick={closeMenu}
						aria-label="Close menu"
						className="text-muted-foreground hover:text-foreground transition-colors">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<nav
					role="navigation"
					aria-label="Mobile navigation"
					className="flex flex-col p-6">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? 'page' : undefined}
								onClick={closeMenu}
								className={`py-3 text-base transition-colors ${
									isActive
										? 'text-foreground font-medium'
										: 'text-muted-foreground hover:text-foreground'
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

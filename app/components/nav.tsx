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
				className={`sticky top-0 z-40 w-full border-b transition-all duration-500 ease-in-out lg:hidden print:hidden ${
					isScrolled
						? 'bg-background/70 border-border/40 shadow-lg shadow-black/5 backdrop-blur-xl'
						: 'bg-background/50 border-border/20 backdrop-blur-lg'
				}`}>
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
					<Link
						href="/"
						aria-label="Home"
						className="-ml-1 flex items-center gap-3.5 transition-opacity duration-300 hover:opacity-80">
						<svg
							width="18"
							height="28"
							viewBox="0 0 385 655"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-foreground dark:fill-foreground shrink-0 transition-transform duration-300 hover:scale-110">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
							/>
						</svg>
						<span className="text-base leading-tight font-semibold tracking-tight">
							Lauro Silva
						</span>
					</Link>

					<div className="hidden items-center gap-8 md:flex" role="menubar">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<Link
									key={path}
									href={path}
									role="menuitem"
									aria-current={isActive ? 'page' : undefined}
									className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
										isActive
											? 'text-foreground bg-primary/10'
											: 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
									}`}>
									{name}
								</Link>
							)
						})}
					</div>

					<button
						className="hover:bg-accent/50 relative z-50 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-6 items-center justify-center">
							<span
								className={`bg-foreground absolute h-0.5 w-6 transition-all duration-500 ease-in-out ${
									isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 w-6 transition-all duration-500 ease-in-out ${
									isMenuOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 w-6 transition-all duration-500 ease-in-out ${
									isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'
								}`}
								aria-hidden="true"
							/>
						</div>
					</button>
				</div>
			</nav>

			{isMenuOpen && (
				<div
					className="bg-background/60 fixed inset-0 z-40 backdrop-blur-md transition-opacity duration-500 ease-in-out md:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`bg-background/95 border-border/40 fixed top-0 right-0 z-40 h-full w-[320px] border-l shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-in-out md:hidden ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<div className="border-border/40 mb-12 flex h-20 items-center justify-between border-b px-8">
					<span className="text-lg font-semibold">Menu</span>
					<button
						onClick={closeMenu}
						aria-label="Close menu"
						className="text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl p-2 transition-colors duration-300">
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
					className="flex flex-col gap-2 px-8">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? 'page' : undefined}
								onClick={closeMenu}
								className={`rounded-xl px-4 py-4 text-base font-medium transition-all duration-300 ${
									isActive
										? 'text-foreground bg-primary/10'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
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

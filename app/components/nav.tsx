'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

const HomeIcon = () => (
	<svg
		className="h-4 w-4"
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

const ResourceIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round">
		<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
	</svg>
)

const getIconForPath = (path: string) => {
	switch (path) {
		case '/':
			return <HomeIcon />
		case '/blog':
			return <ResourceIcon />
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
	}
}

export function Navbar() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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

	return (
		<>
			<nav
				role="navigation"
				aria-label="Main navigation"
				className="border-border sticky top-0 z-40 w-full border-b bg-background print:hidden">
				<div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 h-16 sm:px-10 lg:px-0">
					<Link
						href="/"
						aria-label="Home"
						className="text-lg font-semibold">
						Lauro Silva
					</Link>

					<div className="hidden items-center gap-4 md:flex" role="menubar">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<Link
									key={path}
									href={path}
									role="menuitem"
									aria-current={isActive ? 'page' : undefined}
									className={`inline-flex items-center gap-2 px-4 py-2 ${
										isActive
											? 'text-foreground'
											: 'text-muted-foreground hover:text-foreground'
									}`}>
									{getIconForPath(path)}
									{name}
								</Link>
							)
						})}
					</div>

					<button
						className="relative z-50 flex h-12 w-12 items-center justify-center md:hidden"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-expanded={isMenuOpen}
						aria-controls="mobile-menu"
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
						<div className="relative flex w-6 items-center justify-center">
							<span
								className={`bg-foreground absolute h-0.5 w-6 ${
									isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 ${
									isMenuOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
								}`}
								aria-hidden="true"
							/>
							<span
								className={`bg-foreground absolute h-0.5 w-6 ${
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
					className="fixed inset-0 z-40 bg-background/80 md:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			<div
				id="mobile-menu"
				role="dialog"
				aria-label="Mobile menu"
				aria-modal="true"
				className={`border-border bg-background fixed top-0 right-0 z-40 h-full w-[300px] border-l md:hidden ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<div className="flex justify-end p-4">
					<button
						onClick={closeMenu}
						aria-label="Close menu">
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<nav
					role="navigation"
					aria-label="Mobile navigation"
					className="flex flex-col space-y-4 px-6 pt-6">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								aria-current={isActive ? 'page' : undefined}
								className={`inline-flex items-center gap-2 px-4 py-3 ${
									isActive
										? 'text-foreground'
										: 'text-muted-foreground'
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

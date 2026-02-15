'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {ModeToggle} from './toggle'
import Container from '@/shared/components/container'
import {cn} from '@/shared/lib/utils'

const navItems = [
	{path: '/', name: 'Home'},
	{path: '/work', name: 'Work'},
	{path: '/services', name: 'Services'},
	{path: '/teaching', name: 'Teaching'},
	{path: '/blog', name: 'Blog'},
	{path: '/about', name: 'About'},
]

export function Navigation() {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll, {passive: true})
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (isMenuOpen) {
			document.documentElement.style.overflow = 'hidden'
			document.body.style.overflow = 'hidden'
		} else {
			document.documentElement.style.overflow = ''
			document.body.style.overflow = ''
		}
	}, [isMenuOpen])

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	// Hide navigation in Sanity Studio
	if (pathname.startsWith('/studio')) {
		return null
	}

	return (
		<>
			{/* Desktop Navigation */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 hidden lg:block',
					isScrolled ? 'py-3' : 'py-6',
				)}
				style={{transition: 'padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}}>
				<Container width="wide">
					<div
						className={cn(
							'flex items-center gap-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ease-out',
							isScrolled
								? 'bg-background/98 border-border/80 scale-[0.98] border px-6 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
								: 'bg-background/70 border-border/30 scale-100 border px-6 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]',
						)}
						style={{
							transformOrigin: 'top center',
						}}>
						{/* Logo */}
						<Link
							href="/"
							className="group flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
							aria-label="Home">
							<svg
								width="20"
								height="32"
								viewBox="0 0 385 655"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="fill-foreground transition-colors">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
								/>
							</svg>
							<span
								className="text-foreground text-lg font-bold tracking-tight whitespace-nowrap"
								style={{
									letterSpacing: '-0.03em',
								}}>
								Lauro Silva
							</span>
						</Link>

						{/* Navigation Links */}
						<div className="flex flex-1 items-center justify-center gap-1">
							{navItems.map(({path, name}) => {
								const isActive =
									path === '/' ? pathname === '/' : pathname.startsWith(path)
								return (
									<Link
										key={path}
										href={path}
										className={cn(
											'relative px-3.5 py-2 text-sm font-medium transition-all duration-200',
											isActive
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground',
										)}>
										{isActive && (
											<span className="bg-foreground absolute inset-x-0 -bottom-0.5 h-px" />
										)}
										<span className="relative">{name}</span>
									</Link>
								)
							})}
						</div>

						{/* Right Side */}
						<div className="flex shrink-0 items-center">
							<ModeToggle />
						</div>
					</div>
				</Container>
			</nav>

			{/* Mobile Navigation */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 transition-all duration-200 lg:hidden',
					isScrolled
						? 'bg-background/95 border-border border-b backdrop-blur-xl'
						: 'bg-background/80 border-border/50 border-b backdrop-blur-lg',
				)}>
				<div className="flex h-16 items-center justify-between px-4 sm:px-6">
					<Link href="/" className="flex items-center gap-2.5" aria-label="Home">
						<svg
							width="18"
							height="30"
							viewBox="0 0 385 655"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-foreground transition-colors">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
							/>
						</svg>
						<span className="text-foreground text-sm font-bold tracking-tight whitespace-nowrap">
							Lauro Silva
						</span>
					</Link>

					<div className="flex items-center gap-3">
						<ModeToggle />
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="-mr-2 p-2"
							aria-label="Toggle menu"
							aria-expanded={isMenuOpen}>
							<div className="relative h-5 w-5">
								<span
									className={cn(
										'bg-foreground absolute left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'top-2 rotate-45' : 'top-0',
									)}
								/>
								<span
									className={cn(
										'bg-foreground absolute top-2 left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'opacity-0' : 'opacity-100',
									)}
								/>
								<span
									className={cn(
										'bg-foreground absolute left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'top-2 -rotate-45' : 'top-4',
									)}
								/>
							</div>
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div className="bg-background/98 fixed inset-0 z-40 backdrop-blur-xl lg:hidden">
					<div className="flex h-full flex-col px-6 pt-20">
						<nav className="flex flex-col gap-2">
							{navItems.map(({path, name}) => {
								const isActive =
									path === '/' ? pathname === '/' : pathname.startsWith(path)
								return (
									<Link
										key={path}
										href={path}
										onClick={() => setIsMenuOpen(false)}
										className={cn(
											'border-border/50 border-b py-4 text-2xl font-semibold transition-colors',
											isActive ? 'text-foreground' : 'text-muted-foreground',
										)}>
										{name}
									</Link>
								)
							})}
						</nav>

					</div>
				</div>
			)}
		</>
	)
}

'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {ModeToggle} from './toggle'
import Container from '@/shared/components/container'
import {cn} from '@/shared/lib/utils'

const navItems = [
	{path: '/work', name: 'Work'},
	{path: '/teaching', name: 'Teaching'},
	{path: '/blog', name: 'Blog'},
	{path: '/about', name: 'About'},
]

export function Navigation() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
			<nav className="fixed top-0 right-0 left-0 z-50 hidden lg:block">
				<div className="bg-background/95 backdrop-blur-sm">
					<Container>
						<div className="flex items-center justify-between py-6">
							<Link
								href="/"
								className="text-foreground font-serif text-sm font-bold tracking-tight transition-opacity hover:opacity-70"
								style={{letterSpacing: '-0.03em'}}>
								Lauro Silva
							</Link>

							<div className="flex items-center gap-6">
								{navItems.map(({path, name}) => {
									const isActive =
										path === '/' ? pathname === '/' : pathname.startsWith(path)
									return (
										<Link
											key={path}
											href={path}
											className={cn(
												'text-sm transition-opacity hover:opacity-70',
												isActive
													? 'text-foreground font-medium'
													: 'text-muted-foreground',
											)}>
											{name}
										</Link>
									)
								})}
								<ModeToggle />
							</div>
						</div>
					</Container>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<nav className="bg-background/95 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm lg:hidden">
				<Container>
					<div className="flex h-14 items-center justify-between">
						<Link
							href="/"
							className="text-foreground font-serif text-sm font-bold tracking-tight"
							style={{letterSpacing: '-0.03em'}}>
							Lauro Silva
						</Link>

						<div className="flex items-center gap-3">
							<ModeToggle />
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="-mr-2 p-2"
								aria-label="Toggle menu"
								aria-expanded={isMenuOpen}>
								<div className="relative h-4 w-4">
									<span
										className={cn(
											'bg-foreground absolute left-0 h-px w-4 transition-all duration-200',
											isMenuOpen ? 'top-2 rotate-45' : 'top-0.5',
										)}
									/>
									<span
										className={cn(
											'bg-foreground absolute left-0 h-px w-4 transition-all duration-200',
											isMenuOpen ? 'top-2 -rotate-45' : 'top-[11px]',
										)}
									/>
								</div>
							</button>
						</div>
					</div>
				</Container>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div className="bg-background fixed inset-0 z-40 lg:hidden">
					<Container>
						<nav className="flex flex-col gap-1 pt-20">
							{navItems.map(({path, name}) => {
								const isActive =
									path === '/' ? pathname === '/' : pathname.startsWith(path)
								return (
									<Link
										key={path}
										href={path}
										onClick={() => setIsMenuOpen(false)}
										className={cn(
											'py-3 text-lg font-medium transition-opacity hover:opacity-70',
											isActive ? 'text-foreground' : 'text-muted-foreground',
										)}>
										{name}
									</Link>
								)
							})}
						</nav>
					</Container>
				</div>
			)}
		</>
	)
}

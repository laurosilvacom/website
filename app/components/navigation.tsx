'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {ChevronDown, Building2, Users, Briefcase} from 'lucide-react'
import {ModeToggle} from './toggle'
import {cn} from '@/lib/utils'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const navItems = [
	{path: '/', name: 'Home'},
	{path: '/blog', name: 'Writing'},
	{path: '/about', name: 'About'}
]

const serviceItems = [
	{path: '/services', name: 'Overview', icon: Briefcase},
	{path: '/services/companies', name: 'For Companies', icon: Building2},
	{path: '/services/athletes', name: 'For Athletes', icon: Users}
]

export function Navigation() {
	const pathname = usePathname()
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isServicesOpen, setIsServicesOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}

		window.addEventListener('scroll', handleScroll, {passive: true})
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuOpen])

	useEffect(() => {
		setIsMenuOpen(false)
	}, [pathname])

	return (
		<>
			{/* Desktop Navigation - Floating */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 hidden transition-all duration-500 lg:block',
					isScrolled ? 'py-4' : 'py-6'
				)}>
				<div className="mx-auto max-w-[1920px] px-6 lg:px-12 xl:px-16">
					<div
						className={cn(
							'flex items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-500',
							isScrolled
								? 'bg-background/80 border-border/50 px-6 py-3 shadow-lg shadow-black/5'
								: 'bg-background/40 border-border/30 px-8 py-4'
						)}>
						<Link
							href="/"
							className="group flex items-center gap-2.5"
							aria-label="Home">
							<div className="relative">
								<svg
									width="20"
									height="32"
									viewBox="0 0 385 655"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="fill-foreground transition-transform duration-300 group-hover:scale-110">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
									/>
								</svg>
							</div>
							<span className="text-sm font-semibold tracking-tight">
								Lauro Silva
							</span>
						</Link>

						<div className="flex items-center gap-1">
							{navItems.map(({path, name}) => {
								const isActive = pathname === path
								return (
									<Link
										key={path}
										href={path}
										className={cn(
											'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
											isActive
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}>
										{isActive && (
											<span className="bg-primary/10 absolute inset-0 -z-10 rounded-full" />
										)}
										{name}
									</Link>
								)
							})}

							{/* Services Dropdown */}
							<DropdownMenu
								open={isServicesOpen}
								onOpenChange={setIsServicesOpen}>
								<DropdownMenuTrigger asChild>
									<button
										className={cn(
											'relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
											pathname.startsWith('/services')
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}>
										{pathname.startsWith('/services') && (
											<span className="bg-primary/10 absolute inset-0 -z-10 rounded-full" />
										)}
										<Briefcase className="h-3.5 w-3.5" />
										Services
										<ChevronDown
											className={cn(
												'h-3 w-3 opacity-60 transition-transform duration-200',
												isServicesOpen && 'rotate-180'
											)}
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="bg-background/95 border-border/50 min-w-[220px] p-2 shadow-xl backdrop-blur-xl">
									{serviceItems.map(({path, name, icon: Icon}) => {
										const isActive = pathname === path
										return (
											<DropdownMenuItem key={path} asChild>
												<Link
													href={path}
													className={cn(
														'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
														isActive
															? 'bg-primary/10 text-foreground font-medium'
															: 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
													)}>
													<Icon
														className={cn(
															'h-4 w-4 shrink-0',
															isActive
																? 'text-primary'
																: 'text-muted-foreground'
														)}
													/>
													<span>{name}</span>
												</Link>
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<div className="flex items-center gap-3">
							<ModeToggle />
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 transition-all duration-300 lg:hidden',
					isScrolled
						? 'bg-background/80 border-border/50 border-b backdrop-blur-xl'
						: 'bg-background/40 border-border/30 border-b backdrop-blur-sm'
				)}>
				<div className="flex h-16 items-center justify-between px-4 sm:px-6">
					<Link
						href="/"
						className="flex items-center gap-2.5"
						aria-label="Home">
						<svg
							width="18"
							height="28"
							viewBox="0 0 385 655"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-foreground">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
							/>
						</svg>
						<span className="text-sm font-semibold tracking-tight">
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
										'bg-foreground absolute top-0 left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'top-2 rotate-45' : 'top-0'
									)}
								/>
								<span
									className={cn(
										'bg-foreground absolute top-2 left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'opacity-0' : 'opacity-100'
									)}
								/>
								<span
									className={cn(
										'bg-foreground absolute top-4 left-0 h-0.5 w-5 transition-all duration-300',
										isMenuOpen ? 'top-2 -rotate-45' : 'top-4'
									)}
								/>
							</div>
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMenuOpen && (
				<div className="bg-background/95 fixed inset-0 z-40 backdrop-blur-xl lg:hidden">
					<div className="flex h-full flex-col px-6 pt-20">
						<nav className="flex flex-col gap-1">
							{navItems.map(({path, name}) => {
								const isActive = pathname === path
								return (
									<Link
										key={path}
										href={path}
										onClick={() => setIsMenuOpen(false)}
										className={cn(
											'py-4 text-2xl font-semibold transition-colors',
											isActive ? 'text-foreground' : 'text-muted-foreground'
										)}>
										{name}
									</Link>
								)
							})}

							{/* Services Section */}
							<div className="pt-2">
								<div className="text-foreground flex items-center gap-2 py-4 text-2xl font-semibold">
									<Briefcase className="h-5 w-5" />
									Services
								</div>
								<div className="flex flex-col gap-1 pl-4">
									{serviceItems.map(({path, name, icon: Icon}) => {
										const isActive = pathname === path
										return (
											<Link
												key={path}
												href={path}
												onClick={() => setIsMenuOpen(false)}
												className={cn(
													'flex items-center gap-3 rounded-lg px-2 py-2.5 text-lg transition-all',
													isActive
														? 'text-foreground bg-primary/10 font-medium'
														: 'text-muted-foreground hover:text-foreground hover:bg-accent/30'
												)}>
												<Icon
													className={cn(
														'h-4 w-4 shrink-0',
														isActive ? 'text-primary' : 'text-muted-foreground'
													)}
												/>
												<span>{name}</span>
											</Link>
										)
									})}
								</div>
							</div>
						</nav>
					</div>
				</div>
			)}
		</>
	)
}

'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {ChevronDown, Building2, Users, Briefcase} from 'lucide-react'
import {ModeToggle} from './toggle'
import Container from '@/components/container'
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

	return (
		<>
			{/* Desktop Navigation */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 hidden lg:block',
					isScrolled ? 'py-3' : 'py-5'
				)}
				style={{transition: 'padding 0.3s ease'}}>
				<Container width="wide">
					<div
						className={cn(
							'flex items-center gap-8 rounded-full border backdrop-blur-xl',
							isScrolled
								? 'bg-background/90 border-border/60 px-5 py-2.5 shadow-sm'
								: 'bg-background/60 border-border/40 px-6 py-3'
						)}
						style={{
							transition:
								'background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease'
						}}>
						{/* Logo */}
						<Link
							href="/"
							className="group flex shrink-0 items-center gap-3"
							aria-label="Home">
							<div className="relative shrink-0">
								<svg
									width="18"
									height="30"
									viewBox="0 0 385 655"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="fill-foreground transition-transform duration-200 group-hover:scale-105">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
									/>
								</svg>
							</div>
							<span
								className="text-foreground text-base font-bold tracking-tight whitespace-nowrap"
								style={{
									fontFamily: "'Elan ITC Std', serif",
									letterSpacing: '-0.02em'
								}}>
								Lauro Silva
							</span>
						</Link>

						{/* Navigation Links */}
						<div className="flex flex-1 items-center justify-center gap-1">
							{navItems.map(({path, name}) => {
								const isActive = pathname === path
								return (
									<Link
										key={path}
										href={path}
										className={cn(
											'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
											isActive
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}>
										{isActive && (
											<span className="border-border absolute inset-0 -z-10 rounded-full border" />
										)}
										<span className="relative">{name}</span>
									</Link>
								)
							})}

							{/* Services Dropdown */}
							<DropdownMenu
								open={isServicesOpen}
								onOpenChange={setIsServicesOpen}
								modal={false}>
								<DropdownMenuTrigger asChild>
									<button
										type="button"
										className={cn(
											'relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
											pathname.startsWith('/services')
												? 'text-foreground'
												: 'text-muted-foreground hover:text-foreground'
										)}>
										{pathname.startsWith('/services') && (
											<span className="border-border absolute inset-0 -z-10 rounded-full border" />
										)}
										<span className="relative">Services</span>
										<ChevronDown
											className={cn(
												'relative h-3 w-3 opacity-50 transition-transform duration-200',
												isServicesOpen && 'rotate-180'
											)}
										/>
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="center"
									sideOffset={12}
									className="bg-background/95 border-border/60 min-w-[200px] backdrop-blur-xl">
									{serviceItems.map(({path, name, icon: Icon}) => {
										const isActive = pathname === path
										return (
											<DropdownMenuItem key={path} asChild>
												<Link
													href={path}
													className={cn(
														'flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors',
														isActive
															? 'text-foreground bg-muted/50 font-medium'
															: 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
													)}>
													<Icon
														className={cn(
															'h-4 w-4',
															isActive
																? 'text-primary'
																: 'text-muted-foreground'
														)}
													/>
													<span className="text-sm">{name}</span>
												</Link>
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						{/* Theme Toggle */}
						<div className="flex shrink-0">
							<ModeToggle />
						</div>
					</div>
				</Container>
			</nav>

			{/* Mobile Navigation */}
			<nav
				className={cn(
					'fixed top-0 right-0 left-0 z-50 transition-all duration-300 lg:hidden',
					isScrolled
						? 'bg-background/90 border-border/60 border-b backdrop-blur-xl'
						: 'bg-background/60 border-border/40 border-b backdrop-blur-sm'
				)}>
				<div className="flex h-16 items-center justify-between px-4 sm:px-6">
					<Link
						href="/"
						className="flex items-center gap-2.5"
						aria-label="Home">
						<svg
							width="16"
							height="26"
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
						<span
							className="text-foreground text-sm font-bold tracking-tight whitespace-nowrap"
							style={{
								fontFamily: "'Elan ITC Std', serif",
								letterSpacing: '-0.02em'
							}}>
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
										'bg-foreground absolute left-0 h-0.5 w-5 transition-all duration-300',
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
				<div className="bg-background/98 fixed inset-0 z-40 backdrop-blur-xl lg:hidden">
					<div className="flex h-full flex-col px-6 pt-20">
						<nav className="flex flex-col gap-2">
							{navItems.map(({path, name}) => {
								const isActive = pathname === path
								return (
									<Link
										key={path}
										href={path}
										onClick={() => setIsMenuOpen(false)}
										className={cn(
											'border-border/50 border-b py-4 text-2xl font-semibold transition-colors',
											isActive ? 'text-foreground' : 'text-muted-foreground'
										)}>
										{name}
									</Link>
								)
							})}

							{/* Services Section */}
							<div className="border-border/50 border-b pt-4">
								<div className="text-foreground flex items-center gap-2 pb-3 text-lg font-semibold tracking-wide uppercase">
									<Briefcase className="h-4 w-4" />
									Services
								</div>
								<div className="flex flex-col gap-1 pb-4">
									{serviceItems.map(({path, name, icon: Icon}) => {
										const isActive = pathname === path
										return (
											<Link
												key={path}
												href={path}
												onClick={() => setIsMenuOpen(false)}
												className={cn(
													'flex items-center gap-3 rounded-lg px-3 py-3 text-lg transition-colors',
													isActive
														? 'text-foreground bg-muted/50 font-medium'
														: 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
												)}>
												<Icon
													className={cn(
														'h-4 w-4',
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

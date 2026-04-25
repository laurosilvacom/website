'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Menu01Icon} from '@hugeicons/core-free-icons'
import {HugeiconsIcon} from '@hugeicons/react'
import Container from '@/shared/components/container'
import {cn} from '@/shared/lib/utils'
import {Button} from '@/shared/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

const navItems = [
	{path: '/work', name: 'Work'},
	{path: '/teaching', name: 'Teaching'},
	{path: '/blog', name: 'Writing'},
	{path: '/about', name: 'About'},
]

export function Navigation() {
	const pathname = usePathname()

	// Hide navigation in Sanity Studio
	if (pathname.startsWith('/studio')) {
		return null
	}

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="bg-background hidden w-full lg:block">
				<div>
					<Container>
						<div className="flex items-center justify-between py-8">
							<Button
								asChild
								variant="ghost"
								size="sm"
								className="text-foreground h-auto px-0 text-[0.95rem] font-semibold tracking-[-0.012em] transition-opacity hover:opacity-70">
								<Link href="/">Lauro Silva</Link>
							</Button>

							<div className="flex items-center gap-9">
								{navItems.map(({path, name}) => {
									const isActive =
										path === '/' ? pathname === '/' : pathname.startsWith(path)
									return (
										<Button
											key={path}
											asChild
											variant="ghost"
											size="sm"
											className={cn(
												'type-nav h-auto px-0 transition-opacity hover:opacity-70',
												isActive
													? 'text-foreground font-medium'
													: 'text-muted-foreground',
											)}>
											<Link href={path}>{name}</Link>
										</Button>
									)
								})}
							</div>
						</div>
					</Container>
				</div>
			</nav>

			{/* Mobile Navigation */}
			<nav className="bg-background w-full lg:hidden">
				<Container>
					<div className="flex h-16 items-center justify-between">
						<Button
							asChild
							variant="ghost"
							size="sm"
							className="text-foreground h-auto px-0 text-[0.95rem] font-semibold tracking-[-0.012em] transition-opacity hover:opacity-70">
							<Link href="/">Lauro Silva</Link>
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon-sm"
									className="-mr-1 rounded-full"
									aria-label="Open navigation menu">
									<HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								sideOffset={10}
								className="w-56 rounded-2xl p-2">
								{navItems.map(({path, name}) => {
									const isActive =
										path === '/' ? pathname === '/' : pathname.startsWith(path)
									return (
										<DropdownMenuItem
											key={path}
											className={cn(
												'rounded-xl px-3 py-2.5 text-[0.95rem]',
												isActive
													? 'text-foreground bg-muted'
													: 'text-muted-foreground',
											)}>
											<Button
												asChild
												variant="ghost"
												size="sm"
												className="h-auto w-full justify-start px-0 text-[0.95rem]">
												<Link href={path}>{name}</Link>
											</Button>
										</DropdownMenuItem>
									)
								})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</Container>
			</nav>
		</>
	)
}

'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Blog'
	},
	'/projects': {
		name: 'Projects'
	},
	'/about': {
		name: 'About'
	}
}

export function Navbar() {
	const pathname = usePathname()

	return (
		<nav className="bg-background border-border relative w-full border-b print:hidden">
			<div className="mx-auto flex h-16 max-w-screen-lg items-center justify-between px-5 sm:px-10 lg:px-0">
				<Link
					href="/"
					className="group text-foreground flex items-center gap-2 text-lg font-semibold">
					<span className="group-hover:text-primary transition-colors">
						Lauro Silva
					</span>
				</Link>

				<div className="flex items-center gap-1">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								className={`relative px-4 py-2 text-sm font-medium transition-colors ${
									isActive
										? 'text-foreground'
										: 'text-muted-foreground hover:text-foreground'
								} `}>
								{name}
								{isActive && (
									<span className="from-primary/0 via-primary to-primary/0 absolute inset-x-1 -bottom-px h-px bg-gradient-to-r" />
								)}
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}

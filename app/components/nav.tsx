'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Blog'
	}
}

export function Navbar() {
	const pathname = usePathname()

	return (
		<nav className="bg-background text-foreground py-5">
			<div className="mx-auto flex max-w-screen-lg items-center justify-between">
				<div className="text-2xl font-semibold">
					<Link href="/" className="hover:text-primary transition-colors">
						Lauro Silva
					</Link>
				</div>
				<div className="flex space-x-8">
					{Object.entries(navItems).map(([path, {name}]) => {
						const isActive = pathname === path
						return (
							<Link
								key={path}
								href={path}
								className={`hover:text-primary text-lg transition-colors ${
									isActive
										? 'text-primary font-medium'
										: 'text-muted-foreground'
								}`}>
								{name}
							</Link>
						)
					})}
				</div>
			</div>
		</nav>
	)
}

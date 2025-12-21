'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {ModeToggle} from './toggle'

const navItems = {
	'/': {
		name: 'Home'
	},
	'/blog': {
		name: 'Writing'
	},
	'/about': {
		name: 'About'
	},
	'/services': {
		name: 'Services'
	}
}

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="lg:border-border/30 lg:bg-background/40 hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:backdrop-blur-sm">
			<div className="flex h-full flex-col overflow-y-auto px-6 py-8">
				{/* Logo */}
				<Link
					href="/"
					aria-label="Home"
					className="mb-12 flex items-center gap-3 transition-opacity hover:opacity-80">
					<svg
						width="16"
						height="26"
						viewBox="0 0 385 655"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="fill-foreground dark:fill-foreground shrink-0">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M385 357.926L43.7135 655L149.934 395.013L0 297.046L341.286 0L225.757 276.58L385 357.926Z"
						/>
					</svg>
					<span className="text-sm leading-tight font-semibold tracking-tight">
						Lauro Silva
					</span>
				</Link>

				{/* About */}
				<div className="mb-12">
					<h2 className="mb-3 text-sm font-semibold">What this is</h2>
					<p className="text-muted-foreground text-sm leading-relaxed">
						A digital garden for learning in public. Ideas evolve here,
						interconnected and growing over time. Work, writing, and thinking at
						the intersection of technology and the outdoor industry.
					</p>
				</div>

				{/* Navigation */}
				<nav className="mb-12">
					<h2 className="mb-4 text-sm font-semibold">Navigation</h2>
					<ul className="space-y-2">
						{Object.entries(navItems).map(([path, {name}]) => {
							const isActive = pathname === path
							return (
								<li key={path}>
									<Link
										href={path}
										className={`block py-1.5 text-sm transition-colors ${
											isActive
												? 'text-foreground font-medium'
												: 'text-muted-foreground hover:text-foreground'
										}`}>
										{name}
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>

				{/* Footer Links */}
				<div className="mt-auto space-y-8">
					<div>
						<h2 className="mb-4 text-sm font-semibold">Connect</h2>
						<ul className="space-y-2">
							<li>
								<a
									href="https://github.com/laurosilvacom"
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground text-sm transition-colors">
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/in/laurosilvacom/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground text-sm transition-colors">
									LinkedIn
								</a>
							</li>
							<li>
								<Link
									href="/blog/rss.xml"
									className="text-muted-foreground hover:text-foreground text-sm transition-colors">
									RSS Feed
								</Link>
							</li>
						</ul>
					</div>

					<div className="border-border/30 flex items-center justify-between border-t pt-4">
						<span className="text-muted-foreground text-xs">
							© {new Date().getFullYear()}
						</span>
						<ModeToggle />
					</div>
				</div>
			</div>
		</aside>
	)
}

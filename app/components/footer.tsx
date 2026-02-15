import Link from 'next/link'
import {ModeToggle} from './toggle'

interface FooterLink {
	href: string
	text: string
	external?: boolean
}

interface FooterSections {
	[key: string]: FooterLink[]
}

interface FooterSectionProps {
	title: string
	links: FooterLink[]
}

const FooterSection = ({title, links}: FooterSectionProps) => {
	return (
		<div>
			<h3 className="text-muted-foreground mb-4 text-xs font-medium tracking-wider uppercase">
				{title}
			</h3>
			<ul className="space-y-3" role="menu">
				{links.map((link) => (
					<li key={link.text} role="none">
						{link.external ? (
							<a
								href={link.href}
								className="text-muted-foreground hover:text-foreground text-sm transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								role="menuitem">
								{link.text}
							</a>
						) : (
							<Link
								href={link.href}
								className="text-muted-foreground hover:text-foreground text-sm transition-colors"
								role="menuitem">
								{link.text}
							</Link>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default function Footer() {
	const sections: FooterSections = {
		Work: [
			{href: '/services', text: 'Services'},
			{href: '/work', text: 'Case Studies'},
			{href: '/teaching', text: 'Teaching'}
		],
		Content: [
			{href: '/blog', text: 'Blog'},
			{href: '/newsletter', text: 'Newsletter'},
			{href: '/blog/rss.xml', text: 'RSS'}
		],
		Connect: [
			{
				href: 'https://github.com/laurosilvacom',
				text: 'GitHub',
				external: true
			},
			{
				href: 'https://bsky.app/profile/laurosilva.com',
				text: 'Bluesky',
				external: true
			},
			{
				href: 'https://cal.com/laurosilvacom/chat',
				text: 'Schedule a call',
				external: true
			}
		]
	}

	return (
		<footer className="border-border mt-32 border-t pt-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<div className="space-y-12">
					<div className="space-y-4">
						<Link
							href="/"
							className="text-xl font-semibold transition-opacity hover:opacity-80">
							Lauro Silva
						</Link>
						<p className="text-muted-foreground max-w-md text-sm leading-relaxed">
							Senior full-stack engineer and developer educator. I help
							companies ship better software and level up their engineering
							teams.
						</p>
					</div>

					<div className="grid grid-cols-3 gap-12">
						{Object.entries(sections).map(([title, links]) => (
							<FooterSection key={title} title={title} links={links} />
						))}
					</div>

					<div className="flex items-center justify-between pt-8">
						<span className="text-muted-foreground text-xs">
							© {new Date().getFullYear()} Lauro Silva
						</span>
						<ModeToggle />
					</div>
				</div>
			</div>
		</footer>
	)
}

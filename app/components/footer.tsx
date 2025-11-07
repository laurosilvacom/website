import Link from 'next/link'
import Container from '@/components/container'
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

const FooterSection = ({
	title,
	links
}: FooterSectionProps) => {
	return (
		<div>
			<h3 className="text-muted-foreground mb-4 text-xs font-medium uppercase tracking-wider">
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
		Content: [{href: '/blog', text: 'Writing'}],
		Work: [
			{href: '/hire-lauro', text: 'Hire Me'}
		],
		Connect: [
			{
				href: 'https://github.com/laurosilvacom',
				text: 'GitHub',
				external: true
			},
			{
				href: 'https://bsky.app/profile/laurosilva.com',
				text: 'Bsky',
				external: true
			},
			{href: '/rss', text: 'RSS'}
		]
	}

	return (
		<footer className="border-border mt-32 border-t py-16">
			<Container>
				<div className="space-y-12">
					<div className="space-y-4">
						<Link
							href="/"
							className="text-xl font-semibold hover:opacity-80 transition-opacity">
							Lauro Silva
						</Link>
						<p className="text-muted-foreground max-w-md text-sm leading-relaxed">
							Software engineer and developer educator. Building products and teaching developers.
						</p>
					</div>

					<div className="grid grid-cols-3 gap-12">
						{Object.entries(sections).map(([title, links]) => (
							<FooterSection
								key={title}
								title={title}
								links={links}
							/>
						))}
					</div>

					<div className="flex items-center justify-between border-t pt-8">
						<span className="text-muted-foreground text-xs">
							© {new Date().getFullYear()} Lauro Silva
						</span>
						<ModeToggle />
					</div>
				</div>
			</Container>
		</footer>
	)
}

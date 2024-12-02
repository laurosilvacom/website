import Link from 'next/link'
import Container from 'app/components/container'

const FooterSection = ({title, links}) => (
	<div>
		<strong className="text-primary font-mono text-xs tracking-wider uppercase opacity-80">
			{title}
		</strong>
		<ul className="pt-3 text-sm font-medium">
			{links.map((link) => (
				<li key={link.text}>
					{link.external ? (
						<a
							href={link.href}
							className="text-muted-foreground hover:text-foreground inline-block py-2 transition-colors"
							target="_blank"
							rel="noopener noreferrer">
							{link.text}
						</a>
					) : (
						<Link
							href={link.href}
							className="text-muted-foreground hover:text-foreground inline-block py-2 transition-colors">
							{link.text}
						</Link>
					)}
				</li>
			))}
		</ul>
	</div>
)

export default function Footer() {
	const sections = {
		Resources: [
			{href: '/blog', text: 'Blog'},
			{href: '/tutorials', text: 'Tutorials'},
			{href: '/workshops', text: 'Workshops'}
		],
		Social: [
			{
				href: 'https://github.com/laurosilvacom',
				text: 'GitHub',
				external: true
			},
			{href: 'https://twitter.com', text: 'Twitter', external: true},
			{href: '/rss', text: 'RSS'}
		]
	}

	return (
		<footer className="bg-card border-border relative mt-32 w-full border-t pb-32 print:hidden">
			<Container className="mx-auto w-full max-w-screen-lg">
				<div className="via-border absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
				<div className="relative mx-auto flex w-full max-w-screen-lg flex-col items-start justify-between gap-16 pt-14 pb-48 sm:flex-row sm:pt-16">
					<div className="relative mx-auto flex w-full flex-col items-center gap-8 text-center sm:items-start sm:gap-16 sm:text-left md:flex-row">
						{Object.entries(sections).map(([title, links]) => (
							<FooterSection key={title} title={title} links={links} />
						))}
					</div>

					{/* Copyright and Terms */}
					<div className="text-muted-foreground absolute bottom-5 flex items-center gap-5 text-sm">
						<span>© {new Date().getFullYear()} Lauro Silva, LLC</span>
					</div>
				</div>
			</Container>
		</footer>
	)
}

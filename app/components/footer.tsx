import Link from 'next/link'
import Container from 'app/components/container'
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

const HireIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
	</svg>
)

const ResourceIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round">
		<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
	</svg>
)

const TutorialIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" />
	</svg>
)

const GithubIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2">
		<path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
	</svg>
)

const SocialIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M12 8C9.5 4.5 4.5 5 3.5 8S5 14 7 15.5C9 17 12 15 12 15" />
		<path d="M12 8C14.5 4.5 19.5 5 20.5 8S19 14 17 15.5C15 17 12 15 12 15" />
	</svg>
)

const RssIcon = () => (
	<svg
		className="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<circle cx="6" cy="18" r="2" />
		<path d="M4 4a16 16 0 0 1 16 16" />
		<path d="M4 11a9 9 0 0 1 9 9" />
	</svg>
)

const FooterSection = ({
	title,
	links
}: FooterSectionProps) => {
	return (
		<div className="w-full sm:w-auto">
			<h3 className="text-primary mb-4 text-xs font-medium tracking-wider uppercase">
				{title}
			</h3>
			<ul className="space-y-3" role="menu">
				{links.map((link) => (
					<li key={link.text} role="none">
						{link.external ? (
							<a
								href={link.href}
								className="inline-flex items-center gap-2 text-sm"
								target="_blank"
								rel="noopener noreferrer"
								role="menuitem">
								{title === 'Resources' && link.text === 'Blog' && (
									<ResourceIcon />
								)}
								{title === 'Resources' && link.text === 'Tutorials' && (
									<TutorialIcon />
								)}
								{title === 'Social' && link.text === 'GitHub' && <GithubIcon />}
								{title === 'Social' && link.text === 'Bsky' && <SocialIcon />}
								{title === 'Social' && link.text === 'RSS' && <RssIcon />}
								<span>{link.text}</span>
							</a>
						) : (
							<Link
								href={link.href}
								className="inline-flex items-center gap-2 text-sm"
								role="menuitem">
								{title === 'Resources' && link.text === 'Blog' && (
									<ResourceIcon />
								)}
								{title === 'Resources' && link.text === 'Tutorials' && (
									<TutorialIcon />
								)}
								{title === 'Services' && link.text === 'Hire Me' && (
									<HireIcon />
								)}
								{title === 'Social' && link.text === 'GitHub' && <GithubIcon />}
								{title === 'Social' && link.text === 'Bsky' && <SocialIcon />}
								{title === 'Social' && link.text === 'RSS' && <RssIcon />}
								<span>{link.text}</span>
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
		Resources: [{href: '/blog', text: 'Blog'}],
		Services: [
			{href: '/hire-lauro', text: 'Hire Me'}
		],
		Social: [
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
			<Container className="mx-auto max-w-screen-xl">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-6">
					<div className="md:col-span-3">
						<div className="mb-6">
							<Link
								href="/"
								className="text-xl font-medium">
								Lauro Silva
							</Link>
						</div>
						<p className="text-muted-foreground mb-6 max-w-md">
							Helping developers build exceptional products and upskill their
							communities.
						</p>
						<div className="flex items-center space-x-3">
							<ModeToggle />
							<span className="text-muted-foreground text-xs">
								© {new Date().getFullYear()} Lauro Silva
							</span>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-8 md:col-span-3">
						{Object.entries(sections).map(([title, links]) => (
							<FooterSection
								key={title}
								title={title}
								links={links}
							/>
						))}
					</div>
				</div>
			</Container>
		</footer>
	)
}

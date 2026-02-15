import {type Metadata} from 'next/types'
import {notFound} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'
import {ArrowRight, ArrowLeft} from 'lucide-react'

type CaseStudy = {
	slug: string
	client: string
	domain: string
	title: string
	type: string
	tags: string[]
	challenge: string[]
	approach: string[]
	outcome: string[]
	techStack: string[]
	testimonial?: {
		quote: string
		name: string
		title: string
		image?: string
	}
}

const caseStudies: Record<string, CaseStudy> = {
	google: {
		slug: 'google',
		client: 'Google',
		domain: 'google.com',
		title: 'Developer Education Platform',
		type: 'Development & Education',
		tags: ['React', 'TypeScript', 'Education', 'Content Engineering'],
		challenge: [
			'Google needed to create developer education content and tooling that would help engineers across the organization learn and adopt modern web technologies effectively.',
			'The challenge was building educational experiences that could scale to thousands of engineers while maintaining high quality and practical applicability.'
		],
		approach: [
			'I worked directly with Google\'s developer education team to build content and tooling for their engineering audience. This included designing curriculum, creating interactive learning experiences, and developing the technical infrastructure to deliver them.',
			'My focus was on making complex web technologies accessible through hands-on, practical learning paths. Every piece of content was designed to be immediately applicable to real projects engineers were working on.'
		],
		outcome: [
			'Delivered a comprehensive developer education platform that helped Google engineers adopt modern web technologies more effectively.',
			'The engagement demonstrated how combining deep technical expertise with instructional design thinking produces education that actually sticks — not just information, but capability.'
		],
		techStack: [
			'React',
			'TypeScript',
			'Next.js',
			'Content Engineering',
			'Instructional Design'
		]
	},
	oreilly: {
		slug: 'oreilly',
		client: "O'Reilly",
		domain: 'oreilly.com',
		title: 'Live Technical Workshops',
		type: 'Developer Training',
		tags: ['Workshops', 'React', 'TypeScript', 'Instructional Design'],
		challenge: [
			'O\'Reilly needed experienced practitioners who could deliver live, interactive workshops on modern web development topics to their global audience of professional engineers.',
			'The workshops needed to go beyond surface-level tutorials — they had to address real-world complexity and leave attendees with skills they could immediately apply.'
		],
		approach: [
			'I designed and delivered multiple live workshops covering React, TypeScript, and modern web development patterns. Each workshop was built around practical exercises and real-world scenarios.',
			'My approach focused on teaching principles rather than just syntax. Attendees learned not just how to use these technologies, but when and why to reach for specific patterns — the kind of judgment that comes from years of production experience.'
		],
		outcome: [
			'Delivered workshops to hundreds of professional engineers through O\'Reilly\'s platform, receiving consistently strong feedback on practical applicability.',
			'This work established a foundation for my approach to developer education: hands-on, principle-based teaching that builds real capability rather than just awareness.'
		],
		techStack: [
			'React',
			'TypeScript',
			'Next.js',
			'Node.js',
			'Workshop Design'
		]
	},
	sentry: {
		slug: 'sentry',
		client: 'Sentry',
		domain: 'sentry.io',
		title: 'Developer Experience & Education',
		type: 'Development & Education',
		tags: ['Developer Experience', 'Education', 'React', 'TypeScript'],
		challenge: [
			'Sentry needed to improve their developer education content and developer experience to help users get the most out of their error monitoring platform.',
			'The goal was to create content and tooling that would reduce time-to-value for new users and deepen engagement with existing users.'
		],
		approach: [
			'I contributed to developer education initiatives and developer experience improvements for Sentry\'s platform. This involved creating technical content, improving documentation, and building examples that showcased best practices.',
			'Working with the Sentry team, I helped bridge the gap between their powerful platform capabilities and the developers trying to adopt them.'
		],
		outcome: [
			'Improved developer education materials and onboarding experiences that helped developers get productive with Sentry faster.',
			'The work reinforced a principle I carry into every engagement: the best developer tools are the ones developers can actually learn to use effectively.'
		],
		techStack: [
			'React',
			'TypeScript',
			'Node.js',
			'Developer Tooling',
			'Technical Writing'
		]
	},
	hoka: {
		slug: 'hoka',
		client: 'HOKA',
		domain: 'hoka.com',
		title: 'Full-Stack Product Development',
		type: 'Full-Stack Development',
		tags: ['Next.js', 'Full-Stack', 'E-commerce', 'Performance'],
		challenge: [
			'HOKA, one of the fastest-growing brands in running, needed senior engineering support to build and improve their digital products and web experiences.',
			'The work required someone who understood both the technical complexity of high-performance web applications and the needs of the outdoor/running industry.'
		],
		approach: [
			'I led full-stack development work for HOKA\'s digital products, building performant web experiences using modern web technologies. This included architecture decisions, hands-on development, and ensuring the products could handle the scale of a rapidly growing brand.',
			'As someone deeply embedded in the running community, I brought both technical expertise and domain knowledge — understanding what athletes and running enthusiasts actually need from digital experiences.'
		],
		outcome: [
			'Delivered performant, scalable web experiences for one of the most exciting brands in the running industry.',
			'This engagement exemplified my approach: combining senior engineering expertise with genuine understanding of the domain to build products that truly serve their users.'
		],
		techStack: [
			'Next.js',
			'React',
			'TypeScript',
			'Node.js',
			'Tailwind CSS',
			'Vercel'
		]
	},
	egghead: {
		slug: 'egghead',
		client: 'egghead',
		domain: 'egghead.io',
		title: 'Developer Courses at Scale',
		type: 'Developer Education',
		tags: ['Courses', 'React', 'TypeScript', 'Education'],
		challenge: [
			'egghead needed experienced practitioners to create concise, practical courses on modern web development that would help professional developers level up their skills.',
			'The courses needed to be efficient — developers\' time is valuable, and the content had to deliver maximum learning impact in minimum time.'
		],
		approach: [
			'I created and published technical courses covering modern web development topics. Each course was designed to be concise and immediately practical — no fluff, just the patterns and knowledge developers need.',
			'My approach leveraged my experience as both a practitioner and educator to identify the exact knowledge gaps developers face and address them directly.'
		],
		outcome: [
			'Published courses that reached thousands of developers through egghead\'s platform, helping them adopt modern web development practices.',
			'The egghead experience sharpened my ability to distill complex technical concepts into clear, actionable lessons — a skill I bring to every workshop and training engagement.'
		],
		techStack: [
			'React',
			'TypeScript',
			'Next.js',
			'Screencast Production',
			'Curriculum Design'
		]
	},
	'test-double': {
		slug: 'test-double',
		client: 'Test Double',
		domain: 'testdouble.com',
		title: 'Software Consulting & Team Augmentation',
		type: 'Consulting',
		tags: [
			'Consulting',
			'Architecture',
			'Team Augmentation',
			'Best Practices'
		],
		challenge: [
			'Test Double\'s clients needed senior engineering talent to help ship software and improve their development practices. The work required adaptability — embedding with different teams, understanding diverse codebases, and delivering impact quickly.',
			'Each engagement brought unique challenges: legacy code migrations, architecture decisions, testing strategies, and team process improvements.'
		],
		approach: [
			'As a consultant at Test Double, I provided senior engineering support across multiple client engagements. This meant quickly onboarding onto new codebases, identifying the highest-leverage improvements, and shipping meaningful work.',
			'I brought a consultative mindset: not just writing code, but helping teams understand why certain patterns and practices lead to better outcomes.'
		],
		outcome: [
			'Delivered tangible improvements across multiple client engagements — better architectures, improved testing, faster shipping cadences, and stronger team practices.',
			'The consulting experience taught me how to rapidly assess codebases and teams, identify what matters most, and deliver impact in compressed timelines.'
		],
		techStack: [
			'React',
			'TypeScript',
			'Node.js',
			'Testing',
			'Architecture',
			'Agile Consulting'
		]
	}
}

export async function generateStaticParams() {
	return Object.keys(caseStudies).map((slug) => ({slug}))
}

type PageProps = {
	params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
	const {slug} = await params
	const study = caseStudies[slug]
	if (!study) return {title: 'Not Found'}
	return {
		title: `${study.client} - ${study.title}`,
		description: study.challenge[0]
	}
}

export default async function CaseStudyPage({params}: PageProps) {
	const {slug} = await params
	const study = caseStudies[slug]

	if (!study) {
		notFound()
	}

	return (
		<>
			{/* Back Link */}
			<section className="px-6 pt-32 lg:pt-40">
				<Container width="narrow">
					<Link
						href="/work"
						className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors">
						<ArrowLeft className="h-4 w-4" />
						All work
					</Link>
				</Container>
			</section>

			{/* Hero */}
			<section className="px-6 pt-12 pb-16 lg:pb-24">
				<Container width="narrow">
					<div className="space-y-8">
						<div className="flex items-center gap-3">
							<Image
								src={`https://www.google.com/s2/favicons?domain=${study.domain}&sz=32`}
								alt={study.client}
								width={24}
								height={24}
								className="h-6 w-6"
							/>
							<span className="text-muted-foreground text-sm font-medium">
								{study.client}
							</span>
							<span className="text-muted-foreground text-sm">·</span>
							<span className="text-muted-foreground text-sm">
								{study.type}
							</span>
						</div>
						<h1 className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							{study.title}
						</h1>
						<div className="flex flex-wrap gap-2">
							{study.tags.map((tag) => (
								<span
									key={tag}
									className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-sm font-medium">
									{tag}
								</span>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* Content */}
			<section className="py-16 lg:py-24">
				<Container width="narrow">
					<div className="space-y-20">
						{/* The Challenge */}
						<div className="space-y-6">
							<div className="space-y-3">
								<span className="text-muted-foreground text-sm font-medium">
									The Challenge
								</span>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									What needed to happen
								</h2>
							</div>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
								{study.challenge.map((p, i) => (
									<p key={i}>{p}</p>
								))}
							</div>
						</div>

						{/* The Approach */}
						<div className="space-y-6">
							<div className="space-y-3">
								<span className="text-muted-foreground text-sm font-medium">
									The Approach
								</span>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									How I helped
								</h2>
							</div>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
								{study.approach.map((p, i) => (
									<p key={i}>{p}</p>
								))}
							</div>
						</div>

						{/* The Outcome */}
						<div className="space-y-6">
							<div className="space-y-3">
								<span className="text-muted-foreground text-sm font-medium">
									The Outcome
								</span>
								<h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
									What we achieved
								</h2>
							</div>
							<div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
								{study.outcome.map((p, i) => (
									<p key={i}>{p}</p>
								))}
							</div>
						</div>

						{/* Tech Stack */}
						<div className="space-y-6">
							<h3 className="text-lg font-bold">Tech Stack</h3>
							<div className="flex flex-wrap gap-3">
								{study.techStack.map((tech) => (
									<span
										key={tech}
										className="border-border bg-card rounded-full border px-4 py-2 text-sm font-medium">
										{tech}
									</span>
								))}
							</div>
						</div>

						{/* Testimonial */}
						{study.testimonial && (
							<blockquote className="border-border bg-card space-y-6 rounded-2xl border p-8 lg:p-12">
								<p className="text-foreground text-lg leading-relaxed italic lg:text-xl">
									&ldquo;{study.testimonial.quote}&rdquo;
								</p>
								<div className="flex items-center gap-3">
									{study.testimonial.image && (
										<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
											<Image
												src={study.testimonial.image}
												alt={study.testimonial.name}
												fill
												className="object-cover"
											/>
										</div>
									)}
									<div>
										<p className="text-sm font-semibold">
											{study.testimonial.name}
										</p>
										<p className="text-muted-foreground text-sm">
											{study.testimonial.title}
										</p>
									</div>
								</div>
							</blockquote>
						)}
					</div>
				</Container>
			</section>

			{/* CTA */}
			<section className="py-24 lg:py-32">
				<Container width="narrow">
					<div className="bg-card border-border-subtle space-y-8 rounded-3xl border p-12 text-center lg:p-16">
						<div className="space-y-6">
							<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
								Want similar results?
							</h2>
							<p className="text-muted-foreground text-lg leading-relaxed lg:text-xl">
								Let&apos;s discuss how I can help your team.
							</p>
						</div>
						<div className="pt-4">
							<Button asChild size="lg" className="group">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Schedule a free consultation
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</Container>
			</section>
		</>
	)
}

import {ArrowRight, CheckCircle} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage() {
	return (
		<Container>
			<main>
				{/* Hero Section */}
				<section className="py-24">
					<div className="space-y-6">
						<div className="inline-flex">
							<div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1.5">
								<div className="bg-primary h-1.5 w-1.5 rounded-full" />
								<span className="text-xs font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						<div className="space-y-5">
							<h1 className="text-xl font-semibold leading-tight sm:text-2xl tracking-tight">
								Hey! I&apos;m Lauro<span className="text-primary">.</span>
							</h1>
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight mt-2">
								An educator &{' '}
								<span className="text-primary">engineer</span>
							</h2>
							<p className="text-muted-foreground text-base leading-relaxed mt-3">
								I help companies build products and upskill developer communities through engineering and education.
							</p>
						</div>

						<div className="flex flex-col gap-4 sm:flex-row pt-2">
							<Button asChild size="lg">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Book a free consultation
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button asChild variant="ghost" size="lg">
								<Link href="#services">
									View services
								</Link>
							</Button>
						</div>
					</div>
				</section>

				{/* Companies Section */}
				<section className="py-16 mt-16">
					<p className="text-muted-foreground mb-10 text-sm font-medium uppercase tracking-wider">
						Working with teams at:
					</p>
					<div className="grid grid-cols-2 items-center justify-items-center gap-12 sm:grid-cols-4">
						{[
							{src: '/google.png', alt: 'Google', width: 90},
							{src: '/oreilly.svg', alt: "O'Reilly", width: 90},
							{src: '/sentry.png', alt: 'Sentry', width: 110},
							{src: '/hoka-logo.png', alt: 'Hoka', width: 80}
						].map((logo) => (
							<div key={logo.alt} className="w-20 sm:w-28">
								<Image
									src={logo.src}
									alt={logo.alt}
									width={logo.width}
									height={30}
									className="w-full opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
								/>
							</div>
						))}
					</div>
				</section>

				{/* Developer Education Pillar */}
				<section className="py-16 mt-16" id="services">
					<div className="space-y-14">
						{/* Section Header */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								Developer Education
							</h2>
							<p className="text-muted-foreground text-base leading-relaxed mt-2">
								Partner with me to build educational initiatives for your developer community. I manage content production, create learning experiences, and design curriculum.
							</p>
						</div>

						{/* Services */}
						<div className="space-y-10">
							{educationServices.map((service) => (
								<div key={service.title} className="space-y-4 pb-10">
									<div className="flex items-start gap-4">
										<span className="text-2xl flex-shrink-0">{service.icon}</span>
										<div className="space-y-3 flex-1">
											<h3 className="text-base font-semibold leading-tight tracking-tight">
												{service.title}
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed mt-1.5">
												{service.description}
											</p>
											<div className="flex flex-wrap gap-2 pt-1">
												{service.features.map((feature, idx) => (
													<span
														key={feature}
														className="text-muted-foreground text-sm">
														{feature}{idx < service.features.length - 1 && ' •'}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Testimonials - Key ones that relate to education */}
						<div className="space-y-10 pt-4">
							{EducationTestimonials.slice(0, 4).map((testimonial) => (
								<div key={testimonial.author} className="space-y-4 pb-10">
									<p className="text-base leading-relaxed">
										{testimonial.quote}
									</p>
									<div className="flex items-center gap-3">
										<div className="relative h-10 w-10 overflow-hidden rounded-full">
											<Image
												src={testimonial.image}
												alt={testimonial.author}
												fill
												className="object-cover"
											/>
										</div>
										<div className="space-y-0.5">
											<p className="text-sm font-medium">
												{testimonial.author}
											</p>
											<p className="text-muted-foreground text-xs">
												{testimonial.role}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Engineering Pillar */}
				<section className="py-16 mt-16">
					<div className="space-y-14">
						{/* Section Header */}
						<div className="space-y-4">
							<h2 className="text-lg font-semibold leading-tight sm:text-xl tracking-tight">
								Engineering
							</h2>
							<p className="text-muted-foreground text-base leading-relaxed mt-2">
								Full-stack development with React, Next.js, and Node.js. Available for product development, consulting, and technical leadership.
							</p>
						</div>

						{/* Services */}
						<div className="space-y-10">
							{engineeringServices.map((service) => (
								<div key={service.title} className="space-y-4 pb-10">
									<div className="flex items-start gap-4">
										<span className="text-2xl flex-shrink-0">{service.icon}</span>
										<div className="space-y-3 flex-1">
											<h3 className="text-base font-semibold leading-tight tracking-tight">
												{service.title}
											</h3>
											<p className="text-muted-foreground text-sm leading-relaxed mt-1.5">
												{service.description}
											</p>
											<div className="flex flex-wrap gap-2 pt-1">
												{service.features.map((feature, idx) => (
													<span
														key={feature}
														className="text-muted-foreground text-sm">
														{feature}{idx < service.features.length - 1 && ' •'}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Testimonials - Key ones that relate to engineering */}
						<div className="space-y-10 pt-4">
							{EngineeringTestimonials.slice(0, 4).map((testimonial) => (
								<div key={testimonial.author} className="space-y-4 pb-10">
									<p className="text-base leading-relaxed">
										{testimonial.quote}
									</p>
									<div className="flex items-center gap-3">
										<div className="relative h-10 w-10 overflow-hidden rounded-full">
											<Image
												src={testimonial.image}
												alt={testimonial.author}
												fill
												className="object-cover"
											/>
										</div>
										<div className="space-y-0.5">
											<p className="text-sm font-medium">
												{testimonial.author}
											</p>
											<p className="text-muted-foreground text-xs">
												{testimonial.role}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 mt-16">
					<div className="space-y-10 text-center">
						<div className="space-y-4">
							<h2 className="text-xl font-normal leading-relaxed sm:text-2xl">
								Let&apos;s work together
							</h2>
							<p className="text-muted-foreground text-base leading-relaxed mt-2">
								Start with a conversation about your goals and how I can help.
							</p>
						</div>

						<div className="space-y-6">
							<Button asChild size="lg">
								<Link
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									Book a free consultation
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>

							<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
								<div className="flex items-center gap-2">
									<CheckCircle className="text-primary h-4 w-4" />
									<span className="text-muted-foreground text-sm">
										No commitment required
									</span>
								</div>
								<div className="flex items-center gap-2">
									<CheckCircle className="text-primary h-4 w-4" />
									<span className="text-muted-foreground text-sm">
										Free initial consultation
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

interface Service {
	title: string
	description: string
	features: string[]
	icon: string
}

interface Testimonial {
	quote: string
	author: string
	role: string
	image: string
	logo: string
}

const engineeringServices: Service[] = [
	{
		title: 'Full-Stack Development',
		description: `Specializing in large-scale React applications. Available for full-stack development, product work, and React migrations.`,
		features: [
			'Full-Stack Development',
			'Product Development',
			'Tech Stack Migrations to React'
		],
		icon: '⚛️'
	},
	{
		title: 'Technical Leadership',
		description:
			'Guide teams and set high standards for software excellence. Focus on mentoring, code quality, and innovation.',
		features: ['Mentoring', 'Code Quality', 'Innovation'],
		icon: '💛'
	},
	{
		title: 'Performance Optimization',
		description:
			'Enhance application performance for fast user experiences. Focus on speed, Core Web Vitals, and performance best practices.',
		features: [
			'Speed Improvements',
			'Core Web Vitals',
			'Performance Best Practices'
		],
		icon: '⚡'
	}
]

const educationServices: Service[] = [
	{
		title: 'Content Development',
		description:
			'Create tutorials, video content, and interactive resources for developers at all levels.',
		features: ['Tutorials', 'Video Content', 'Resources'],
		icon: '📕'
	},
	{
		title: 'Technical Workshops',
		description: `Remote workshops to enhance your team's skills in building modern full-stack applications with Next.js, TypeScript, and Node.js.`,
		features: [
			'Hands-on Learning',
			'Real-World Projects',
			'Practical Exercises'
		],
		icon: '🚀'
	},
	{
		title: 'Instructional Design',
		description:
			'Train your DevRel team to create effective educational content and strategies.',
		features: ['Instructional Design', 'Content Strategy', 'DevRel Training'],
		icon: '📹'
	}
]

const EducationTestimonials: Testimonial[] = [
	{
		quote:
			'Lauro is a total pro. His guidance for our team helped us not only create a polished set of onboarding videos, it helped us build the capability to create additional content on our own in the future.',
		author: 'Andrew Hedges',
		role: 'Assistiv Labs',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436605/laurosilvacom/hire-me-page/logos/bgrbziwzsvlkarpbxu9b.png'
	},
	{
		quote:
			"Shout out to @laurosilvacom — I've been feeling overwhelmed by all the things I want to do (and it's caused me to get tied up in knots instead of shipping) An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, hit him up!",
		author: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731437039/laurosilvacom/hire-me-page/logos/wj4oxrqh2dizrv7p1deb.png'
	},
	{
		quote:
			'Lauro played a crucial role in the early days of Total TypeScript - helping shape the project as a whole and providing critical feedback. Absolute rockstar.',
		author: 'Matt Pocock',
		role: 'Total TypeScript',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/d2czubfk8lipnflorffc.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731440026/laurosilvacom/hire-me-page/logos/psi8rml6dekvhgjjyfu4.ico'
	},
	{
		quote: `Lauro has an exceptional grasp of developer education. He understands that if you want developers to truly tune in, you need to think beyond the code. Lauro's ability to bridge that gap is has been so helpful.`,
		author: 'Amanda Quinn',
		role: `O'Reilly Media`,
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/sfb3bpsb8cyawhjckqzp.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436408/laurosilvacom/hire-me-page/logos/vsh30exulie54cn3go8v.png'
	},
	{
		quote: `Lauro introduced me to the world of creating courses and I couldn't be happier for that. I've learned a lot from him, but I feel like I barely scratched the surface of his knowledge and expertise. If I need help around content creation, I wouldn't think twice about hiring him ⭐️`,
		author: 'Lazar Nikolov',
		role: 'Developer Advocate',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/feghewn8upq5agudmjue.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441696/laurosilvacom/hire-me-page/logos/rvgpyjc0d4z4yslaw0p8.png'
	},
	{
		quote: `@laurosilvacom is the reason my TypeScript course even exists. He is one of the best in the industry in terms of creating high-quality education and content. If your team needs an expert, he's your person :)`,
		author: 'Joe Previte',
		role: 'TypeScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/qvv2x8w69azainacmu9d.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731440270/laurosilvacom/hire-me-page/logos/gjfkx65vcsmp2ksjygzk.png'
	}
]

const EngineeringTestimonials: Testimonial[] = [
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of how to leverage technology for social good. There expertise has been invaluable in advancing our mission',
		author: 'Anya Yeager',
		role: 'LOTUS Humanitarian',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/gbwkf4uzwmxomngxhkj6.png',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731442726/laurosilvacom/hire-me-page/logos/v7qtumbo3bm57svns3b7.jpg'
	},
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of marketing for professional athletes. His expertise bridges technology and brand strategy, making them an invaluable partner.',
		author: 'Emily Schmitz',
		role: 'HOKA',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731442307/laurosilvacom/hire-me-page/logos/vupwji6g7e9qt6dp4pep.png'
	},
	{
		quote: `Thanks for all your help and patience @laurosilvacom - you're the real MVP.`,
		author: 'Alejandro Nanez',
		role: 'Staff Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441786/laurosilvacom/hire-me-page/logos/lj1kfzowxpqyindsneoe.webp'
	},
	{
		quote:
			"We couldn't do it without you @laurosilvacom! You and the rest of the team at provide such an awesome support system! Thanks so much to you all!",
		author: 'Erin Doyle',
		role: 'SRE / Platform Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/bk8b2qxymdq5hzrx41yo.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731445516/laurosilvacom/hire-me-page/logos/tu5beel5k6xpeds5jrea.png'
	},
	{
		quote:
			'Working with @laurosilvacom is always a good experience. Thanks for the help and guidance...the course will be awesome!',
		author: 'Matías Hernández',
		role: 'JavaScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/vtnslxxf2ahtn0qmp39c.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441786/laurosilvacom/hire-me-page/logos/lj1kfzowxpqyindsneoe.webp'
	}
]

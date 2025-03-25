'use client'

import {ArrowDown, ArrowRight, CheckCircle} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, {type JSX} from 'react'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

export default function ServicesPage(): JSX.Element {
	return (
		<Container className="mx-auto max-w-screen-xl">
			<section className="relative py-16 sm:py-20 md:py-32">
				<div className="mx-auto">
					<div className="flex flex-col space-y-16 sm:space-y-20">
						<div className="inline-flex">
							<div className="border-primary/10 bg-primary/5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
								<div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
								<span className="text-primary text-xs font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						{/* Main content grid */}
						<div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
							<div className="space-y-10 sm:space-y-12">
								{/* Heading */}
								<div className="space-y-6">
									<h1 className="text-foreground">
										<span className="block text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
											Hey! I&apos;m Lauro<span className="text-primary">.</span>
										</span>
										<span className="mt-2 block text-3xl font-bold sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
											An educator &{' '}
											<span className="text-primary">engineer</span>
										</span>
									</h1>
									<p className="text-muted-foreground text-lg leading-relaxed sm:text-xl md:text-2xl">
										I help companies build exceptional products and upskill
										their developer communities. Think of me as your technical
										companion for both building and teaching.
									</p>
								</div>

								{/* CTAs */}
								<div className="flex flex-col gap-4 sm:flex-row">
									<Button asChild size="lg">
										<Link
											href="https://cal.com/laurosilvacom/chat"
											target="_blank"
											rel="noopener noreferrer">
											<span className="flex items-center gap-2">
												Book a free consultation
												<ArrowRight />
											</span>
										</Link>
									</Button>

									<Button asChild variant="outline" size="lg">
										<Link href="#services-section">
											<span className="flex items-center gap-2">
												View services
												<ArrowDown />
											</span>
										</Link>
									</Button>
								</div>
							</div>

							{/* Hero image */}
							<div className="hidden md:block">
								<div className="relative aspect-square overflow-hidden rounded-3xl">
									<Image
										src="/conference.png"
										alt="Lauro Silva"
										fill
										className="rounded-3xl object-cover"
										priority
									/>
								</div>
							</div>
						</div>

						{/* Companies section */}
						<div className="pt-8 sm:pt-12">
							<p className="text-muted-foreground mb-8 text-sm font-medium tracking-wide uppercase">
								Empowering engineering teams at companies like:
							</p>
							<div className="grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-4 sm:gap-12">
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
						</div>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-32" id="services-section">
				<div className="mx-auto max-w-7xl">
					{/* Services Overview */}
					<div className="relative mb-32 text-center">
						<h2 className="text-foreground relative z-10 text-5xl font-bold tracking-tight sm:text-6xl">
							Services & Expertise
						</h2>
						<p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
							I help companies build exceptional products through full-stack
							development, and I also help dev-focused companies launch
							effective education strategies for their communities.
						</p>
						<div className="mx-auto mt-20 grid gap-8 sm:gap-12 md:grid-cols-2">
							{unifiedServices.map((service, index) => (
								<div
									key={index}
									className="border-muted bg-card relative overflow-hidden rounded-3xl border p-8 sm:p-10">
									{/* Content Container */}
									<div className="relative space-y-8">
										{/* Title */}
										<h3 className="text-foreground text-2xl leading-tight font-bold sm:text-3xl">
											{service.title}
										</h3>

										{/* Description */}
										<p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
											{service.description}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap items-center gap-3 pt-4">
											{service.tags.map((tag) => (
												<span
													key={tag}
													className="border-muted bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Education Section */}
					<div className="relative mb-32">
						<div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
							{/* Testimonials */}
							<div className="space-y-12">
								{EducationTestimonials.map((testimonial, index) => (
									<div
										key={index}
										className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${testimonial.className || 'bg-primary/5 border-primary/10'}`}>
										{/* Content Container */}
										<div className="relative space-y-8">
											{/* Company Logo */}
											<div className="h-8">
												<Image
													src={testimonial.logo}
													alt="Company logo"
													width={120}
													height={30}
													className="h-full w-auto object-contain"
												/>
											</div>

											{/* Quote */}
											<div className="space-y-6">
												<p className="text-foreground text-lg leading-relaxed font-medium">
													{testimonial.quote}
												</p>
											</div>

											{/* Author Info */}
											<div className="flex items-center gap-4 pt-2">
												<div className="bg-secondary relative h-12 w-12 overflow-hidden rounded-full">
													<Image
														src={testimonial.image}
														alt={testimonial.author}
														fill
														className="object-cover"
													/>
												</div>

												<div className="space-y-1">
													<p className="text-foreground font-medium">
														{testimonial.author}
													</p>
													<p className="text-primary text-sm font-medium">
														{testimonial.role}
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Services Details */}
							<div>
								<h3 className="text-muted-foreground text-base font-semibold tracking-wide uppercase">
									Developer Education & Training
								</h3>
								<h2 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Upskill Your Developer Communities
								</h2>
								<div className="mt-12 space-y-6">
									{educationServices.map((service, index) => (
										<div
											key={index}
											className="border-muted bg-card relative overflow-hidden rounded-3xl border p-8 sm:p-10">
											{/* Content Container */}
											<div className="relative flex gap-8">
												{/* Icon with fixed width */}
												<div className="bg-secondary flex h-14 w-14 flex-none items-center justify-center rounded-2xl">
													<span className="text-primary text-2xl">
														{service.icon}
													</span>
												</div>

												{/* Text Content */}
												<div className="space-y-6">
													<div className="space-y-3">
														<h3 className="text-foreground text-xl leading-tight font-bold sm:text-2xl">
															{service.title}
														</h3>
														<p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
															{service.description}
														</p>
													</div>

													{/* Features */}
													<div className="flex flex-wrap gap-3">
														{service.features.map((feature) => (
															<span
																key={feature}
																className="border-muted bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all">
																{feature}
															</span>
														))}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Engineering Section */}
					<div className="relative mb-32">
						<div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
							{/* Services Details */}
							<div>
								<h3 className="text-muted-foreground text-base font-semibold tracking-wide uppercase">
									Full-Stack Engineering Consulting
								</h3>
								<h2 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Build Exceptional Digital Products
								</h2>
								<div className="mt-12 space-y-6">
									{engineeringServices.map((service, index) => (
										<div
											key={index}
											className="border-muted bg-card relative overflow-hidden rounded-3xl border p-8 transition-all hover:-translate-y-1 sm:p-10">
											{/* Content Container */}
											<div className="relative flex gap-8">
												{/* Icon */}
												<div className="bg-secondary flex h-14 w-14 flex-none items-center justify-center rounded-2xl">
													<span className="text-primary text-2xl">
														{service.icon}
													</span>
												</div>

												{/* Text Content */}
												<div className="space-y-6">
													<div className="space-y-3">
														<h3 className="text-foreground text-xl leading-tight font-bold sm:text-2xl">
															{service.title}
														</h3>
														<p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
															{service.description}
														</p>
													</div>

													{/* Features */}
													<div className="flex flex-wrap gap-3">
														{service.features.map((feature) => (
															<span
																key={feature}
																className="border-muted bg-secondary text-muted-foreground hover:text-foreground inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all">
																{feature}
															</span>
														))}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							{/* Testimonials */}
							<div className="space-y-12">
								{EngineeringTestimonials.map((testimonial, index) => (
									<div
										key={index}
										className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 ${testimonial.className || 'bg-primary/5 border-primary/10'}`}>
										{/* Content Container */}
										<div className="relative space-y-8">
											{/* Company Logo */}
											<div className="h-10">
												<Image
													src={testimonial.logo}
													alt="Company logo"
													width={40}
													height={40}
													className="h-full w-auto object-contain"
												/>
											</div>

											{/* Quote Container */}
											<div className="space-y-6">
												{/* Quote Text */}
												<blockquote>
													<p className="text-foreground text-lg leading-relaxed font-medium">
														{testimonial.quote}
													</p>
												</blockquote>
											</div>

											{/* Author Info */}
											<div className="flex items-center gap-4 pt-2">
												<div className="border-border relative h-12 w-12 overflow-hidden rounded-full border">
													<Image
														src={testimonial.image}
														alt={testimonial.author}
														fill
														className="object-cover"
													/>
												</div>

												<div className="space-y-1">
													<p className="text-foreground font-semibold">
														{testimonial.author}
													</p>
													<p className="text-primary text-sm font-medium">
														{testimonial.role}
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="border-muted bg-card relative mx-6 mb-20 rounded-2xl border p-10">
				<div className="mx-auto max-w-[1200px]">
					{/* Content container */}
					<div className="relative space-y-12 text-center">
						{/* Badge */}
						<div className="inline-flex">
							<div className="border-muted bg-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2">
								<div className="bg-primary h-2 w-2 rounded-full" />
								<span className="text-primary text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						{/* Main content */}
						<div className="space-y-6">
							<h2 className="text-foreground mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
								{`Let's Build Something`}
								<span className="text-primary"> Impactful</span> — Together
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
								{`Your next project starts with a conversation. Let's discuss your
								goals and ideas to create something amazing.`}
							</p>
						</div>

						{/* CTA Section */}
						<div className="space-y-8">
							<Button asChild size="lg">
								<a
									href="https://cal.com/laurosilvacom/chat"
									target="_blank"
									rel="noopener noreferrer">
									<span className="flex items-center gap-2">
										Book a free consultation
										<ArrowRight />
									</span>
								</a>
							</Button>

							{/* Features */}
							<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
								<div className="border-muted bg-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2">
									<CheckCircle className="text-primary h-4 w-4" />
									<span className="text-muted-foreground text-sm">
										No commitment required
									</span>
								</div>
								<div className="border-muted bg-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2">
									<CheckCircle className="text-primary h-4 w-4" />
									<span className="text-muted-foreground text-sm">
										Free initial consultation
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Container>
	)
}

// Define TypeScript interfaces
interface UnifiedService {
	title: string
	description: string
	tags: string[]
	gradient: string
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
	gradient: string
}

// Data Arrays
const unifiedServices: UnifiedService[] = [
	{
		title: 'Developer Education & Training',
		description: `I've partnered with developer-focused companies to build and launch large-scale educational initiatives aimed at upskilling their developer communities. This work takes various forms: managing content production, building learning experiences, and designing the curriculum.`,
		tags: ['Workshops', 'Content', 'Training', 'Community'],
		gradient: 'bg-gradient-to-bl from-primary/5 via-transparent to-transparent'
	},
	{
		title: 'Full-Stack Engineering Consulting',
		description: `I specialize in full-stack development with React and proficient in backend technologies like Next.js and Node.js. You can hire me for product development (solo/team), consulting, or team leadership and mentoring. `,
		tags: ['React', 'Next.js', 'Performance', 'Architecture'],
		gradient: 'bg-gradient-to-br from-primary/5 via-transparent to-transparent'
	}
]

const engineeringServices: Service[] = [
	{
		title: 'Full-Stack Development',
		description: `I'm a software engineer specializing in helping teams ship large-scale React applications. You can hire me for development projects, including full-stack development, product development, and tech stack migrations to React.`,
		features: [
			'Full-Stack Development',
			'Product Development ',
			'Tech Stack Migrations to React'
		],
		icon: '⚛️'
	},
	{
		title: 'Technical Leadership',
		description:
			'I can provide technical leadership by guiding teams and setting high standards for software excellence. With a focus on mentoring, code quality, and fostering innovation,',
		features: ['Mentoring', 'Code Quality', 'Innovation'],
		icon: '💛'
	},
	{
		title: 'Performance Optimization',
		description:
			'I specialize in enhancing application performance to deliver lightning-fast user experiences. By focusing on speed, optimizing Core Web Vitals, and implementing best practices, I ensure your applications run smoothly and efficiently.',
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
			'Partner with me to create engaging tutorials, produce insightful video content, and develop interactive resources that assist developers at all levels.',
		features: ['Tutorials', 'Video Content', 'Resources'],
		icon: '📕'
	},
	{
		title: 'Technical Workshops',
		description: `I offer remote professional workshops tailored to enhance your team's skills in building modern, full-stack web applications with Next.js, TypeScript and Node.js`,
		features: [
			'Hands-on Learning',
			'Real-World Projects',
			'Practical Exercises'
		],
		icon: '🚀'
	},
	{
		title: 'Instructional Design for Developers',
		description:
			'I provide instructional design training to empower your DevRel team in creating effective educational content and strategies.',
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
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436605/laurosilvacom/hire-me-page/logos/bgrbziwzsvlkarpbxu9b.png',
		gradient: 'from-[#D8B4FE] to-[#818CF8]'
	},
	{
		quote:
			"Shout out to @laurosilvacom — I've been feeling overwhelmed by all the things I want to do (and it's caused me to get tied up in knots instead of shipping) An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, hit him up!",
		author: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731437039/laurosilvacom/hire-me-page/logos/wj4oxrqh2dizrv7p1deb.png',
		gradient: 'from-[#FDEB71] to-[#ffeb17]'
	},
	{
		quote:
			'Lauro played a crucial role in the early days of Total TypeScript - helping shape the project as a whole and providing critical feedback. Absolute rockstar.',
		author: 'Matt Pocock',
		role: 'Total TypeScript',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/d2czubfk8lipnflorffc.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731440026/laurosilvacom/hire-me-page/logos/psi8rml6dekvhgjjyfu4.ico',
		gradient: 'from-[#90F7EC] to-[#32CCBC]'
	},
	{
		quote: `Lauro has an exceptional grasp of developer education. He understands that if you want developers to truly tune in, you need to think beyond the code. Lauro's ability to bridge that gap is has been so helpful.`,
		author: 'Amanda Quinn',
		role: `O'Reilly Media`,
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/sfb3bpsb8cyawhjckqzp.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436408/laurosilvacom/hire-me-page/logos/vsh30exulie54cn3go8v.png',
		gradient: 'from-[#ff9bb0] to-[#ffc3c3]'
	},
	{
		quote: `Lauro introduced me to the world of creating courses and I couldn't be happier for that. I've learned a lot from him, but I feel like I barely scratched the surface of his knowledge and expertise. If I need help around content creation, I wouldn't think twice about hiring him ⭐️`,
		author: 'Lazar Nikolov',
		role: 'Developer Advocate',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/feghewn8upq5agudmjue.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441696/laurosilvacom/hire-me-page/logos/rvgpyjc0d4z4yslaw0p8.png',
		gradient: 'from-[#cba1fd] to-[#c8c3ff]'
	},
	{
		quote: `@laurosilvacom is the reason my TypeScript course even exists. He is one of the best in the industry in terms of creating high-quality education and content. If your team needs an expert, he's your person :)`,
		author: 'Joe Previte',
		role: 'TypeScript Engineer ',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/qvv2x8w69azainacmu9d.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731440270/laurosilvacom/hire-me-page/logos/gjfkx65vcsmp2ksjygzk.png',
		gradient: 'from-[#bffaff] to-[#a3ceff]'
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
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731442726/laurosilvacom/hire-me-page/logos/v7qtumbo3bm57svns3b7.jpg',
		gradient: 'from-[#814d98] to-[#ab77c2]'
	},
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of marketing for professional athletes. His expertise bridges technology and brand strategy, making them an invaluable partner.',
		author: 'Emily Schmitz',
		role: 'HOKA',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731442307/laurosilvacom/hire-me-page/logos/vupwji6g7e9qt6dp4pep.png',
		gradient: 'from-[#0781ca] to-[#90c7f7]'
	},
	{
		quote: `Thanks for all your help and patience @laurosilvacom - you're the real MVP.`,
		author: 'Alejandro Nanez',
		role: 'Staff Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441786/laurosilvacom/hire-me-page/logos/lj1kfzowxpqyindsneoe.webp',
		gradient: 'from-[#f7e01b] to-[#efff7a]'
	},
	{
		quote:
			"We couldn't do it without you @laurosilvacom! You and the rest of the team at provide such an awesome support system! Thanks so much to you all!",
		author: 'Erin Doyle',
		role: 'SRE / Platform Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/bk8b2qxymdq5hzrx41yo.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731445516/laurosilvacom/hire-me-page/logos/tu5beel5k6xpeds5jrea.png',
		gradient: 'from-[#60dafa] to-[#29d3ff]'
	},
	{
		quote:
			'Working with @laurosilvacom is always a good experience. Thanks for the help and guidance...the course will be awesome!',
		author: 'Matías Hernández',
		role: 'JavaScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/vtnslxxf2ahtn0qmp39c.jpg',
		logo: 'https://res.cloudinary.com/laurosilvacom/image/upload/v1731441786/laurosilvacom/hire-me-page/logos/lj1kfzowxpqyindsneoe.webp',
		gradient: 'from-[#f7e01b] to-[#efff7a]'
	}
]

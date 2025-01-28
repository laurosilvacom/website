'use client'

import {ArrowDown, ArrowRight, CheckCircle} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, {type JSX} from 'react'

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

export default function ServicesPage(): JSX.Element {
	return (
		<div className="bg-background mx-auto max-w-[1400px] px-6 sm:px-12 lg:px-20">
			<section className="relative py-24 md:py-32">
				<div className="mx-auto max-w-[1200px]">
					{/* Background decorative elements */}
					<div className="pointer-events-none absolute inset-0 -z-10">
						<div className="bg-primary/5 absolute top-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full blur-3xl" />
						<div className="bg-primary/10 absolute top-1/3 right-0 h-48 w-48 rounded-full blur-3xl" />
					</div>

					<div className="flex flex-col items-start space-y-12">
						{/* Status badge */}
						<div className="animate-in slide-in-from-top duration-1000">
							<div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm">
								<span className="relative flex h-2 w-2">
									<span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
									<span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
								</span>
								<span className="text-primary text-sm font-medium">
									Available for new projects
								</span>
							</div>
						</div>

						{/* Main content grid */}
						<div className="grid gap-16 md:grid-cols-[1.5fr_1fr] md:gap-24">
							<div className="space-y-12">
								{/* Heading with animated entrance */}
								<div className="space-y-4">
									<div className="animate-in slide-in-from-left duration-700">
										<h1 className="text-foreground font-bold tracking-tight">
											<span className="block text-4xl sm:text-5xl md:text-7xl">
												Hey! I&apos;m Lauro
												<span className="text-primary">.</span>
											</span>
											<span className="mt-4 block text-3xl sm:text-4xl md:text-6xl">
												An educator &
												<span className="text-primary"> engineer</span>
											</span>
										</h1>
									</div>
								</div>

								{/* Bio with animated entrance */}
								<div className="animate-in slide-in-from-left delay-200 duration-700">
									<p className="text-muted-foreground text-xl leading-relaxed md:text-2xl">
										I help companies build exceptional products and upskill
										their developer communities. Think of me as your technical
										companion for both building and teaching.
									</p>
								</div>

								{/* CTA buttons with animated entrance */}
								<div className="animate-in slide-in-from-left delay-300 duration-700">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
										{/* Primary CTA - Book a call */}
										<Link
											href="https://cal.com/laurosilvacom/chat"
											target="_blank"
											rel="noopener noreferrer"
											className="bg-primary text-primary-foreground group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium transition-all hover:-translate-y-1">
											<span className="relative flex items-center gap-2">
												Book a free consultation
												<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
											</span>
										</Link>

										{/* Secondary CTA - Services */}
										<Link
											href="#services-section"
											className="group bg-background inline-flex items-center justify-center rounded-full border px-8 py-4 text-lg font-medium transition-all hover:-translate-y-1">
											<span className="relative flex items-center gap-2">
												View services
												<ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
											</span>
										</Link>
									</div>
								</div>
							</div>

							{/* Right column decorative element/image */}
							<div className="hidden md:block">
								<div className="bg-secondary/50 relative aspect-square rounded-2xl backdrop-blur-sm">
									<Image
										src="/conference.png"
										alt="Lauro Silva"
										fill
										className="motion-safe:animate-hero-image-reveal rounded-[3rem] object-cover shadow-[0_0_30px_rgba(var(--primary),0.2)]"
										priority
									/>
								</div>
							</div>
						</div>

						{/* Social proof section with animated entrance */}
						<div className="animate-in slide-in-from-bottom delay-500 duration-1000">
							<div className="bg-card/50 relative mt-16 rounded-2xl border p-8 backdrop-blur-sm">
								<p className="text-muted-foreground mb-8 text-sm font-medium">
									Empowering engineering teams at companies like:
								</p>
								<div className="grid grid-cols-2 gap-12 opacity-70 grayscale transition-opacity hover:opacity-100 hover:grayscale-0 sm:grid-cols-4">
									<Image
										src="/google.png"
										alt="Google"
										width={120}
										height={20}
										className="self-center transition-transform hover:scale-105"
									/>
									<Image
										src="/oreilly.svg"
										alt="Company 3"
										width={120}
										height={40}
										className="self-center transition-transform hover:scale-105"
									/>
									<Image
										src="/sentry.png"
										alt="Company 2"
										width={120}
										height={40}
										className="self-center transition-transform hover:scale-105"
									/>

									<Image
										src="/hoka-logo.png"
										alt="Company 4"
										width={120}
										height={40}
										className="self-center transition-transform hover:scale-105"
									/>
								</div>
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
						<h2 className="title text-foreground relative z-10 text-5xl font-bold tracking-tight sm:text-6xl">
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
									className="group border-muted bg-card relative overflow-hidden rounded-3xl border p-8 sm:p-10">
									{/* Gradient Background */}
									<div
										className={`absolute inset-0 ${service.gradient} opacity-10 transition-opacity group-hover:opacity-20`}
									/>

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
										<div className="flex flex-wrap items-center justify-center gap-3 pt-4">
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
										className="group border-muted bg-card relative rounded-2xl border p-8 transition-all hover:shadow-sm">
										<div
											className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-10 transition-opacity group-hover:opacity-20`}
										/>
										<div className="relative z-10">
											<div className="mb-6 h-12">
												<Image
													src={testimonial.logo}
													alt="Company logo"
													width={40}
													height={40}
													className="object-contain"
												/>
											</div>
											<blockquote className="relative">
												<svg
													className="text-primary absolute -top-3 -left-3 h-8 w-8 opacity-20"
													fill="currentColor"
													viewBox="0 0 32 32">
													<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
												</svg>
												<p className="text-foreground text-lg leading-relaxed font-medium">
													{testimonial.quote}
												</p>
											</blockquote>
											<div className="mt-8 flex items-center gap-4">
												<div className="ring-primary/20 relative h-12 w-12 overflow-hidden rounded-full ring-2">
													<Image
														src={testimonial.image}
														alt={testimonial.author}
														fill
														className="object-cover"
													/>
												</div>
												<div>
													<p className="text-foreground font-medium">
														{testimonial.author}
													</p>
													<p className="text-primary text-sm">
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
								<h3 className="text-muted-foreground text-base font-semibold">
									Developer Education & Training
								</h3>
								<h2 className="title text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Upskill Your Developer Communities
								</h2>
								<div className="mt-12 space-y-6">
									{educationServices.map((service, index) => (
										<div
											key={index}
											className="group border-muted bg-card relative overflow-hidden rounded-3xl border p-8 sm:p-10">
											{/* Gradient overlay */}
											<div className="from-primary absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-10 transition-opacity group-hover:opacity-20" />

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
								<h3 className="text-muted-foreground text-base font-semibold">
									Full-Stack Engineering Consulting
								</h3>
								<h2 className="title text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Build Exceptional Digital Products
								</h2>
								<div className="mt-12 space-y-6">
									{engineeringServices.map((service, index) => (
										<div
											key={index}
											className="group border-muted bg-card relative overflow-hidden rounded-3xl border p-8 transition-all hover:-translate-y-1 sm:p-10">
											{/* Gradient overlay */}
											<div className="from-primary absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-10 transition-opacity group-hover:opacity-20" />

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
										className="group border-muted bg-card relative rounded-2xl border p-8 transition-all hover:shadow-sm">
										<div
											className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-10 transition-opacity group-hover:opacity-20`}
										/>
										<div className="relative z-10">
											<div className="mb-6 h-12">
												<Image
													src={testimonial.logo}
													alt="Company logo"
													width={40}
													height={40}
													className="object-contain"
												/>
											</div>
											<blockquote className="relative">
												<svg
													className="text-primary absolute -top-3 -left-3 h-8 w-8 opacity-20"
													fill="currentColor"
													viewBox="0 0 32 32">
													<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
												</svg>
												<p className="text-foreground text-lg leading-relaxed font-medium">
													{testimonial.quote}
												</p>
											</blockquote>
											<div className="mt-8 flex items-center gap-4">
												<div className="ring-primary/20 relative h-12 w-12 overflow-hidden rounded-full ring-2">
													<Image
														src={testimonial.image}
														alt={testimonial.author}
														fill
														className="object-cover"
													/>
												</div>
												<div>
													<p className="text-foreground font-medium">
														{testimonial.author}
													</p>
													<p className="text-primary text-sm">
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
			<section className="group border-muted bg-card relative mx-6 rounded-2xl border p-10">
				<div className="from-primary absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-transparent opacity-10 transition-opacity group-hover:opacity-20" />

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
								Let's Build Something
								<span className="text-primary"> Impactful</span> — Together
							</h2>
							<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
								Your next project starts with a conversation. Let's discuss your
								goals and ideas to create something amazing.
							</p>
						</div>

						{/* CTA Section */}
						<div className="space-y-8">
							<a
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-primary text-primary-foreground group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium transition-all hover:-translate-y-1">
								<span className="relative flex items-center gap-2">
									Book a free consultation
									<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
								</span>
							</a>

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
		</div>
	)
}

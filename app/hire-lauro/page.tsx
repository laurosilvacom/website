'use client'

import {ArrowRight, CheckCircle} from 'lucide-react'
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
			<section className="relative px-6 py-32 md:py-48">
				<div className="mx-auto max-w-[1200px]">
					<div className="flex flex-col items-start">
						{/* Eyebrow text */}
						<span className="text-primary mb-8 text-sm font-medium">
							Currently available for new projects
						</span>

						{/* Main heading with creative layout */}
						<div className="mb-6">
							<h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
								Hey! I&apos;m Lauro,
								<br className="hidden md:block" />
								<span className="mt-2 block">
									an educator & engineer
									<span className="text-primary">.</span>
								</span>
							</h1>
						</div>

						{/* Bio with personality */}
						<div className="max-w-2xl">
							<p className="text-muted-foreground text-xl md:text-2xl">
								I help companies build exceptional products and upskill their
								developer communities. Think of me as your technical companion
								for both building and teaching.
							</p>
						</div>

						{/* CTA Section */}
						<div className="mt-12 flex items-center gap-6">
							<Link
								href="#services-section"
								className="group bg-primary text-primary-foreground relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(var(--primary),0.5)]">
								See how I can help
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
							</Link>

							<a
								href="https://cal.com/laurosilvacom/chat"
								target="_blank"
								rel="noopener noreferrer"
								className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-lg font-medium transition-colors">
								Book a call
								<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
							</a>
						</div>

						{/* Logos Section */}
						{/*
              <div className="mt-20">
                <p className="text-muted-foreground mb-8 text-sm">
                  Trusted by developers from companies like:
                </p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70 grayscale">
                  <Image
                    src="/logo1.svg"
                    alt="Company 1"
                    width={120}
                    height={40}
                  />
                  <Image
                    src="/logo2.svg"
                    alt="Company 2"
                    width={120}
                    height={40}
                  />
                  <Image
                    src="/logo3.svg"
                    alt="Company 3"
                    width={120}
                    height={40}
                  />
                  <Image
                    src="/logo4.svg"
                    alt="Company 4"
                    width={120}
                    height={40}
                  />
                </div>
              </div>
              */}
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
						<div className="mx-auto mt-20 grid gap-12 md:grid-cols-2">
							{unifiedServices.map((service, index) => (
								<div
									key={index}
									className="group border-muted bg-card relative rounded-3xl border p-10 transition-all hover:shadow-sm">
									<div
										className={`absolute inset-0 rounded-3xl ${service.gradient} opacity-10 transition-opacity group-hover:opacity-20`}
									/>
									<h3 className="text-foreground text-2xl font-bold">
										{service.title}
									</h3>
									<p className="text-muted-foreground mt-4 text-lg leading-relaxed">
										{service.description}
									</p>
									<div className="mt-6 flex flex-wrap gap-2">
										{service.tags.map((tag) => (
											<span
												key={tag}
												className="border-muted text-muted-foreground hover:bg-muted hover:text-foreground rounded-full border px-4 py-2 text-sm transition-all">
												{tag}
											</span>
										))}
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
								<h3 className="text-primary text-sm font-semibold">
									Developer Education & Training
								</h3>
								<h2 className="title text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Upskill Your Developer Communities
								</h2>
								<div className="mt-12 space-y-8">
									{educationServices.map((service, index) => (
										<div
											key={index}
											className="group border-muted bg-card relative rounded-2xl border p-8 transition-all hover:shadow-sm">
											<div className="flex gap-6">
												<span className="text-primary text-4xl">
													{service.icon}
												</span>
												<div>
													<h3 className="text-foreground text-xl font-bold">
														{service.title}
													</h3>
													<p className="text-muted-foreground mt-2">
														{service.description}
													</p>
													<div className="mt-4 flex flex-wrap gap-2">
														{service.features.map((feature) => (
															<span
																key={feature}
																className="border-muted text-muted-foreground hover:bg-muted hover:text-foreground rounded-full border px-3 py-1 text-sm transition-all">
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
								<h3 className="text-primary text-sm font-semibold">
									Full-Stack Engineering Consulting
								</h3>
								<h2 className="title text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
									Build Exceptional Digital Products
								</h2>
								<div className="mt-12 space-y-8">
									{engineeringServices.map((service, index) => (
										<div
											key={index}
											className="group border-muted bg-card relative rounded-2xl border p-8 transition-all hover:shadow-sm">
											<div className="flex gap-6">
												<span className="text-primary text-4xl">
													{service.icon}
												</span>
												<div>
													<h3 className="text-foreground text-xl font-bold">
														{service.title}
													</h3>
													<p className="text-muted-foreground mt-2">
														{service.description}
													</p>
													<div className="mt-4 flex flex-wrap gap-2">
														{service.features.map((feature) => (
															<span
																key={feature}
																className="border-muted text-muted-foreground hover:bg-muted hover:text-foreground rounded-full border px-3 py-1 text-sm transition-all">
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
			<section className="border-muted bg-card relative rounded-2xl border p-8 py-32 transition-all hover:shadow-sm">
				<div className="mx-auto max-w-5xl text-center">
					<h2 className="title text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
						Let&apos;s Build Something Impactful — Together.
					</h2>
					<p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
						Your next project starts with a conversation. Let&apos;s discuss
						your goals and ideas to create something amazing. Ready to get
						started? Book a call today.
					</p>
					<div className="mt-12">
						<a
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer">
							<button className="group bg-primary text-primary-foreground relative overflow-hidden rounded-full px-8 py-4 text-lg font-medium transition-all hover:shadow-lg">
								<span className="relative z-10 flex items-center justify-center">
									Start a Conversation
									<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</span>
							</button>
						</a>
					</div>
					<div className="text-muted-foreground mt-8 flex flex-col items-center gap-4 text-sm sm:flex-row sm:justify-center sm:gap-8">
						<div className="flex items-center gap-2">
							<CheckCircle className="text-primary h-4 w-4" />
							<span>No commitment required</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle className="text-primary h-4 w-4" />
							<span>Free initial consultation</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

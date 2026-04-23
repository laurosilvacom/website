import Link from 'next/link'
import Image from 'next/image'
import Container from '@/shared/components/container'
import {ArrowLeft} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'

export const metadata = generatePageMetadata(
	'Testimonials',
	'What clients and collaborators say about working with Lauro Silva — developer education, full-stack engineering, and technical leadership.',
	{
		keywords: [
			'testimonials',
			'client reviews',
			'developer education',
			'engineering consulting',
		],
		canonical: '/work/testimonials',
	},
)

const educationTestimonials = [
	{
		quote:
			'Lauro is a total pro. His guidance for our team helped us not only create a polished set of onboarding videos, it helped us build the capability to create additional content on our own in the future.',
		name: 'Andrew Hedges',
		role: 'Assistiv Labs',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/ok4aceenrvijrjcafxba.jpg',
	},
	{
		quote:
			"Shout out to @laurosilvacom — I've been feeling overwhelmed by all the things I want to do (and it's caused me to get tied up in knots instead of shipping) An hour with Lauro helped me untangle my thoughts and make a concrete plan. If you need dev content strategy, hit him up!",
		name: 'Jason Lengstorf',
		role: 'Learn With Jason',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/py2kbwptjbxfdqpoepkj.jpg',
	},
	{
		quote:
			'Lauro played a crucial role in the early days of Total TypeScript - helping shape the project as a whole and providing critical feedback. Absolute rockstar.',
		name: 'Matt Pocock',
		role: 'Total TypeScript',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/d2czubfk8lipnflorffc.jpg',
	},
	{
		quote:
			"Lauro has an exceptional grasp of developer education. He understands that if you want developers to truly tune in, you need to think beyond the code. Lauro's ability to bridge that gap has been so helpful.",
		name: 'Amanda Quinn',
		role: "O'Reilly Media",
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/sfb3bpsb8cyawhjckqzp.jpg',
	},
	{
		quote:
			"Lauro introduced me to the world of creating courses and I couldn't be happier for that. I've learned a lot from him, but I feel like I barely scratched the surface of his knowledge and expertise. If I need help around content creation, I wouldn't think twice about hiring him.",
		name: 'Lazar Nikolov',
		role: 'Developer Advocate',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/feghewn8upq5agudmjue.jpg',
	},
	{
		quote:
			"@laurosilvacom is the reason my TypeScript course even exists. He is one of the best in the industry in terms of creating high-quality education and content. If your team needs an expert, he's your person.",
		name: 'Joe Previte',
		role: 'TypeScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/qvv2x8w69azainacmu9d.jpg',
	},
]

const engineeringTestimonials = [
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of how to leverage technology for social good. Their expertise has been invaluable in advancing our mission.',
		name: 'Anya Yeager',
		role: 'LOTUS Humanitarian',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/gbwkf4uzwmxomngxhkj6.png',
	},
	{
		quote:
			'Lauro is an incredible engineer with a deep understanding of marketing for professional athletes. His expertise bridges technology and brand strategy, making them an invaluable partner.',
		name: 'Emily Schmitz',
		role: 'HOKA',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731436030/laurosilvacom/hire-me-page/ru1j6csfgvj2af4b1dn6.webp',
	},
	{
		quote: "Thanks for all your help and patience @laurosilvacom - you're the real MVP.",
		name: 'Alejandro Nanez',
		role: 'Staff Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435976/laurosilvacom/hire-me-page/p3eglqeb7qfvsfzvh3qr.jpg',
	},
	{
		quote:
			"We couldn't do it without you @laurosilvacom! You and the rest of the team provide such an awesome support system! Thanks so much to you all!",
		name: 'Erin Doyle',
		role: 'SRE / Platform Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/bk8b2qxymdq5hzrx41yo.jpg',
	},
	{
		quote:
			'Working with @laurosilvacom is always a good experience. Thanks for the help and guidance...the course will be awesome!',
		name: 'Matías Hernández',
		role: 'JavaScript Engineer',
		image:
			'https://res.cloudinary.com/laurosilvacom/image/upload/v1731435977/laurosilvacom/hire-me-page/vtnslxxf2ahtn0qmp39c.jpg',
	},
]

function TestimonialCard({
	testimonial,
}: {
	testimonial: {quote: string; name: string; role: string; image: string}
}) {
	return (
		<div className="flex gap-3 py-4">
			<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
				<Image
					src={testimonial.image}
					alt={testimonial.name}
					fill
					className="object-cover"
				/>
			</div>
			<div className="min-w-0">
				<p className="text-foreground text-sm leading-relaxed">
					&ldquo;{testimonial.quote}&rdquo;
				</p>
				<p className="text-muted-foreground mt-2 text-xs">
					<span className="text-foreground font-medium">{testimonial.name}</span>
					{' · '}
					{testimonial.role}
				</p>
			</div>
		</div>
	)
}

export default function TestimonialsPage() {
	return (
		<>
			{/* Header */}
			<section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
				<Container>
					<div className="space-y-4">
						<Link
							href="/work"
							className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium transition-colors">
							<ArrowLeft className="h-3 w-3" />
							All work
						</Link>
						<h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
							Testimonials
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							What clients and collaborators have said about working together.
						</p>
					</div>
				</Container>
			</section>

			{/* Education Testimonials */}
			<section className="pb-12 lg:pb-16">
				<Container>
					<h2 className="text-foreground mb-2 text-sm font-semibold">
						Developer Education & Training
					</h2>
					<p className="text-muted-foreground mb-6 text-xs">
						Feedback from instructional design, content strategy, and developer training
						engagements.
					</p>
					<div className="space-y-2">
						{educationTestimonials.map((t) => (
							<TestimonialCard key={t.name} testimonial={t} />
						))}
					</div>
				</Container>
			</section>

			{/* Engineering Testimonials */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="text-foreground mb-2 text-sm font-semibold">
						Full-Stack Engineering
					</h2>
					<p className="text-muted-foreground mb-6 text-xs">
						Feedback from product development, consulting, and technical leadership
						engagements.
					</p>
					<div className="space-y-2">
						{engineeringTestimonials.map((t) => (
							<TestimonialCard key={t.name} testimonial={t} />
						))}
					</div>
				</Container>
			</section>

			{/* Contact */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<p className="text-muted-foreground text-sm">
						<a
							href="mailto:me@laurosilva.com"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							me@laurosilva.com
						</a>
						{' · '}
						<a
							href="https://cal.com/laurosilvacom/chat"
							target="_blank"
							rel="noopener noreferrer"
							className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
							Schedule a conversation
						</a>
					</p>
				</Container>
			</section>
		</>
	)
}

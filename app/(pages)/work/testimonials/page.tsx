import Link from 'next/link'
import Container from '@/shared/components/container'
import {ArrowLeft} from 'lucide-react'
import {generatePageMetadata} from '@/shared/lib/metadata'
import {Avatar, AvatarFallback, AvatarImage} from '@/shared/ui/avatar'
import {Button} from '@/shared/ui/button'

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
			<Avatar className="size-8 shrink-0">
				<AvatarImage src={testimonial.image} alt={testimonial.name} />
				<AvatarFallback>{testimonial.name.charAt(0).toUpperCase()}</AvatarFallback>
			</Avatar>
			<div className="min-w-0">
				<p className="type-body-sm text-foreground">
					&ldquo;{testimonial.quote}&rdquo;
				</p>
				<p className="type-meta mt-2">
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
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/work" className="inline-flex items-center gap-1.5">
								<ArrowLeft className="h-3 w-3" />
								All work
							</Link>
						</Button>
						<h1 className="type-page-title">
							Testimonials
						</h1>
						<p className="type-page-intro">
							What clients and collaborators have said about working together.
						</p>
					</div>
				</Container>
			</section>

			{/* Education Testimonials */}
			<section className="pb-16 lg:pb-20">
				<Container>
					<h2 className="type-section-label mb-6">
						Developer Education & Training
					</h2>
					<p className="type-meta mb-6">
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
					<h2 className="type-section-label mb-6">
						Full-Stack Engineering
					</h2>
					<p className="type-meta mb-6">
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
					<p className="type-body-sm">
						<Button
							asChild
							variant="link"
							size="sm"
							className="text-foreground h-auto px-0 transition-opacity hover:opacity-70">
							<a href="mailto:me@laurosilva.com">me@laurosilva.com</a>
						</Button>
						{' · '}
						<Button
							asChild
							variant="link"
							size="sm"
							className="text-foreground h-auto px-0 transition-opacity hover:opacity-70">
							<a href="https://cal.com/laurosilvacom/chat" target="_blank" rel="noopener noreferrer">
								Schedule a conversation
							</a>
						</Button>
					</p>
				</Container>
			</section>
		</>
	)
}

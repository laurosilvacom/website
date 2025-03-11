import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight, BookOpen} from 'lucide-react'
import Container from 'app/components/container'
import {getWorkshops} from './utils'

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	return (
		<div className="relative min-h-screen">
			<Container className="mx-auto w-full max-w-screen-lg">
				<main className="mx-auto py-20">
					{/* Header Section */}
					<section className="mb-20">
						<div className="mx-auto max-w-2xl text-center">
							<h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
								Interactive Workshops
							</h1>
							<p className="text-muted-foreground text-lg">
								Practical, hands-on learning experiences to build your skills
								and ship better code
							</p>
						</div>
					</section>

					{/* Workshops Grid */}
					<div className="grid gap-8 md:grid-cols-2">
						{workshops.map((workshop) => (
							<Link
								key={workshop.slug}
								href={`/workshops/${workshop.slug}`}
								className="group">
								<div className="flex items-center gap-4">
									{/* Workshop Icon/Image */}
									<div className="relative h-16 w-16 overflow-hidden rounded-lg">
										<Image
											src={workshop.metadata.imageUrl}
											alt={workshop.metadata.title}
											fill
											className="object-cover"
										/>
									</div>

									{/* Workshop Title */}
									<div>
										<h3 className="text-foreground group-hover:text-primary text-xl font-semibold transition-colors">
											{workshop.metadata.title}
										</h3>
										<p className="text-muted-foreground text-sm">
											{workshop.metadata.description.substring(0, 60)}...
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</main>
			</Container>
		</div>
	)
}

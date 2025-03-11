import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight, BookOpen} from 'lucide-react'
import Container from 'app/components/container'
import {getWorkshops} from './utils'

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	return (
		<div className="bg-background relative min-h-screen">
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
								className="group border-border bg-card/50 hover:bg-card flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md">
								{/* Workshop Cover Image */}
								<div className="relative h-52 overflow-hidden">
									<Image
										src={workshop.metadata.imageUrl}
										alt={workshop.metadata.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
									<div className="absolute bottom-0 left-0 w-full p-4">
										<h3 className="text-2xl font-bold text-white">
											{workshop.metadata.title}
										</h3>
									</div>
								</div>

								{/* Workshop Content */}
								<div className="flex flex-grow flex-col p-6">
									<p className="text-muted-foreground mb-4 text-sm">
										{workshop.metadata.description}
									</p>

									{/* Highlights Section */}
									<div className="mb-6 flex-grow space-y-3">
										{workshop.metadata.highlights
											?.slice(0, 3)
											.map((highlight, i) => (
												<div key={i} className="flex items-start gap-3">
													<span className="text-primary mt-0.5">•</span>
													<span className="text-foreground text-sm">
														{highlight}
													</span>
												</div>
											))}
									</div>

									{/* Footer */}
									<div className="border-border mt-auto flex items-center border-t pt-4">
										<div className="text-primary flex items-center text-sm font-medium group-hover:underline">
											<BookOpen className="mr-1.5 h-4 w-4" />
											<span>Explore Workshop</span>
										</div>
										<ArrowRight className="text-primary ml-auto h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
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

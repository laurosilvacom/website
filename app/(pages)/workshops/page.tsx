import Image from 'next/image'
import Link from 'next/link'
import Container from 'app/components/container'
import {getWorkshops} from './utils'

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	return (
		<div className="bg-background relative min-h-screen py-20">
			<Container className="mx-auto w-full max-w-screen-lg">
				{/* Header Section with refined typography */}
				<section className="mb-16">
					<div className="mx-auto max-w-2xl">
						<h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
							Interactive Workshops
						</h1>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Practical, hands-on learning experiences to build your skills and
							ship better code
						</p>
					</div>
				</section>

				{/* Workshops List */}
				<div className="space-y-6">
					{workshops.map((workshop) => (
						<Link
							key={workshop.slug}
							href={`/workshops/${workshop.slug}`}
							className="group block">
							<div className="border-border bg-card hover:bg-secondary/30 overflow-hidden rounded-xl border p-5 transition-colors">
								<div className="flex gap-6">
									{/* Workshop Icon with consistent styling */}
									<div className="relative flex-shrink-0">
										<div className="bg-secondary/30 ring-border/40 h-16 w-16 overflow-hidden rounded-lg ring-1">
											<Image
												src={workshop.metadata.imageUrl}
												alt=""
												width={64}
												height={64}
												className="h-16 w-16 object-cover"
											/>
										</div>
										{/* Subtle indicator dot */}
										<div className="bg-primary/60 absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full" />
									</div>

									{/* Workshop Content */}
									<div className="flex-1">
										<h3 className="text-foreground group-hover:text-primary text-xl font-medium transition-colors">
											{workshop.metadata.title}
										</h3>
										<p className="text-muted-foreground mt-1 line-clamp-2 text-[0.95rem]">
											{workshop.metadata.description}
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</Container>
		</div>
	)
}

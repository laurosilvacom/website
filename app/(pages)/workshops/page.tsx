import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/container'
import {getWorkshops} from '@/lib/workshop'
import {type Workshop} from '@/lib/workshop'

export const revalidate = 30

export const metadata = {
	title: 'Workshops',
	description: 'Professional workshops and training programs.'
}

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	// Fix TS issue: Handle potential undefined/null return
	if (!workshops) {
		return (
			<section className="py-32">
				<Container width="narrow">
					<p className="text-muted-foreground text-center">
						No workshops found.
					</p>
				</Container>
			</section>
		)
	}

	return (
		<>
			<section className="relative flex min-h-[60vh] items-center justify-center px-4 pt-32 pb-20 lg:pt-40">
				<div className="mx-auto max-w-3xl text-center">
					<div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-1000">
						<h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							Workshops
						</h1>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
							Professional training programs designed to help you level up your
							skills.
						</p>
					</div>
				</div>
			</section>

			<section className="py-16 lg:py-24">
				<Container width="wide">
					{workshops.length === 0 ? (
						<div className="text-center">
							<p className="text-muted-foreground">
								No workshops available at the moment.
							</p>
						</div>
					) : (
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{workshops.map((workshop: Workshop) => (
								<Link
									key={workshop._id}
									href={`/workshops/${workshop.slug.current}`}
									className="group block">
									<div className="bg-card border-border hover:bg-accent/50 rounded-lg border p-6 transition-colors">
										{workshop.image?.asset?.url && (
											<div className="mb-4 aspect-video overflow-hidden rounded-md">
												<Image
													src={workshop.image.asset.url}
													alt={workshop.title}
													width={400}
													height={225}
													className="h-full w-full object-cover"
													unoptimized
												/>
											</div>
										)}
										<h3 className="text-foreground group-hover:text-primary mb-2 text-xl font-semibold">
											{workshop.title}
										</h3>
										{workshop.shortDescription && (
											<p className="text-muted-foreground text-sm leading-relaxed">
												{workshop.shortDescription}
											</p>
										)}
										{workshop.audience &&
											workshop.audience.length > 0 &&
											workshop.audience[0] && (
												<div className="mt-4">
													<span className="text-muted-foreground text-xs">
														For {workshop.audience[0].title}
													</span>
												</div>
											)}
									</div>
								</Link>
							))}
						</div>
					)}
				</Container>
			</section>
		</>
	)
}

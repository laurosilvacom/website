import Image from 'next/image'
import Link from 'next/link'
import Container from 'app/components/container'
import {getWorkshops} from './utils'

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	return (
		<div className="bg-background relative min-h-screen">
			<Container className="mx-auto w-full max-w-screen-lg">
				<main className="mx-auto py-24">
					<section className="relative mb-32 text-center">
						<div
							className="bg-primary absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 opacity-5 blur-[100px]"
							aria-hidden="true"
						/>

						<div className="bg-muted mb-6 inline-flex items-center gap-2 rounded-full px-6 py-2">
							<span className="text-primary animate-pulse text-sm font-medium">
								New Workshops Available
							</span>
						</div>

						<h1 className="mb-8">
							<span className="text-foreground mb-4 block text-5xl font-bold tracking-tight sm:text-6xl">
								Level Up Your Dev Skills
							</span>
							<span className="text-muted-foreground mt-4 block text-xl font-normal">
								Practical workshops that help you ship better code
							</span>
						</h1>
					</section>

					<div className="grid gap-6 md:grid-cols-2">
						{workshops.map((workshop) => (
							<div
								key={workshop.slug}
								className="group bg-card relative overflow-hidden rounded-xl border">
								<div className="relative h-48 overflow-hidden">
									<Image
										src={workshop.metadata.imageUrl}
										alt={workshop.metadata.title}
										layout="fill"
										objectFit="cover"
										className="transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute bottom-4 left-4 z-20">
										<span className="bg-primary/90 text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
											{workshop.metadata.status}
										</span>
									</div>
								</div>

								{/* Content Section */}
								<div className="p-6">
									<h3 className="text-foreground mb-2 text-2xl font-bold">
										{workshop.metadata.title}
									</h3>
									<p className="text-muted-foreground mb-4 text-sm leading-relaxed">
										{workshop.metadata.description}
									</p>

									<div className="space-y-4">
										<ul className="grid gap-2">
											{workshop.metadata.highlights?.map((highlight, i) => (
												<li
													key={i}
													className="text-foreground flex items-center gap-2 text-sm">
													<span className="bg-primary h-1 w-1 rounded-full" />
													{highlight}
												</li>
											))}
										</ul>

										<div className="border-border/40 flex items-center justify-between border-t pt-4">
											<Link
												href={`/workshops/${workshop.slug}`}
												className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-all">
												View Workshop
											</Link>
											<span className="text-primary font-mono text-lg font-bold">
												{workshop.metadata.price}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</main>
			</Container>
		</div>
	)
}

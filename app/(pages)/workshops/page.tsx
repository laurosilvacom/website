import Link from 'next/link'
import Container from '@/shared/components/container'
import {getWorkshops} from '@/features/workshop/server'
import {type Workshop} from '@/features/workshop/server'
import {ArrowRight} from 'lucide-react'

export const revalidate = 30

export const metadata = {
	title: 'Workshops',
	description: 'Self-paced courses and email workshops.',
}

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	if (!workshops) {
		return (
			<section className="py-32">
				<Container>
					<p className="text-muted-foreground">No workshops found.</p>
				</Container>
			</section>
		)
	}

	return (
		<>
			{/* Header */}
			<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
				<Container>
					<div className="space-y-4">
						<h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
							Workshops
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							Self-paced courses and email-based workshops for individual developers.
						</p>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Looking for team training?{' '}
							<Link
								href="/teaching"
								className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70">
								See teaching engagements
							</Link>
							.
						</p>
					</div>
				</Container>
			</section>

			{/* List */}
			<section className="pb-16 lg:pb-20">
				<Container>
					{workshops.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No self-paced courses are available right now.
						</p>
					) : (
						<div className="space-y-1">
							{workshops.map((workshop: Workshop) => (
								<Link
									key={workshop._id}
									href={`/workshops/${workshop.slug.current}`}
									className="group flex items-center justify-between gap-4 py-5 transition-opacity hover:opacity-70">
									<div className="min-w-0 space-y-1">
										<span className="text-foreground text-sm font-medium">
											{workshop.title}
										</span>
										{workshop.shortDescription && (
											<p className="text-muted-foreground text-xs">
												{workshop.shortDescription}
											</p>
										)}
										{workshop.audience &&
											workshop.audience.length > 0 &&
											workshop.audience[0] && (
												<p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
													For {workshop.audience[0].title}
												</p>
											)}
									</div>
									<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
								</Link>
							))}
						</div>
					)}
				</Container>
			</section>
		</>
	)
}

import Link from 'next/link'
import Container from '@/shared/components/container'
import {getWorkshops} from '@/features/workshop/server'
import {type Workshop} from '@/features/workshop/server'
import {ArrowRight} from 'lucide-react'

export const revalidate = 30

export const metadata = {
	title: 'Workshops',
	description: 'Professional workshops and training programs.',
}

export default async function WorkshopsPage() {
	const workshops = await getWorkshops()

	if (!workshops) {
		return (
			<section className="py-32">
				<Container width="base">
					<p className="text-muted-foreground">No workshops found.</p>
				</Container>
			</section>
		)
	}

	return (
		<>
			{/* Header */}
			<section className="pt-40 pb-20 lg:pt-48 lg:pb-24">
				<Container width="base">
					<div className="animate-in fade-in slide-in-from-bottom-4 max-w-2xl space-y-4 duration-1000">
						<h1 className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Workshops
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
							Professional training programs designed to help you level up your
							skills.
						</p>
					</div>
				</Container>
			</section>

			{/* List */}
			<section className="border-border border-t py-16 lg:py-20">
				<Container width="base">
					{workshops.length === 0 ? (
						<p className="text-muted-foreground text-sm">
							No workshops available at the moment.
						</p>
					) : (
						<div className="divide-border divide-y">
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
												<p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
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

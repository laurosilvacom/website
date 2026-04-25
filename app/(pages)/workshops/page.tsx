import Link from 'next/link'
import Container from '@/shared/components/container'
import {getWorkshops} from '@/features/workshop/server'
import {type Workshop} from '@/features/workshop/server'
import {ArrowRight} from 'lucide-react'
import {Button} from '@/shared/ui/button'

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
						<h1 className="type-page-title">
							Workshops
						</h1>
						<p className="type-page-intro">
							Self-paced courses and email-based workshops for individual developers.
						</p>
						<p className="type-body-sm">
							Looking for team training?{' '}
							<Button
								asChild
								variant="link"
								size="sm"
								className="text-foreground h-auto px-0 transition-opacity hover:opacity-70">
								<Link href="/teaching">See teaching engagements</Link>
							</Button>
							.
						</p>
					</div>
				</Container>
			</section>

			{/* List */}
			<section className="pb-16 lg:pb-20">
				<Container>
					{workshops.length === 0 ? (
						<p className="type-body-sm">
							No self-paced courses are available right now.
						</p>
					) : (
						<div className="space-y-1">
							{workshops.map((workshop: Workshop) => (
								<Button
									key={workshop._id}
									asChild
									variant="ghost"
									size="sm"
									className="group h-auto w-full justify-between gap-4 px-0 py-5 transition-opacity hover:opacity-70">
									<Link href={`/workshops/${workshop.slug.current}`}>
										<div className="min-w-0 space-y-1 text-left">
											<span className="type-item-title">{workshop.title}</span>
											{workshop.shortDescription && (
												<p className="type-meta">{workshop.shortDescription}</p>
											)}
											{workshop.audience &&
												workshop.audience.length > 0 &&
												workshop.audience[0] && (
													<p className="type-meta font-medium tracking-wider uppercase">
														For {workshop.audience[0].title}
													</p>
												)}
										</div>
										<ArrowRight className="text-muted-foreground h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
									</Link>
								</Button>
							))}
						</div>
					)}
				</Container>
			</section>
		</>
	)
}

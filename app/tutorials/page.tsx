import {getTutorials} from 'app/tutorials/utils'
import Link from 'next/link'
import Container from 'app/components/container'

export default async function TutorialsPage() {
	const tutorials = await getTutorials()

	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto py-12">
				<section className="mb-20">
					<h1 className="mb-8 text-4xl font-semibold tracking-tight">
						Video Tutorials
					</h1>
					<div className="text-muted-foreground space-y-4 text-xl">
						<p className="leading-relaxed">
							A collection of valuable web development tips.
						</p>
					</div>
				</section>

				<section className="mb-20">
					<div className="grid gap-8">
						{tutorials.map((tutorial) => (
							<Link
								key={tutorial.slug}
								href={`/tutorials/${tutorial.slug}`}
								className="group border-border bg-card relative rounded-lg border p-6 transition-all hover:shadow-lg">
								<div className="flex items-start gap-4">
									{tutorial.metadata.icon && (
										<img
											src={tutorial.metadata.icon}
											alt=""
											className="h-12 w-12 rounded-lg"
										/>
									)}
									<div>
										<h2 className="text-xl font-semibold">
											{tutorial.metadata.title}
										</h2>
										<p className="text-muted-foreground mt-1">
											{tutorial.metadata.summary}
										</p>
										<div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
											<span>{tutorial.metadata.duration}</span>
											<span>•</span>
											<span>{tutorial.metadata.difficulty}</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			</main>
		</Container>
	)
}

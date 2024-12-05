import {getTutorials} from 'app/tutorials/utils'
import Link from 'next/link'

export default async function TutorialsPage() {
	const tutorials = await getTutorials()

	return (
		<div className="mx-auto max-w-4xl py-12">
			<h1 className="mb-8 text-4xl font-bold">Tutorials</h1>
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
		</div>
	)
}

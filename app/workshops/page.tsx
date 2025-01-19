import Container from 'app/components/container'

export default async function NewsletterPage() {
	return (
		<Container className="mx-auto w-full max-w-screen-lg">
			<main className="mx-auto py-12">
				<section className="relative mb-20 text-center">
					<div
						className="bg-primary absolute -top-8 left-1/2 h-40 w-40 -translate-x-1/2 opacity-5 blur-3xl"
						aria-hidden="true"
					/>

					<div className="bg-muted mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1">
						<span className="text-primary text-sm font-medium">
							PUBLISHED EVERY TWO WEEKS
						</span>
					</div>

					<h1 className="mb-4">
						<span className="text-primary text-4xl font-bold tracking-tight sm:text-5xl">
							Workshops
						</span>
						<span className="mt-4 block space-x-4">
							<span className="text-primary text-2xl font-normal">
								A wonderfully nerdy newsletter
							</span>
							<span className="inline-block animate-pulse text-2xl">✨</span>
						</span>
					</h1>
				</section>
			</main>
		</Container>
	)
}

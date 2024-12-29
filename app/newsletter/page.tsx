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
							The Newsletter
						</span>
						<span className="mt-4 block space-x-4">
							<span className="text-primary text-2xl font-normal">
								A wonderfully nerdy newsletter
							</span>
							<span className="inline-block animate-pulse text-2xl">✨</span>
						</span>
					</h1>

					<div className="relative">
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
							Join me on a journey through the wonderful world of web
							development. Every issue is carefully crafted with
							<span className="text-primary mx-1 font-medium">
								delightful discoveries
							</span>
							and
							<span className="text-primary mx-1 font-medium">
								&quot;aha!&quot; moments
							</span>
							that make coding fun.
						</p>

						<div className="bg-primary absolute top-0 -right-4 h-2 w-2 rounded-full opacity-50" />
						<div className="bg-primary absolute bottom-0 -left-4 h-2 w-2 rounded-full opacity-50" />
					</div>
				</section>

				<section className="mb-20">
					<div className="group relative mx-auto max-w-2xl">
						<div
							className="bg-primary absolute -inset-[2px] rounded-2xl opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40"
							aria-hidden="true"
						/>

						<div className="border-default bg-card relative rounded-xl border p-1 shadow-2xl">
							<div className="border-default rounded-lg border p-8">
								<div className="relative grid gap-12 md:grid-cols-[1.2fr,1fr]">
									<div>
										<div className="text-primary mb-2 inline-flex items-center gap-2 rounded-lg bg-[hsl(var(--primary)/0.1)] px-4 py-1">
											<span>📦 What&apos;s inside</span>
											<span className="text-sm">↓</span>
										</div>

										<ul className="mt-6 space-y-6">
											{[
												[
													'Deep-dives & discoveries',
													'Fascinating concepts explained with care'
												],
												['Behind-the-scenes', 'See how things actually work'],
												[
													'Developer stories',
													'Real experiences & lessons learned'
												]
											].map(([title, desc]) => (
												<li key={title} className="group/item relative pl-6">
													<div className="bg-primary absolute top-[0.4rem] left-0 h-2 w-2 rounded-full transition-all duration-300 group-hover/item:scale-125" />
													<div>
														<div className="group-hover/item:text-primary font-medium transition-colors duration-300">
															{title}
														</div>
														<div className="text-muted-foreground text-sm">
															{desc}
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>

									<div>
										<form className="space-y-6">
											<div>
												<label className="text-muted-foreground block text-sm">
													Join the adventure →
												</label>
												<input
													type="email"
													placeholder="you@awesome.dev"
													className="bg-muted ring-default placeholder:text-muted-foreground/50 hover:ring-primary focus:ring-primary mt-2 w-full rounded-lg px-4 py-3 text-lg ring-1 transition-all duration-300 focus:ring-2 focus:outline-none"
												/>
											</div>

											<button
												type="submit"
												className="group bg-primary text-primary-foreground relative w-full overflow-hidden rounded-lg p-px font-medium">
												<span className="relative flex h-11 items-center justify-center">
													Subscribe
													<span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
														→
													</span>
												</span>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Container>
	)
}

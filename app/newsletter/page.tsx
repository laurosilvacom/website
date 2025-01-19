import Container from 'app/components/container'

export default async function NewsletterPage() {
	return (
		<Container className="mx-auto w-full max-w-screen-xl">
			<main className="relative py-24">
				{/* Hero Grid */}
				<div className="relative mx-auto mb-32 grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
					{/* Main Title */}
					<div className="col-span-full space-y-8 lg:col-span-8">
						<h1 className="text-foreground text-4xl font-bold md:text-5xl lg:text-6xl">
							The Newsletter
						</h1>
						<p className="text-muted-foreground text-2xl md:text-3xl">
							A wonderfully nerdy newsletter about building better software.
						</p>
					</div>
				</div>

				{/* Content Grid */}
				<div className="relative mx-auto mb-32 grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
					{/* Features Section */}
					<div className="col-span-full space-y-12 lg:col-span-6">
						<div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2">
							<span className="text-primary font-medium">WHATs INCLUDED ↓</span>
						</div>

						<ul className="space-y-8">
							{[
								{
									title: 'Deep-dives & discoveries',
									desc: 'Fascinating concepts explained with care'
								},
								{
									title: 'Behind-the-scenes',
									desc: 'See how things actually work'
								},
								{
									title: 'Developer stories',
									desc: 'Real experiences & lessons learned'
								}
							].map(({title, desc}) => (
								<li key={title} className="group relative pl-8">
									<div className="bg-primary absolute top-[0.6rem] left-0 h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-150" />
									<div>
										<div className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors">
											{title}
										</div>
										<div className="text-muted-foreground">{desc}</div>
									</div>
								</li>
							))}
						</ul>
					</div>

					{/* Form Section */}
					<div className="col-span-full lg:col-span-5 lg:col-start-8">
						<div className="bg-secondary/5 relative rounded-2xl p-8">
							<div className="space-y-6">
								<div>
									<label className="text-foreground mb-2 block text-sm font-medium">
										Email address
									</label>
									<input
										type="email"
										placeholder="you@awesome.dev"
										className="bg-background border-primary/10 focus:border-primary focus:ring-primary/10 w-full rounded-xl border px-4 py-3 text-lg transition duration-300 focus:ring-2 focus:outline-none"
									/>
								</div>

								<button
									type="submit"
									className="group bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl px-8 py-3 font-medium transition-colors">
									<span className="flex items-center justify-center gap-2">
										Subscribe
										<span className="transition-transform duration-300 group-hover:translate-x-1">
											→
										</span>
									</span>
								</button>

								<p className="text-muted-foreground text-center text-sm">
									Join thousands of developers getting better at their craft.
								</p>
							</div>

							{/* Decorative gradient */}
							<div className="from-primary/5 via-primary/10 absolute -inset-px -z-10 rounded-2xl bg-gradient-to-t to-transparent blur-sm" />
						</div>
					</div>
				</div>
			</main>
		</Container>
	)
}

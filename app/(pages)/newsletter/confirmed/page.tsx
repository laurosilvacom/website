import Link from 'next/link'

export default function Confirmed() {
	return (
		<div className="flex min-h-[80vh] items-center justify-center px-4">
			<div className="text-center">
				<div className="mb-8 flex justify-center">
					<div className="bg-primary/10 animate-bounce rounded-full p-6">
						<span className="text-6xl">🎉</span>
					</div>
				</div>

				<h1 className="mb-6 text-4xl font-bold tracking-tight">{`You're In!`}</h1>

				<div className="space-y-4"></div>
				<p className="text-muted-foreground mx-auto max-w-md text-lg">
					{`Thank you for subscribing! You'll receive fresh content directly in
					your inbox. No spam, ever.`}
				</p>

				<div className="pt-6">
					<Link
						href="/"
						className="text-primary hover:text-primary/90 inline-flex items-center gap-2 text-sm font-medium transition-colors">
						← Back to homepage
					</Link>
				</div>
			</div>
		</div>
	)
}

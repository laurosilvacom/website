export default function SubscribePending() {
	return (
		<div className="flex min-h-[80vh] items-center justify-center px-4">
			<div className="text-center">
				<div className="mb-8 flex justify-center">
					<div className="bg-primary/10 animate-bounce rounded-full p-6">
						<span className="text-6xl">📩</span>
					</div>
				</div>

				<h1 className="mb-6 text-4xl font-bold tracking-tight">
					Check Your Email
				</h1>

				<div className="space-y-4">
					<p className="text-muted-foreground mx-auto max-w-md text-lg">
						{`I've sent you a confirmation link. Please check your inbox and click
						the link to confirm your subscription.`}
					</p>
				</div>
			</div>
		</div>
	)
}

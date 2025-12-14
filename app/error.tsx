'use client'

type ErrorPageProps = {
	error: Error & {digest?: string}
	reset: () => void
}

export default function Error({error, reset}: ErrorPageProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center px-4">
			<div className="max-w-md text-center">
				<h1 className="mb-4 text-2xl font-semibold">Something went wrong</h1>
				<p className="text-muted-foreground mb-6 text-sm">
					{error.message || 'An unexpected error occurred'}
				</p>
				<button
					onClick={reset}
					className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
					Try again
				</button>
			</div>
		</div>
	)
}

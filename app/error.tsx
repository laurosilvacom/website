'use client'

import {Button} from '@/shared/ui/button'

type ErrorPageProps = {
	error: Error & {digest?: string}
	reset: () => void
}

export default function Error({error, reset}: ErrorPageProps) {
	return (
		<div className="flex min-h-96 flex-col items-center justify-center px-4">
			<div className="max-w-md text-center">
				<h1 className="text-lg font-normal">Something went wrong</h1>
				<p className="text-muted-foreground mt-2 text-sm">
					{error.message || 'An unexpected error occurred'}
				</p>
				<Button onClick={reset} className="mt-6" size="sm">
					Try again
				</Button>
			</div>
		</div>
	)
}

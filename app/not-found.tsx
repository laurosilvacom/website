import Link from 'next/link'
import Container from '@/components/container'

export default function NotFound() {
	return (
		<Container>
			<div className="flex min-h-[400px] flex-col items-center justify-center text-center">
				<h1 className="mb-4 text-4xl font-semibold">404</h1>
				<p className="text-muted-foreground mb-8 text-lg">
					Page not found
				</p>
				<Link
					href="/"
					className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
					Go home
				</Link>
			</div>
		</Container>
	)
}


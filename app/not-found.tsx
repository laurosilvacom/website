import Link from 'next/link'
import Container from '@/shared/components/container'

export default function NotFound() {
	return (
		<Container>
			<div className="flex min-h-96 flex-col items-center justify-center text-center">
				<h1 className="text-5xl font-extralight tracking-tight">404</h1>
				<p className="text-muted-foreground mt-4 text-sm">Page not found</p>
				<Link
					href="/"
					className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 rounded-md px-4 py-2 text-sm font-medium transition-colors">
					Go home
				</Link>
			</div>
		</Container>
	)
}

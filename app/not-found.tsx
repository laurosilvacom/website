import Link from 'next/link'
import Container from '@/shared/components/container'
import {Button} from '@/shared/ui/button'

export default function NotFound() {
	return (
		<Container>
			<div className="flex min-h-96 flex-col items-center justify-center text-center">
				<h1 className="text-5xl font-extralight tracking-tight">404</h1>
				<p className="text-muted-foreground mt-4 text-sm">Page not found</p>
				<Button asChild className="mt-8" size="sm">
					<Link href="/">Go home</Link>
				</Button>
			</div>
		</Container>
	)
}

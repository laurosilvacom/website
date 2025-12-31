import Link from 'next/link'
import Container from '@/components/container'
import {Button} from '@/components/ui/button'

type PageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function WorkshopNewsletterConfirmedPage({
	searchParams
}: PageProps) {
	const params = (await searchParams) || {}
	const status = typeof params.status === 'string' ? params.status : 'success'

	const title =
		status === 'success'
			? 'Subscription confirmed'
			: status === 'invalid'
				? 'Link expired'
				: 'Something went wrong'

	const description =
		status === 'success'
			? "You're now on the list. You'll receive updates soon."
			: status === 'invalid'
				? 'This confirmation link is invalid or has expired. Try signing up again.'
				: 'We could not confirm your subscription. Please try again.'

	return (
		<section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
			<Container width="narrow">
				<div className="space-y-6">
					<div className="space-y-3">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							{title}
						</h1>
						<p className="text-muted-foreground text-base leading-relaxed">
							{description}
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button asChild>
							<Link href="/workshops">Browse workshops</Link>
						</Button>
						<Button asChild variant="secondary">
							<Link href="/newsletter">Newsletter</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

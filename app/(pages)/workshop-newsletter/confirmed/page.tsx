import Link from 'next/link'
import Container from '@/shared/components/container'
import {CheckCircle, AlertCircle, XCircle} from 'lucide-react'
import {Button} from '@/shared/ui/button'

type PageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function WorkshopNewsletterConfirmedPage({searchParams}: PageProps) {
	const params = (await searchParams) || {}
	const status = typeof params.status === 'string' ? params.status : 'success'

	const content = {
		success: {
			title: "You're in!",
			description:
				'Check your inbox—your lessons are on the way. Reply to any email if you have questions.',
			icon: CheckCircle,
			iconClass: 'text-primary',
		},
		invalid: {
			title: 'Link expired',
			description:
				'This link has expired or was already used. Sign up again to get a fresh confirmation link.',
			icon: AlertCircle,
			iconClass: 'text-muted-foreground',
		},
		error: {
			title: 'Something went wrong',
			description:
				"We couldn't confirm your subscription. Please try again or reach out if the problem persists.",
			icon: XCircle,
			iconClass: 'text-destructive',
		},
	}

	const {
		title,
		description,
		icon: Icon,
		iconClass,
	} = content[status as keyof typeof content] || content.error

	return (
		<section className="pt-28 pb-12 lg:pt-32 lg:pb-16">
			<Container>
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Icon className={`size-8 ${iconClass}`} />
							<h1 className="type-page-title">
								{title}
							</h1>
						</div>
						<p className="type-page-intro">
							{description}
						</p>
					</div>

					{status === 'success' && (
						<p className="type-body-sm">
							You&apos;ll receive one lesson per day. Each builds on the last, so take
							your time and apply what you learn.
						</p>
					)}

					<div className="flex items-center gap-4">
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/workshops">Explore courses</Link>
						</Button>
						<Button asChild variant="link" size="sm" className="type-link-muted h-auto px-0">
							<Link href="/blog">Read the blog</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

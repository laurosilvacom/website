import Link from 'next/link'
import Container from '@/shared/components/container'
import {Button} from '@/shared/ui/button'
import {CheckCircle, AlertCircle, XCircle, Mail} from 'lucide-react'

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
			iconClass: 'text-green-500',
		},
		invalid: {
			title: 'Link expired',
			description:
				'This link has expired or was already used. Sign up again to get a fresh confirmation link.',
			icon: AlertCircle,
			iconClass: 'text-amber-500',
		},
		error: {
			title: 'Something went wrong',
			description:
				"We couldn't confirm your subscription. Please try again or reach out if the problem persists.",
			icon: XCircle,
			iconClass: 'text-red-500',
		},
	}

	const {
		title,
		description,
		icon: Icon,
		iconClass,
	} = content[status as keyof typeof content] || content.error

	return (
		<section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
			<Container width="narrow">
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Icon className={`h-8 w-8 ${iconClass}`} />
							<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
						</div>
						<p className="text-muted-foreground text-base leading-relaxed">
							{description}
						</p>
					</div>

					{status === 'success' && (
						<div className="bg-brand-blue/5 border-brand-blue/20 flex items-start gap-3 rounded-lg border p-4">
							<Mail className="text-brand-blue mt-0.5 h-5 w-5 shrink-0" />
							<p className="text-sm leading-relaxed">
								You'll receive one lesson per day. Each builds on the last, so take your
								time and apply what you learn.
							</p>
						</div>
					)}

					<div className="flex flex-wrap gap-3">
						<Button asChild>
							<Link href="/workshops">Explore courses</Link>
						</Button>
						<Button asChild variant="secondary">
							<Link href="/blog">Read the blog</Link>
						</Button>
					</div>
				</div>
			</Container>
		</section>
	)
}

import Link from 'next/link'
import Container from '@/shared/components/container'
import {CheckCircle, AlertCircle, XCircle} from 'lucide-react'

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
			<Container>
				<div className="space-y-6">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Icon className={`h-8 w-8 ${iconClass}`} />
							<h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
								{title}
							</h1>
						</div>
						<p className="text-muted-foreground text-base leading-relaxed">
							{description}
						</p>
					</div>

					{status === 'success' && (
						<p className="text-muted-foreground text-sm leading-relaxed">
							You&apos;ll receive one lesson per day. Each builds on the last, so take your
							time and apply what you learn.
						</p>
					)}

					<div className="flex items-center gap-4 text-sm">
						<Link href="/workshops" className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">Explore courses</Link>
						<Link href="/blog" className="text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">Read the blog</Link>
					</div>
				</div>
			</Container>
		</section>
	)
}

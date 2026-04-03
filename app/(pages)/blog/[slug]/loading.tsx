import Container from '@/shared/components/container'

export default function BlogPostLoading() {
	return (
		<section className="pt-32 pb-20 lg:pt-36">
			<Container>
				<div className="space-y-6">
					<div className="bg-muted h-4 w-32 animate-pulse rounded" />
					<div className="bg-muted h-12 w-full animate-pulse rounded" />
					<div className="bg-muted h-6 w-5/6 animate-pulse rounded" />
					<div className="bg-muted h-[280px] w-full animate-pulse rounded-2xl sm:h-[360px]" />
					<div className="space-y-3 pt-4">
						<div className="bg-muted h-5 w-full animate-pulse rounded" />
						<div className="bg-muted h-5 w-[92%] animate-pulse rounded" />
						<div className="bg-muted h-5 w-[88%] animate-pulse rounded" />
					</div>
				</div>
			</Container>
		</section>
	)
}

import {type BlogPost} from '@/lib/types'
import {Card} from '@/components/card'
import {TagFooter} from '@/components/tag-footer'
import {formatDate} from '@/lib/blog'

interface GroupedPosts {
	year: string
	months: {
		month: string
		monthName: string
		posts: BlogPost[]
	}[]
}

function groupPostsByDate(posts: BlogPost[]): GroupedPosts[] {
	const grouped: Record<string, Record<string, BlogPost[]>> = {}

	for (const post of posts) {
		const date = new Date(post.metadata.publishedAt)
		const year = date.getFullYear().toString()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const monthName = date.toLocaleDateString('en-us', {month: 'long'})

		if (!grouped[year]) {
			grouped[year] = {}
		}
		if (!grouped[year][month]) {
			grouped[year][month] = []
		}
		grouped[year][month].push(post)
	}

	return Object.keys(grouped)
		.sort((a, b) => Number(b) - Number(a))
		.map((year) => {
			const yearData = grouped[year]!
			return {
				year,
				months: Object.keys(yearData)
					.sort((a, b) => Number(b) - Number(a))
					.map((month) => ({
						month,
						monthName: new Date(`${year}-${month}-01`).toLocaleDateString(
							'en-us',
							{
								month: 'long'
							}
						),
						posts: yearData[month]!.sort(
							(a, b) =>
								new Date(b.metadata.publishedAt).getTime() -
								new Date(a.metadata.publishedAt).getTime()
						)
					}))
			}
		})
}

interface BlogPostsByDateProps {
	posts: BlogPost[]
}

export function BlogPostsByDate({posts}: BlogPostsByDateProps) {
	const grouped = groupPostsByDate(posts)

	if (posts.length === 0) {
		return (
			<div className="py-20 text-center">
				<h3 className="mb-2 text-xl font-semibold">No writing found</h3>
				<p className="text-muted-foreground text-base">
					No writing available at this time.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-20">
			{grouped.map(({year, months}) => (
				<div key={year} className="space-y-14">
					<h2 className="text-xl leading-tight font-semibold">{year}</h2>
					{months.map(({month, monthName, posts: monthPosts}) => (
						<div key={month} className="space-y-10">
							<h3 className="text-muted-foreground text-lg font-medium">
								{monthName}
							</h3>
							<div className="space-y-10">
								{monthPosts.map((post) => (
									<Card
										key={post.slug}
										href={`/blog/${post.slug}`}
										title={post.metadata.title}
										description={post.metadata.summary}
										date={formatDate(post.metadata.publishedAt, false)}
										footer={
											post.metadata.tags && post.metadata.tags.length > 0 ? (
												<TagFooter tags={post.metadata.tags} />
											) : undefined
										}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

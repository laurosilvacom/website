import {notFound} from 'next/navigation'
import {type Metadata} from 'next'
import {WorkshopLandingPage} from '@/features/workshop/components/workshop-landing-page'
import {createMetadata} from '@/shared/lib/metadata'
import {baseUrl} from '@/app/sitemap'
import {getWorkshopBySlug, getWorkshopSlugs} from '@/features/workshop/server'

export const revalidate = 30

interface Params {
	slug: string
}

interface Props {
	params: Promise<Params>
}

export async function generateStaticParams() {
	const slugs = await getWorkshopSlugs()
	return slugs.map((slug) => ({slug}))
}

export async function generateMetadata(props: Props): Promise<Metadata | null> {
	const params = await props.params
	if (!params || !params.slug) return null

	const workshop = await getWorkshopBySlug(params.slug)
	if (!workshop) return null

	const {title, shortDescription} = workshop

	return createMetadata({
		title,
		description: shortDescription || `Join the waitlist for ${title}`,
		canonical: `${baseUrl}/workshops/${params.slug}`,
		type: 'website',
	})
}

export default async function WorkshopPage({params}: Props) {
	const resolvedParams = await params
	const workshop = await getWorkshopBySlug(resolvedParams.slug)

	if (!workshop) {
		notFound()
	}

	return <WorkshopLandingPage workshop={workshop} />
}

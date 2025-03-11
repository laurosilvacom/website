import React from 'react'
import {getWorkshops} from '../../utils'
import {CertificateControls} from '@/components/certificate-controls'

export async function generateStaticParams() {
	const workshops = await getWorkshops()
	return workshops.map((workshop) => ({
		slug: workshop.slug
	}))
}

// Match exactly what's used in your lessons page
interface Props {
	params: Promise<{
		slug: string
	}>
}

export default async function CertificatePage(props: Props) {
	// Await the params to resolve the slug - exactly as done in other pages
	const params = await props.params

	const workshops = await getWorkshops()
	const workshop = workshops.find((w) => w.slug === params.slug)

	if (!workshop) {
		return <div>Workshop not found</div>
	}

	// Format today's date
	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	// Generate a certificate ID
	const certificateId = `${workshop.slug}-CERT-${params.slug.toUpperCase()}`

	return (
		<div className="bg-background min-h-screen py-12">
			<div className="mx-auto max-w-4xl px-4">
				<CertificateControls
					workshopTitle={workshop.metadata.title}
					certificateId={certificateId}
					formattedDate={formattedDate}
				/>
			</div>
		</div>
	)
}

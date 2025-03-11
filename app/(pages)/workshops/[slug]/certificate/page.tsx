import React from 'react'
import {getWorkshops} from '../../utils'
import {CertificateControls} from '@/components/certificate-controls'

export async function generateStaticParams() {
	const workshops = await getWorkshops()
	return workshops.map((workshop) => ({
		slug: workshop.slug
	}))
}

interface Props {
	params: {
		slug: string
	}
}

export default async function CertificatePage({params}: Props) {
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

	// Generate a certificate ID that won't change between server and client renders
	// Using workshop slug and a fixed string instead of Date.now()
	const certificateId = `${workshop.slug}-CERT-${params.slug.toUpperCase()}`

	return (
		<div className="bg-background min-h-screen py-12">
			<div className="mx-auto max-w-4xl px-4">
				{/* Using the client component for all interactive parts */}
				<CertificateControls
					workshopTitle={workshop.metadata.title}
					certificateId={certificateId}
					formattedDate={formattedDate}
				/>
			</div>
		</div>
	)
}

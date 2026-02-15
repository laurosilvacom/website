import Script from 'next/script'
import {baseUrl} from 'app/sitemap'

type StructuredDataProps = {
	type?: 'website' | 'article' | 'person' | 'breadcrumb'
	title?: string
	description?: string
	image?: string
	datePublished?: string
	dateModified?: string
	author?: string
	url?: string
	breadcrumbs?: Array<{name: string; url: string}>
}

export function StructuredData({
	type = 'website',
	title,
	description,
	image,
	datePublished,
	dateModified,
	author,
	url,
	breadcrumbs,
}: StructuredDataProps) {
	const getStructuredData = () => {
		const baseData = {
			'@context': 'https://schema.org',
		}

		switch (type) {
			case 'website':
				return {
					...baseData,
					'@type': 'WebSite',
					name: 'Lauro Silva',
					description:
						'Senior full-stack engineer and developer educator. I help companies ship better software and level up their engineering teams.',
					url: baseUrl,
					author: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl,
						jobTitle: 'Senior Full-Stack Engineer & Developer Educator',
						knowsAbout: [
							'Full-Stack Development',
							'Web Development',
							'JavaScript',
							'TypeScript',
							'React',
							'Next.js',
							'Node.js',
							'Developer Education',
							'Technical Consulting',
							'AI Integration',
						],
					},
					publisher: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl,
					},
					potentialAction: {
						'@type': 'SearchAction',
						target: {
							'@type': 'EntryPoint',
							urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
						},
						'query-input': 'required name=search_term_string',
					},
				}

			case 'article':
				return {
					...baseData,
					'@type': 'Article',
					headline: title,
					description: description,
					image: image ? [image] : undefined,
					datePublished: datePublished,
					dateModified: dateModified || datePublished,
					author: {
						'@type': 'Person',
						name: author || 'Lauro Silva',
						url: baseUrl,
					},
					publisher: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl,
					},
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': url || baseUrl,
					},
				}

			case 'person':
				return {
					...baseData,
					'@type': 'Person',
					name: 'Lauro Silva',
					url: baseUrl,
					jobTitle: 'Senior Full-Stack Engineer & Developer Educator',
					description:
						"Senior full-stack engineer and developer educator. I help companies ship better software and level up their engineering teams. Previously with Google, O'Reilly, Sentry, and HOKA.",
					knowsAbout: [
						'Full-Stack Development',
						'Web Development',
						'JavaScript',
						'TypeScript',
						'React',
						'Next.js',
						'Node.js',
						'Developer Education',
						'Technical Consulting',
						'Technical Writing',
						'AI Integration',
					],
					sameAs: [
						'https://github.com/laurosilvacom',
						'https://bsky.app/profile/laurosilva.com',
					],
				}

			case 'breadcrumb':
				return {
					...baseData,
					'@type': 'BreadcrumbList',
					itemListElement: breadcrumbs?.map((crumb, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: crumb.name,
						item: crumb.url,
					})),
				}

			default:
				return baseData
		}
	}

	const structuredData = getStructuredData()

	return (
		<Script
			id={`structured-data-${type}`}
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(structuredData, null, 2),
			}}
		/>
	)
}

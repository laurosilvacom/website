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
	breadcrumbs
}: StructuredDataProps) {
	const getStructuredData = () => {
		const baseData = {
			'@context': 'https://schema.org'
		}

		switch (type) {
			case 'website':
				return {
					...baseData,
					'@type': 'WebSite',
					name: 'Lauro Silva',
					description:
						'Learn, build, and grow as a developer. Deep technical insights mixed with real experiences.',
					url: baseUrl,
					author: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl,
						jobTitle: 'Software Engineer & Developer Educator',
						knowsAbout: [
							'Software Development',
							'Web Development',
							'JavaScript',
							'TypeScript',
							'React',
							'Next.js',
							'Developer Education'
						]
					},
					publisher: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl
					},
					potentialAction: {
						'@type': 'SearchAction',
						target: {
							'@type': 'EntryPoint',
							urlTemplate: `${baseUrl}/blog?q={search_term_string}`
						},
						'query-input': 'required name=search_term_string'
					}
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
						url: baseUrl
					},
					publisher: {
						'@type': 'Person',
						name: 'Lauro Silva',
						url: baseUrl
					},
					mainEntityOfPage: {
						'@type': 'WebPage',
						'@id': url || baseUrl
					}
				}

			case 'person':
				return {
					...baseData,
					'@type': 'Person',
					name: 'Lauro Silva',
					url: baseUrl,
					jobTitle: 'Software Engineer & Developer Educator',
					description:
						'Software Engineer and Developer Educator focused on helping developers learn, build, and grow.',
					knowsAbout: [
						'Software Development',
						'Web Development',
						'JavaScript',
						'TypeScript',
						'React',
						'Next.js',
						'Developer Education',
						'Technical Writing'
					],
					sameAs: [
						// Add your social media profiles here
						// 'https://twitter.com/yourusername',
						// 'https://github.com/yourusername',
						// 'https://linkedin.com/in/yourusername'
					]
				}

			case 'breadcrumb':
				return {
					...baseData,
					'@type': 'BreadcrumbList',
					itemListElement: breadcrumbs?.map((crumb, index) => ({
						'@type': 'ListItem',
						position: index + 1,
						name: crumb.name,
						item: crumb.url
					}))
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
				__html: JSON.stringify(structuredData, null, 2)
			}}
		/>
	)
}
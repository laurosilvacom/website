import {client} from '@/shared/integrations/sanity/client'
import {caseStudiesQuery, caseStudyBySlugQuery, allCaseStudySlugsQuery} from './queries'
import {type CaseStudy} from './domain'

type SanitySlugResult = {slug: string}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
	try {
		return await client.fetch<CaseStudy[]>(caseStudiesQuery)
	} catch (error) {
		console.error('Error fetching case studies from Sanity:', error)
		return []
	}
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
	try {
		return await client.fetch<CaseStudy | null>(caseStudyBySlugQuery, {slug})
	} catch (error) {
		console.error('Error fetching case study from Sanity:', error)
		return null
	}
}

export async function fetchCaseStudySlugs(): Promise<string[]> {
	try {
		const results = await client.fetch<SanitySlugResult[]>(allCaseStudySlugsQuery)
		return results.map((r) => r.slug).filter(Boolean)
	} catch (error) {
		console.error('Error fetching case study slugs from Sanity:', error)
		return []
	}
}

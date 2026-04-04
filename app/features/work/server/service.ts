import {cache} from 'react'
import {fetchCaseStudies, fetchCaseStudyBySlug, fetchCaseStudySlugs} from './repository'
import {type CaseStudy} from './domain'

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
	return fetchCaseStudies()
})

export const getCaseStudyBySlug = cache(
	async (slug: string): Promise<CaseStudy | null> => {
		return fetchCaseStudyBySlug(slug)
	},
)

export const getCaseStudySlugs = cache(async (): Promise<string[]> => {
	return fetchCaseStudySlugs()
})

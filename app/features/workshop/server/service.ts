import {cache} from 'react'
import {
	fetchAllModules,
	fetchModuleBySlug,
	fetchModules,
	fetchModulesSlugs,
} from './repository'
import {type Workshop} from './domain'

/**
 * Public, stable "workshop service" API used by pages and routes.
 */

/** Get all workshops. */
export const getAllWorkshops = cache(async (): Promise<Workshop[]> => {
	return fetchAllModules()
})

/** Get workshops (alias for getAllWorkshops). */
export const getWorkshops = cache(async (): Promise<Workshop[]> => {
	return fetchModules()
})

/** Get a single workshop by slug. */
export const getWorkshopBySlug = cache(async (slug: string): Promise<Workshop | null> => {
	return fetchModuleBySlug(slug)
})

/** Get all workshop slugs (for generateStaticParams). */
export const getWorkshopSlugs = cache(async (): Promise<string[]> => {
	return fetchModulesSlugs()
})

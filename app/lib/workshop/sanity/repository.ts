import {client} from '@/lib/sanity/client'
import {unstable_cache} from 'next/cache'
import {modulesQuery, moduleBySlugQuery, allModulesSlugsQuery} from './queries'
import {type Workshop} from '../domain'

type SanitySlugResult = {slug: string}

function cached<T>(
	fetcher: () => Promise<T>,
	key: string[],
	tags: string[]
): Promise<T> {
	return unstable_cache(fetcher, key, {
		tags,
		revalidate: 30
	})()
}

/** Fetch all workshops from Sanity. */
export async function fetchAllModules(): Promise<Workshop[]> {
	return cached(
		async () => {
			const modules = await client.fetch<Workshop[]>(modulesQuery)
			return modules
		},
		['workshops'],
		['workshops']
	)
}

/** Fetch workshops (alias for fetchAllModules). */
export async function fetchModules(): Promise<Workshop[]> {
	return fetchAllModules()
}

/** Fetch a single workshop by slug. */
export async function fetchModuleBySlug(
	slug: string
): Promise<Workshop | null> {
	return cached(
		async () => {
			const workshopData = await client.fetch<Workshop | null>(
				moduleBySlugQuery,
				{
					slug
				}
			)
			return workshopData
		},
		['workshop', slug],
		['workshops']
	)
}

/** Fetch all workshop slugs. */
export async function fetchModulesSlugs(): Promise<string[]> {
	return cached(
		async () => {
			const slugs = await client.fetch<SanitySlugResult[]>(allModulesSlugsQuery)
			return slugs.map((result) => result.slug)
		},
		['workshop-slugs'],
		['workshops']
	)
}

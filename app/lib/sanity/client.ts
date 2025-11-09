import {createClient} from '@sanity/client'

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ql7nlbjf',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion: '2024-01-01',
	token: process.env.SANITY_API_TOKEN
})


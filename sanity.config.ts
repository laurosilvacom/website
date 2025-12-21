import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
	name: 'default',
	title: 'Website Blog',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ql7nlbjf',
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	basePath: '/studio',
	plugins: [structureTool(), codeInput()],
	schema: {
		types: schemaTypes
	}
})

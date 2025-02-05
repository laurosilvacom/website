import {readFileSync, readdirSync, existsSync, mkdirSync} from 'fs'
import path from 'path'
import {type Workshop} from './types'

export async function getWorkshops(): Promise<Workshop[]> {
	const workshopsDirectory = path.join(
		process.cwd(),
		'app/(pages)/workshops/_content'
	)

	// Create directory if it doesn't exist
	if (!existsSync(workshopsDirectory)) {
		mkdirSync(workshopsDirectory, {recursive: true})
		return [] // Return empty array if no workshops exist yet
	}

	const workshopFolders = readdirSync(workshopsDirectory)

	// Return empty array if no workshops exist
	if (workshopFolders.length === 0) {
		return []
	}

	return workshopFolders
		.map((folder) => {
			const dataPath = path.join(workshopsDirectory, folder, 'data.json')
			const contentPath = path.join(workshopsDirectory, folder, 'content.mdx')

			const metadata = JSON.parse(readFileSync(dataPath, 'utf8'))
			const content = readFileSync(contentPath, 'utf8')

			return {
				slug: folder,
				metadata,
				content
			}
		})
		.sort(
			(a, b) =>
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
		)
}

export function formatDuration(duration: string) {
	return duration.replace(/(\d+):(\d+)/, '$1h $2m')
}

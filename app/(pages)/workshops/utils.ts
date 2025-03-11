import {readFileSync, readdirSync, existsSync, mkdirSync} from 'fs'
import path from 'path'
import {Lesson, LessonMetadata, Workshop} from './types'

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

export async function getWorkshopLessons(
	workshopSlug: string
): Promise<Lesson[]> {
	const lessonsDirectory = path.join(
		process.cwd(),
		`app/(pages)/workshops/_content/${workshopSlug}/lessons`
	)

	if (!existsSync(lessonsDirectory)) {
		return []
	}

	const lessonFiles = readdirSync(lessonsDirectory).filter((file) =>
		file.endsWith('.mdx')
	)

	return lessonFiles
		.map((file) => {
			const filePath = path.join(lessonsDirectory, file)
			const content = readFileSync(filePath, 'utf8')

			// Extract frontmatter
			const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
			const match = frontmatterRegex.exec(content)
			const metadata: Partial<LessonMetadata> = {}

			if (match && match[1]) {
				const frontmatterLines = match[1].trim().split('\n')
				frontmatterLines.forEach((line) => {
					const [key, ...valueParts] = line.split(': ')
					if (key && valueParts.length > 0) {
						const value = valueParts
							.join(': ')
							.trim()
							.replace(/^['"](.*)['"]$/, '$1')

						const trimmedKey = key.trim()

						// Only assign if it's a valid key in our LessonMetadata type
						if (
							trimmedKey === 'title' ||
							trimmedKey === 'number' ||
							trimmedKey === 'duration' ||
							trimmedKey === 'section'
						) {
							// Handle number type conversion for the number field
							if (trimmedKey === 'number') {
								metadata[trimmedKey] = parseInt(value, 10)
							} else {
								metadata[trimmedKey] = value
							}
						}
					}
				})
			}

			const lessonContent = content.replace(frontmatterRegex, '').trim()

			// Ensure all required properties are set with defaults if missing
			const fullMetadata: LessonMetadata = {
				title: metadata.title || 'Untitled Lesson',
				number: metadata.number || 0,
				duration: metadata.duration || '00:00',
				section: metadata.section || 'Uncategorized'
			}

			return {
				slug: path.basename(file, '.mdx'),
				metadata: fullMetadata,
				content: lessonContent
			}
		})
		.sort((a, b) => a.metadata.number - b.metadata.number)
}

export function formatDuration(duration: string): string {
	return duration.replace(/(\d+):(\d+)/, '$1h $2m')
}

import {promises as fs} from 'fs'
import path from 'path'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

type TutorialMetadata = {
	title: string
	publishedAt: string
	summary: string
	icon?: string
	image?: string
	videoUrl: string
	duration: string
	topics?: string[]
	difficulty?: Difficulty
}

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)
	if (!match || !match[1]) {
		throw new Error('Invalid frontmatter')
	}

	const frontMatterBlock = match[1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')
	const metadata: Partial<TutorialMetadata> = {}

	frontMatterLines.forEach((line) => {
		if (!line) return

		const [key, ...valueParts] = line.split(': ')
		if (!key || valueParts.length === 0) return

		const trimmedKey = key.trim()
		const value = valueParts.join(': ').trim()

		switch (trimmedKey) {
			case 'difficulty': {
				const cleanValue = value.replace(/['"]/g, '') as Difficulty
				if (['beginner', 'intermediate', 'advanced'].includes(cleanValue)) {
					metadata.difficulty = cleanValue
				}
				break
			}
			case 'topics': {
				metadata.topics = value
					.replace(/[\[\]'"]/g, '')
					.split(',')
					.map((topic) => topic.trim())
				break
			}
			default: {
				const cleanValue = value.replace(/^['"](.*)['"]$/, '$1')
				metadata[
					trimmedKey as keyof Omit<TutorialMetadata, 'difficulty' | 'topics'>
				] = cleanValue
			}
		}
	})

	if (
		!metadata.title ||
		!metadata.publishedAt ||
		!metadata.summary ||
		!metadata.videoUrl ||
		!metadata.duration
	) {
		throw new Error('Missing required frontmatter fields')
	}

	return {metadata: metadata as TutorialMetadata, content}
}

async function getMDXFiles(dir: string): Promise<string[]> {
	const files = await fs.readdir(dir)
	return files.filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
	const rawContent = await fs.readFile(filePath, 'utf-8')
	return parseFrontmatter(rawContent)
}

async function getMDXData(dir: string) {
	const mdxFiles = await getMDXFiles(dir)
	const mdxData = await Promise.all(
		mdxFiles.map(async (file) => {
			const {metadata, content} = await readMDXFile(path.join(dir, file))
			const slug = path.basename(file, path.extname(file))

			return {
				metadata,
				slug,
				content
			}
		})
	)
	return mdxData
}

export async function getTutorials() {
	return await getMDXData(
		path.join(process.cwd(), 'app', 'tutorials', 'lessons')
	)
}

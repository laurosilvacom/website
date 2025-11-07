import {promises as fs} from 'fs'
import path from 'path'
import {cache} from 'react'

type Metadata = {
	title: string
	publishedAt: string
	summary: string
	icon?: string
	coverImage?: string
	image?: string
	description?: string
	gradient?: [string, string] | string
	readingTime?: string
	tags?: string[]
}

type BlogPost = {
	metadata: Metadata
	slug: string
	content: string
}

export function extractTagsFromPosts(posts: BlogPost[]): string[] {
	const tagsSet = new Set<string>()

	for (const post of posts) {
		if (post.metadata.tags?.length) {
			for (const tag of post.metadata.tags) {
				tagsSet.add(tag)
			}
		}
	}

	return Array.from(tagsSet).sort()
}

function calculateReadingTime(content: string): string {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	const minutes = Math.ceil(words / wordsPerMinute)
	return `${minutes} min read`
}

function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)
	if (!match?.[1]) {
		throw new Error('Invalid frontmatter')
	}

	const frontMatterBlock = match[1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')
	const metadata: Partial<Metadata> = {}

	for (const line of frontMatterLines) {
		if (!line) continue

		const [key, ...valueParts] = line.split(': ')
		if (!key || !valueParts.length) continue

		const trimmedKey = key.trim()
		const value = valueParts.join(': ').trim()

		if (value.startsWith('[') && value.endsWith(']')) {
			try {
				const arrayString = value.replace(/'/g, '"')
				const parsedValue = JSON.parse(arrayString)
				if (trimmedKey === 'tags' && Array.isArray(parsedValue)) {
					metadata.tags = parsedValue as string[]
				} else {
					metadata[trimmedKey as keyof Metadata] = parsedValue
				}
			} catch {
				const cleanValue = value.slice(1, -1)
				const items = cleanValue.split(',').map(
					(item) => item.trim().replace(/^['"]|['"]$/g, '')
				)
				if (trimmedKey === 'tags') {
					metadata.tags = items
				}
			}
		} else {
			metadata[trimmedKey as keyof Metadata] = value.replace(
				/^['"](.*)['"]$/,
				'$1'
			) as any
		}
	}

	if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
		throw new Error('Missing required frontmatter fields')
	}

	return {metadata: metadata as Metadata, content}
}

const POSTS_PATH = path.join(process.cwd(), 'app/(pages)/blog/posts')

async function getMDXFiles(dir: string): Promise<string[]> {
	const files = await fs.readdir(dir)
	return files.filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
	const rawContent = await fs.readFile(filePath, 'utf-8')
	const {metadata, content} = parseFrontmatter(rawContent)
	metadata.readingTime = calculateReadingTime(content)
	return {metadata, content}
}

async function getMDXData(dir: string) {
	const mdxFiles = await getMDXFiles(dir)
	const mdxData = await Promise.all(
		mdxFiles.map(async (file) => {
			const {metadata, content} = await readMDXFile(path.join(dir, file))
			return {
				metadata,
				slug: path.basename(file, path.extname(file)),
				content
			}
		})
	)
	return mdxData
}

export const getBlogPosts = cache(async () => {
	return await getMDXData(POSTS_PATH)
})

export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date()
	const dateToUse = date.includes('T') ? date : `${date}T00:00:00`
	const targetDate = new Date(dateToUse)

	const diffTime = currentDate.getTime() - targetDate.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	let formattedDate = ''

	if (diffDays >= 365) {
		formattedDate = `${Math.floor(diffDays / 365)}y ago`
	} else if (diffDays >= 30) {
		formattedDate = `${Math.floor(diffDays / 30)}mo ago`
	} else if (diffDays > 0) {
		formattedDate = `${diffDays}d ago`
	} else {
		formattedDate = 'Today'
	}

	const fullDate = targetDate.toLocaleDateString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	})

	return includeRelative ? `${fullDate} (${formattedDate})` : fullDate
}

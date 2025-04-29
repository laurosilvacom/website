import {promises as fs} from 'fs'
import path from 'path'

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

	posts.forEach((post) => {
		if (post.metadata.tags && Array.isArray(post.metadata.tags)) {
			post.metadata.tags.forEach((tag: string) => tagsSet.add(tag))
		}
	})

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
	if (!match || !match[1]) {
		throw new Error('Invalid frontmatter')
	}

	const frontMatterBlock = match[1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')
	const metadata: Partial<Metadata> = {}

	frontMatterLines.forEach((line) => {
		if (!line) return

		const [key, ...valueParts] = line.split(': ')
		if (!key || valueParts.length === 0) return

		const trimmedKey = key.trim()
		const value = valueParts.join(': ').trim()

		// Handle arrays like tags: ['nextjs', 'seo', 'sanity']
		if (value.startsWith('[') && value.endsWith(']')) {
			try {
				// Parse the array using JSON.parse with proper string replacement
				const arrayString = value.replace(/'/g, '"') // Replace single quotes with double quotes

				// Use type assertion to tell TypeScript this is a valid assignment
				const parsedValue = JSON.parse(arrayString)
				if (trimmedKey === 'tags' && Array.isArray(parsedValue)) {
					metadata.tags = parsedValue as string[]
				} else {
					metadata[trimmedKey as keyof Metadata] = parsedValue
				}
			} catch (error) {
				// Fallback to simple string splitting if JSON parsing fails
				const cleanValue = value.substring(1, value.length - 1) // Remove [ and ]
				const items = cleanValue.split(',').map(
					(item) => item.trim().replace(/^['"]|['"]$/g, '') // Remove quotes
				)

				// Use specific type handling for known array fields
				if (trimmedKey === 'tags') {
					metadata.tags = items
				} else {
					// For other potential array fields, use a type assertion
					// @ts-expect-error - Handle other array types
					metadata[trimmedKey as keyof Metadata] = items
				}
			}
		} else {
			// Handle regular string values
			// @ts-expect-error - Allow string assignment
			metadata[trimmedKey as keyof Metadata] = value.replace(
				/^['"](.*)['"]$/,
				'$1'
			)
		}
	})

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

export async function getBlogPosts() {
	return await getMDXData(POSTS_PATH)
}

export function formatDate(date: string, includeRelative = false) {
	const currentDate = new Date()
	const dateToUse = date.includes('T') ? date : `${date}T00:00:00`
	const targetDate = new Date(dateToUse)

	const diffTime = currentDate.getTime() - targetDate.getTime()
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	let formattedDate = ''

	if (diffDays >= 365) {
		const yearsAgo = Math.floor(diffDays / 365)
		formattedDate = `${yearsAgo}y ago`
	} else if (diffDays >= 30) {
		const monthsAgo = Math.floor(diffDays / 30)
		formattedDate = `${monthsAgo}mo ago`
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

	if (!includeRelative) {
		return fullDate
	}

	return `${fullDate} (${formattedDate})`
}

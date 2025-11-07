import {promises as fs} from 'fs'
import path from 'path'
import {cache} from 'react'
import {type BlogPost, type BlogMetadata} from './types'

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
	const metadata: Partial<BlogMetadata> = {}

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
					metadata[trimmedKey as keyof BlogMetadata] = parsedValue
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
			metadata[trimmedKey as keyof BlogMetadata] = value.replace(
				/^['"](.*)['"]$/,
				'$1'
			) as any
		}
	}

	if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
		throw new Error('Missing required frontmatter fields')
	}

	return {metadata: metadata as BlogMetadata, content}
}

const POSTS_PATH = path.join(process.cwd(), 'app/(pages)/blog/posts')

/**
 * Recursively find all MDX files in a directory
 * Supports nested folder structures for better organization
 */
async function findMDXFiles(dir: string, baseDir: string = dir): Promise<string[]> {
	const files: string[] = []
	const entries = await fs.readdir(dir, {withFileTypes: true})

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name)

		// Skip drafts folder and node_modules
		if (entry.isDirectory()) {
			if (entry.name === 'drafts' || entry.name === 'node_modules') {
				continue
			}
			// Recursively search subdirectories
			const subFiles = await findMDXFiles(fullPath, baseDir)
			files.push(...subFiles)
		} else if (entry.isFile() && path.extname(entry.name) === '.mdx') {
			files.push(fullPath)
		}
	}

	return files
}

async function readMDXFile(filePath: string, baseDir: string) {
	try {
		const rawContent = await fs.readFile(filePath, 'utf-8')
		const {metadata, content} = parseFrontmatter(rawContent)
		metadata.readingTime = calculateReadingTime(content)

		const filename = path.basename(filePath, '.mdx')
		const slug = filename.toLowerCase()

		return {metadata, content, slug}
	} catch (error) {
		console.error(`Error reading MDX file ${filePath}:`, error)
		throw new Error(`Failed to read blog post: ${path.basename(filePath)}`)
	}
}

async function getMDXData(dir: string) {
	const mdxFiles = await findMDXFiles(dir, dir)
	const mdxData = await Promise.all(
		mdxFiles.map(async (file) => {
			const {metadata, content, slug} = await readMDXFile(file, dir)
			return {
				metadata,
				slug,
				content
			}
		})
	)
	return mdxData
}

/**
 * Get all blog posts (including drafts)
 */
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
	return await getMDXData(POSTS_PATH)
})

/**
 * Get only published blog posts (excludes drafts)
 * Drafts are posts in a 'drafts' folder or with draft: true in frontmatter
 */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
	const allPosts = await getAllBlogPosts()
	return allPosts.filter((post) => {
		// Filter out drafts based on frontmatter or folder structure
		// You can add `draft: true` to frontmatter to mark as draft
		const isDraft = (post.metadata as any).draft === true
		return !isDraft
	})
})

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

export function filterBlogPosts(
	posts: BlogPost[],
	options: {
		tagFilter?: string
		sortBy?: 'newest'
	}
): BlogPost[] {
	let filtered = [...posts]
	const {tagFilter = '', sortBy = 'newest'} = options

	if (tagFilter && tagFilter !== 'all') {
		filtered = filtered.filter((post) =>
			post.metadata.tags?.includes(tagFilter)
		)
	}

	if (sortBy === 'newest') {
		filtered.sort((a, b) => {
			return (
				new Date(b.metadata.publishedAt).getTime() -
				new Date(a.metadata.publishedAt).getTime()
			)
		})
	}

	return filtered
}

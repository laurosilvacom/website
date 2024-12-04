import {promises as fs} from 'fs'
import path from 'path'

type Metadata = {
	title: string
	publishedAt: string
	summary: string
	icon?: string
	image?: string
	description?: string
	gradient?: [string, string] | string
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

		if (trimmedKey === 'gradient') {
			// Parse gradient array from string like "['#FFF0F5', '#1c1415']"
			try {
				const gradientValue = JSON.parse(
					value.replace(/'/g, '"') // Replace single quotes with double quotes for JSON parsing
				) as [string, string]
				metadata[trimmedKey] = gradientValue
			} catch (e) {
				console.warn(`Failed to parse gradient value: ${value}`)
			}
		} else {
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

export async function getBlogPosts() {
	return await getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
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

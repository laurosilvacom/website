/**
 * Token-based Sanity migration: convert inline code to proper code blocks
 *
 * Usage:
 *   SANITY_API_TOKEN=sk... pnpm tsx scripts/fix-code-blocks.ts [--dry] [--threshold=0.7] [--only=my-post-slug]
 *
 * What it does:
 *   - Scans all `post` documents (optionally filter by --only=<slug>)
 *   - Detects paragraphs where most text spans are marked with `code`
 *   - Merges consecutive "code-like" paragraphs into a single code block
 *   - Auto-detects language (TypeScript/JS/Python/SQL/HTML/etc.)
 *   - Writes back to Sanity (unless --dry)
 */

import * as dotenv from 'dotenv'
import {createClient} from '@sanity/client'

dotenv.config({path: '.env.local'})
dotenv.config()

// ---------------------------- Types ----------------------------

type SpanChild = {
	_type: 'span'
	_key: string
	text: string
	marks?: string[]
}

type Block = {
	_type: 'block'
	_key: string
	style?: string
	children?: SpanChild[]
	markDefs?: any[]
}

type AnyContent = Block | {_type: string; _key: string; [k: string]: any}

type CodeBlock = {
	_type: 'code'
	_key: string
	language?: string
	code: string
}

// ------------------------- CLI Options -------------------------

type Options = {
	dryRun: boolean
	threshold: number
	onlySlug?: string
	includeDrafts: boolean
	limit?: number
}

function parseArgs(argv: string[]): Options {
	const opts: Options = {
		dryRun: argv.includes('--dry') || argv.includes('-d'),
		threshold: 0.7,
		includeDrafts: true
	}

	for (const arg of argv) {
		if (arg.startsWith('--threshold=')) {
			const n = Number(arg.split('=')[1])
			if (!Number.isNaN(n) && n >= 0 && n <= 1) {
				opts.threshold = n
			}
		} else if (arg.startsWith('--only=')) {
			opts.onlySlug = arg.split('=')[1]
		} else if (arg.startsWith('--limit=')) {
			const n = Number(arg.split('=')[1])
			if (!Number.isNaN(n) && n > 0) {
				opts.limit = n
			}
		}
	}

	return opts
}

const options = parseArgs(process.argv.slice(2))

// ------------------------- Sanity Client -----------------------

const PROJECT_ID =
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
	process.env.SANITY_PROJECT_ID ||
	'ql7nlbjf'
const DATASET =
	process.env.NEXT_PUBLIC_SANITY_DATASET ||
	process.env.SANITY_DATASET ||
	'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
	console.error('❌ Missing SANITY_API_TOKEN in environment.')
	process.exit(1)
}

const client = createClient({
	projectId: PROJECT_ID,
	dataset: DATASET,
	apiVersion: '2024-01-01',
	useCdn: false,
	token: TOKEN
})

// --------------------------- Helpers ---------------------------

function genKey() {
	return Math.random().toString(36).slice(2, 10)
}

function textLen(str: string) {
	// count non-whitespace characters for better ratio calc
	return (str || '').replace(/\s+/g, '').length
}

function isCodeLikeBlock(block: AnyContent, threshold: number): block is Block {
	if (!block || block._type !== 'block') return false
	if (!block.children || block.children.length === 0) return false

	let coded = 0
	let total = 0

	for (const child of block.children) {
		if (!child || child._type !== 'span') continue
		const len = textLen(child.text || '')
		if (len === 0) continue
		total += len
		const hasCode = Array.isArray(child.marks) && child.marks.includes('code')
		if (hasCode) coded += len
	}

	if (total === 0) return false

	const ratio = coded / total

	// Heuristic: treat as code when ratio is above threshold AND
	// the block has at least one non-trivial span
	return ratio >= threshold
}

function extractCodeFromBlock(block: Block): string {
	if (!block.children) return ''
	return block.children
		.map((c) => (c._type === 'span' ? c.text || '' : ''))
		.join('')
}

function detectLanguage(code: string): string {
	const src = code.toLowerCase()

	// quick hints
	const hasTs =
		/\binterface\b|\btype\s+\w+\s*=|:\s*(string|number|boolean|Record|Array|unknown|any|never|void)/.test(
			code
		)
	const hasImports = /\bimport\b/.test(src)
	const hasExport = /\bexport\b/.test(src)
	const hasJsStuff = /\bconst\b|\blet\b|\bfunction\b|\b=>\b/.test(src)
	const isSql = /\bselect\b.*\bfrom\b|\bupdate\b|\binsert\b|\bdelete\b/.test(
		src
	)
	const isHtml = /<\w+[^>]*>/.test(code) && /<\/\w+>/.test(code)
	const isCss = /{[^}]*:[^}]*;}/.test(code) && /;/.test(code) && !hasJsStuff
	const isBash =
		/^\s*(#+\!\/bin\/bash|echo\s+|curl\s+|npm\s+|pnpm\s+|yarn\s+|git\s+)/im.test(
			code
		)
	const isPy = /\bdef\s+\w+\(|\bimport\s+\w+|\bfrom\s+\w+\s+import\b/.test(src)

	if (isSql) return 'sql'
	if (isHtml) return 'html'
	if (isCss) return 'css'
	if (isBash) return 'bash'
	if (isPy) return 'python'
	if (hasImports || hasExport || hasJsStuff)
		return hasTs ? 'typescript' : 'javascript'

	// default to TS since your stack is TS-first
	return 'typescript'
}

function mergeBufferedCodeBlocks(buffer: Block[]): CodeBlock | null {
	if (buffer.length === 0) return null
	const code = buffer.map(extractCodeFromBlock).join('\n')
	return {
		_type: 'code',
		_key: genKey(),
		language: detectLanguage(code),
		code
	}
}

function convertContentArray(
	content: AnyContent[],
	threshold: number
): AnyContent[] {
	const out: AnyContent[] = []
	let buffer: Block[] = []

	const flush = () => {
		const merged = mergeBufferedCodeBlocks(buffer)
		if (merged) out.push(merged)
		buffer = []
	}

	for (const node of content) {
		// Preserve existing code blocks as-is and flush buffer first
		if (node._type === 'code') {
			flush()
			out.push(node)
			continue
		}

		// Non-block items (images, footnotes, custom objects)
		if (node._type !== 'block') {
			flush()
			out.push(node)
			continue
		}

		if (isCodeLikeBlock(node, threshold)) {
			buffer.push(node)
		} else {
			flush()
			out.push(node)
		}
	}

	flush()
	return out
}

// Pretty logging of a diff intent
function summarizeChanges(before: AnyContent[], after: AnyContent[]) {
	const countBeforeCode = before.filter((n) => n._type === 'code').length
	const countAfterCode = after.filter((n) => n._type === 'code').length
	return {beforeCodeBlocks: countBeforeCode, afterCodeBlocks: countAfterCode}
}

// --------------------------- Migration -------------------------

async function fetchPosts(
	limit?: number,
	onlySlug?: string,
	includeDrafts = true
) {
	const constraints = []
	if (!includeDrafts) constraints.push('!defined(draft) || draft == false')
	let filter = '*[_type == "post"'
	if (onlySlug) {
		filter += ` && slug.current == "${onlySlug}"`
	}
	if (constraints.length) {
		filter += ` && ${constraints.join(' && ')}`
	}
	filter += ']'

	const projection = `{
		_id,
		_rev,
		title,
		"slug": slug.current,
		content
	}`

	const order = '| order(publishedAt desc)'
	const limitExpr = limit ? ` [0...${limit}]` : ''

	const query = `${filter} ${order} ${projection}${limitExpr}`

	return client.fetch<any[]>(query)
}

async function migrate() {
	console.log('🚀 Running migration: inline code → code blocks')
	console.log(`📦 Project: ${PROJECT_ID}  Dataset: ${DATASET}`)
	console.log(
		`⚙️  Options: dry=${options.dryRun} threshold=${options.threshold} onlySlug=${options.onlySlug ?? '-'}`
	)

	const posts = await fetchPosts(
		options.limit,
		options.onlySlug,
		options.includeDrafts
	)

	if (!posts.length) {
		console.log('ℹ️  No posts found matching the criteria.')
		return
	}

	let updated = 0
	let skipped = 0

	for (const post of posts) {
		const id = post._id
		const title = post.title || id
		const content: AnyContent[] = Array.isArray(post.content)
			? post.content
			: []

		// Convert content
		const converted = convertContentArray(content, options.threshold)

		// Compare structurally
		const beforeJSON = JSON.stringify(content)
		const afterJSON = JSON.stringify(converted)

		if (beforeJSON === afterJSON) {
			console.log(`✅ ${title} — no changes needed`)
			skipped++
			continue
		}

		const summary = summarizeChanges(content, converted)
		console.log(
			`🔧 ${title} — code blocks: ${summary.beforeCodeBlocks} -> ${summary.afterCodeBlocks}`
		)

		if (options.dryRun) {
			console.log('   ⤷ dry-run: not writing changes')
			updated++
			continue
		}

		try {
			await client
				.patch(id)
				.set({content: converted})
				.commit({autoGenerateArrayKeys: true})
			console.log('   ⤷ ✅ updated')
			updated++
		} catch (err) {
			console.error('   ⤷ ❌ failed to update:', err)
		}
	}

	console.log('\n✨ Done')
	console.log(`   Updated: ${updated}`)
	console.log(`   Skipped: ${skipped}`)
}

migrate().catch((err) => {
	console.error('❌ Migration failed:', err)
	process.exit(1)
})

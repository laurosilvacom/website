/**
 * Sanity CLI-auth migration script: convert inline code to proper code blocks
 *
 * Run with Sanity CLI auth (no token needed):
 *   pnpm sanity exec website/scripts/fix-code-blocks-cli.ts --with-user-token
 *
 * Or with a package.json script:
 *   "migrate:code-blocks:cli": "sanity exec website/scripts/fix-code-blocks-cli.ts --with-user-token"
 *
 * Optional flags:
 *   --dry                 Dry-run (no writes)
 *   --threshold=0.7       Ratio (0..1) of code-marked text to consider a block "code-like"
 *   --only=my-post-slug   Only migrate a single post by slug
 *   --limit=10            Limit number of posts processed
 *   --published-only      Skip posts marked as draft
 */

import {getCliClient} from 'sanity/cli'

// ---------- Types ----------
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

type AnyContent = Block | {_type: string; _key?: string; [k: string]: any}

type CodeBlock = {
	_type: 'code'
	_key: string
	language?: string
	code: string
}

type Options = {
	dryRun: boolean
	threshold: number
	onlySlug?: string
	limit?: number
	publishedOnly: boolean
}

// ---------- CLI args ----------
function parseArgs(argv: string[]): Options {
	const opts: Options = {
		dryRun: argv.includes('--dry') || argv.includes('-d'),
		threshold: 0.7,
		publishedOnly: argv.includes('--published-only'),
	}

	for (const arg of argv) {
		if (arg.startsWith('--threshold=')) {
			const n = Number(arg.split('=')[1])
			if (!Number.isNaN(n) && n >= 0 && n <= 1) opts.threshold = n
		} else if (arg.startsWith('--only=')) {
			opts.onlySlug = arg.split('=')[1]
		} else if (arg.startsWith('--limit=')) {
			const n = Number(arg.split('=')[1])
			if (!Number.isNaN(n) && n > 0) opts.limit = n
		}
	}

	return opts
}

const options = parseArgs(process.argv.slice(2))

// ---------- Helpers ----------
const genKey = () => Math.random().toString(36).slice(2, 10)

const textLen = (str: string) => (str || '').replace(/\s+/g, '').length

function isCodeLikeBlock(block: AnyContent, threshold: number): block is Block {
	if (!block || block._type !== 'block') return false
	if (
		!Array.isArray((block as Block).children) ||
		(block as Block).children!.length === 0
	)
		return false

	let codeChars = 0
	let totalChars = 0

	for (const child of (block as Block).children!) {
		if (!child || child._type !== 'span') continue
		const len = textLen(child.text || '')
		if (len === 0) continue
		totalChars += len
		if (Array.isArray(child.marks) && child.marks.includes('code')) codeChars += len
	}

	if (totalChars === 0) return false
	return codeChars / totalChars >= threshold
}

const extractCodeFromBlock = (block: Block): string =>
	(block.children || [])
		.map((c) => (c && c._type === 'span' ? c.text || '' : ''))
		.join('')

function detectLanguage(code: string): string {
	const src = code.toLowerCase()

	const isSql = /\b(select|update|insert|delete)\b[\s\S]*\bfrom\b/i.test(src)
	const isHtml = /<\w+[^>]*>[\s\S]*<\/\w+>/.test(code)
	const isCss = /{[^}]+:[^}]+;}/.test(code) && !/\b(const|let|function|=>)\b/.test(src)
	const isBash =
		/^\s*(#\!\/bin\/bash|echo\s|curl\s|npm\s|pnpm\s|yarn\s|git\s)/im.test(code) ||
		/^\s*\$ /.test(code)
	const isPy = /\bdef\s+\w+\(|\bfrom\s+\w+\s+import\b|\bimport\s+\w+/.test(src)
	const hasTs =
		/\binterface\b|\btype\s+\w+\s*=|:\s*(string|number|boolean|Record|Array|unknown|any|never|void)/.test(
			code,
		)
	const hasJs =
		/\b(import|export|const|let|var|function|=>)\b/.test(src) ||
		/\brequire\(|module\.exports\b/.test(src)

	if (isSql) return 'sql'
	if (isHtml) return 'html'
	if (isCss) return 'css'
	if (isBash) return 'bash'
	if (isPy) return 'python'
	if (hasJs) return hasTs ? 'typescript' : 'javascript'
	return 'typescript'
}

function mergeBuffered(buffer: Block[]): CodeBlock | null {
	if (buffer.length === 0) return null
	const code = buffer.map(extractCodeFromBlock).join('\n')
	return {
		_type: 'code',
		_key: genKey(),
		language: detectLanguage(code),
		code,
	}
}

function convertContentArray(content: AnyContent[], threshold: number): AnyContent[] {
	const out: AnyContent[] = []
	let buf: Block[] = []

	const flush = () => {
		const merged = mergeBuffered(buf)
		if (merged) out.push(merged)
		buf = []
	}

	for (const node of content) {
		// Existing code blocks are preserved and also break buffering
		if (node._type === 'code') {
			flush()
			out.push(node)
			continue
		}

		// Non-blocks should not be merged with code; they break buffering
		if (node._type !== 'block') {
			flush()
			out.push(node)
			continue
		}

		if (isCodeLikeBlock(node, threshold)) {
			buf.push(node)
		} else {
			flush()
			out.push(node)
		}
	}

	flush()
	return out
}

function summarize(before: AnyContent[], after: AnyContent[]) {
	const b = before.filter((n) => n._type === 'code').length
	const a = after.filter((n) => n._type === 'code').length
	return {before: b, after: a, delta: a - b}
}

// ---------- Migration ----------
async function fetchPosts() {
	const constraints: string[] = []
	if (options.publishedOnly) constraints.push('(!defined(draft) || draft == false)')

	let filter = '*[_type == "post"'
	if (options.onlySlug) filter += ` && slug.current == "${options.onlySlug}"`
	if (constraints.length) filter += ` && ${constraints.join(' && ')}`
	filter += ']'

	const projection = `{
		_id,
		_rev,
		title,
		"slug": slug.current,
		content
	}`

	const order = '| order(publishedAt desc)'
	const limitExpr = options.limit ? ` [0...${options.limit}]` : ''

	const query = `${filter} ${order} ${projection}${limitExpr}`
	const client = getCliClient()
	return client.fetch<any[]>(query)
}

async function run() {
	const client = getCliClient()

	console.log('🚀 Sanity migration: inline code → proper code blocks')
	console.log(
		`⚙️  options: dry=${options.dryRun} threshold=${options.threshold} only=${options.onlySlug ?? '-'} limit=${options.limit ?? '-'} publishedOnly=${options.publishedOnly}`,
	)

	const posts = await fetchPosts()
	if (!posts.length) {
		console.log('ℹ️  No posts found matching the criteria.')
		return
	}

	let updated = 0
	let skipped = 0

	for (const post of posts) {
		const title = post.title || post.slug || post._id
		const content: AnyContent[] = Array.isArray(post.content) ? post.content : []

		const converted = convertContentArray(content, options.threshold)

		const before = JSON.stringify(content)
		const after = JSON.stringify(converted)

		if (before === after) {
			console.log(`✅ ${title} — no changes`)
			skipped++
			continue
		}

		const diff = summarize(content, converted)
		console.log(
			`🔧 ${title} — code blocks: ${diff.before} → ${diff.after} (Δ ${diff.delta})`,
		)

		if (options.dryRun) {
			console.log('   ⤷ dry-run, not writing')
			updated++
			continue
		}

		try {
			await client
				.patch(post._id)
				.set({content: converted})
				.commit({autoGenerateArrayKeys: true})

			console.log('   ⤷ ✅ updated')
			updated++
		} catch (err) {
			console.error('   ⤷ ❌ failed:', err)
		}
	}

	console.log('\n✨ Done')
	console.log(`   Updated: ${updated}`)
	console.log(`   Skipped: ${skipped}`)
}

run().catch((err) => {
	console.error('❌ Migration failed:', err)
	process.exit(1)
})

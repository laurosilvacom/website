import {groq} from 'next-sanity'
import {toHTML} from '@portabletext/to-html'
import {codeToHtml} from 'shiki'
import {client} from '@/shared/integrations/sanity/client'
import {urlForImage} from '@/shared/integrations/sanity/image'
import {
	type SanityEmailLessonPost,
	type SanityModule,
	type SanityModuleEmailLesson,
} from '@/shared/integrations/sanity/types'
import {
	WorkshopEmailLessonResolved,
	WorkshopEmailSequence,
	isLessonWithContent,
} from './types'

export const workshopEmailSequenceQuery = groq`
	*[_type == "module" && slug.current == $slug][0]{
		title,
		slug,
		image,
		testSequence,
		emailLessons[]{
			_key,
			subject,
			preheader,
			sendOffsetDays,
			post->{
				_id,
				title,
				summary,
				slug,
				content
			}
		}
	}
`

function resolveLesson(
	lesson: SanityModuleEmailLesson,
	index: number,
): WorkshopEmailLessonResolved | null {
	if (!isLessonWithContent(lesson)) return null
	const post = lesson.post

	const subject = lesson.subject?.trim() || post.title || `Lesson ${index + 1}`

	const sendOffsetDays =
		typeof lesson.sendOffsetDays === 'number' && lesson.sendOffsetDays >= 0
			? lesson.sendOffsetDays
			: index + 1

	return {
		key: lesson._key || post._id || `lesson-${index + 1}`,
		subject,
		preheader: lesson.preheader || post.summary,
		sendOffsetDays,
		content: post.content,
		summary: post.summary,
		postSlug: post.slug?.current,
	}
}

export async function fetchWorkshopEmailSequence(
	workshopSlug: string,
): Promise<WorkshopEmailSequence | null> {
	if (!workshopSlug) return null
	const workshop = await client.fetch<Pick<
		SanityModule,
		'title' | 'slug' | 'image' | 'emailLessons' | 'testSequence'
	> | null>(workshopEmailSequenceQuery, {slug: workshopSlug})

	if (!workshop?.emailLessons || workshop.emailLessons.length === 0) return null

	const lessons = workshop.emailLessons
		.map((lesson, index) => resolveLesson(lesson, index))
		.filter((lesson): lesson is WorkshopEmailLessonResolved => Boolean(lesson))

	if (lessons.length === 0) return null

	return {
		workshopTitle: workshop.title,
		workshopImage: workshop.image,
		slug: workshop.slug?.current || workshopSlug,
		isTest: Boolean(workshop.testSequence),
		lessons,
	}
}

function escapeHtml(input: string) {
	return input
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;')
}

/**
 * Pre-process content to highlight code blocks with Shiki.
 * Returns a map of code block keys to highlighted HTML.
 */
async function highlightCodeBlocks(content: any[]): Promise<Map<string, string>> {
	const highlighted = new Map<string, string>()

	for (let i = 0; i < content.length; i++) {
		const block = content[i]
		if (block._type === 'code' && typeof block.code === 'string') {
			const key = block._key || `code-${i}`
			const language = block.language || 'plaintext'
			try {
				// Use a dark theme that works well in emails
				const html = await codeToHtml(block.code, {
					lang: language,
					theme: 'github-dark',
				})
				// Extract just the code content and wrap with email-safe styles
				highlighted.set(key, html)
			} catch {
				// Fallback if language not supported
				highlighted.set(key, escapeHtml(block.code))
			}
		}
	}

	return highlighted
}

function getEmailPortableTextComponents(
	highlightedCode: Map<string, string> = new Map(),
) {
	return {
		types: {
			image: ({value}: any) => {
				try {
					const src = urlForImage(value).width(1200).fit('max').auto('format').url()
					const alt = typeof value?.alt === 'string' ? escapeHtml(value.alt) : ''
					const caption =
						typeof value?.caption === 'string' ? escapeHtml(value.caption) : ''

					return `
						<figure style="margin:24px 0 24px 0;">
							<img src="${src}" alt="${alt}" style="display:block;width:100%;height:auto;border-radius:12px;border:1px solid #e5e7eb;" />
							${caption ? `<figcaption style="margin:8px 0 0 0;font-size:12px;line-height:1.5;color:#6b7280;">${caption}</figcaption>` : ''}
						</figure>
					`
				} catch {
					return ''
				}
			},
			code: ({value}: any) => {
				const code = typeof value?.code === 'string' ? value.code : ''
				const language = typeof value?.language === 'string' ? value.language : ''
				const key = value?._key || ''

				// Use pre-highlighted code if available
				const highlightedHtml = highlightedCode.get(key)

				const languageLabel = language
					? `<div style="padding:10px 12px;background:#161b22;border-bottom:1px solid #30363d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;font-weight:600;color:#8b949e;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(language)}</div>`
					: ''

				if (highlightedHtml) {
					// Shiki outputs <pre> with its own background - strip it and use our wrapper
					// The output looks like: <pre class="shiki" style="background-color:#0d1117;..."><code>...</code></pre>
					const codeMatch = highlightedHtml.match(/<code[^>]*>([\s\S]*?)<\/code>/)
					const codeContent = codeMatch ? codeMatch[0] : highlightedHtml

					return `
						<div style="margin:24px 0 24px 0;border:1px solid #30363d;border-radius:8px;overflow:hidden;">
							${languageLabel}
							<pre style="margin:0;padding:16px;background:#0d1117;overflow:auto;line-height:1.6;font-size:13px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;">${codeContent}</pre>
						</div>
					`
				}

				// Fallback without highlighting
				const safeCode = escapeHtml(code)
				return `
					<div style="margin:24px 0 24px 0;border:1px solid #30363d;border-radius:8px;overflow:hidden;">
						${languageLabel}
						<pre style="margin:0;padding:16px;background:#0d1117;color:#c9d1d9;overflow:auto;white-space:pre;line-height:1.6;font-size:13px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;"><code>${safeCode}</code></pre>
					</div>
				`
			},
		},
		marks: {
			link: ({children, value}: any) => {
				const href = typeof value?.href === 'string' ? value.href : '#'
				const safeHref = escapeHtml(href)
				return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" style="color:#0070f3;text-decoration:underline;">${children}</a>`
			},
			code: ({children}: any) => {
				return `<code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:14px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;color:#0f172a;">${children}</code>`
			},
		},
		block: {
			normal: ({children}: any) =>
				`<p style="margin:0 0 16px 0;font-size:16px;line-height:1.7;color:#0f172a;">${children}</p>`,
			h2: ({children}: any) =>
				`<h2 style="margin:28px 0 12px 0;font-size:20px;line-height:1.3;color:#0f172a;">${children}</h2>`,
			h3: ({children}: any) =>
				`<h3 style="margin:24px 0 10px 0;font-size:18px;line-height:1.35;color:#0f172a;">${children}</h3>`,
			blockquote: ({children}: any) =>
				`<blockquote style="margin:20px 0;padding:12px 16px;border-left:4px solid #0070f3;background:#f8fafc;color:#0f172a;">${children}</blockquote>`,
		},
		list: {
			bullet: ({children}: any) =>
				`<ul style="margin:0 0 16px 22px;padding:0;">${children}</ul>`,
			number: ({children}: any) =>
				`<ol style="margin:0 0 16px 22px;padding:0;">${children}</ol>`,
		},
		listItem: {
			bullet: ({children}: any) =>
				`<li style="margin:0 0 8px 0;font-size:16px;line-height:1.7;color:#0f172a;">${children}</li>`,
			number: ({children}: any) =>
				`<li style="margin:0 0 8px 0;font-size:16px;line-height:1.7;color:#0f172a;">${children}</li>`,
		},
	}
}

export async function renderLessonHtml(params: {
	lesson: WorkshopEmailLessonResolved
	workshopTitle: string
	workshopImage?: SanityModule['image']
	lessonNumber?: number
	lessonCount?: number
	firstName?: string
	baseUrl?: string
}): Promise<string> {
	const greetingName = params.firstName ? ` ${params.firstName}` : ''

	// Pre-highlight code blocks
	const highlightedCode = await highlightCodeBlocks(params.lesson.content || [])

	const contentHtml = toHTML(params.lesson.content, {
		components: getEmailPortableTextComponents(highlightedCode),
	})
	const ctaUrl =
		params.baseUrl && params.lesson.postSlug
			? `${params.baseUrl}/blog/${params.lesson.postSlug}`
			: null

	const headerImageUrl = (() => {
		if (!params.workshopImage) return null
		try {
			return urlForImage(params.workshopImage)
				.width(1200)
				.height(630)
				.fit('crop')
				.auto('format')
				.url()
		} catch {
			return null
		}
	})()

	const headerImageAlt = (params.workshopImage?.alt || params.workshopTitle || '').trim()

	const lessonMeta =
		typeof params.lessonNumber === 'number' &&
		typeof params.lessonCount === 'number' &&
		params.lessonCount > 0
			? `Lesson ${params.lessonNumber} of ${params.lessonCount}`
			: null

	return `
		<!doctype html>
		<html lang="en">
			<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fb;color:#0f172a;">
				<span style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">
					${escapeHtml(params.lesson.preheader || params.lesson.summary || '')}
				</span>
				<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
					<tr>
						<td align="center" style="padding:32px 16px;">
							<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:720px;width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 12px 35px rgba(15,23,42,0.06);">
								${
									headerImageUrl
										? `
										<tr>
											<td style="padding:0;">
												<img src="${headerImageUrl}" alt="${escapeHtml(headerImageAlt)}" style="display:block;width:100%;height:auto;border:0;" />
											</td>
										</tr>
									`
										: ''
								}
								<tr>
									<td style="padding:32px;">
										<div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#475569;">${escapeHtml(params.workshopTitle)} · Email course${lessonMeta ? ` · ${escapeHtml(lessonMeta)}` : ''}</div>
										<h1 style="margin:14px 0 16px 0;font-size:28px;line-height:1.2;color:#0f172a;">${escapeHtml(params.lesson.subject)}</h1>
										<p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#0f172a;">Hey${escapeHtml(greetingName)},</p>
										<div style="font-size:16px;line-height:1.7;color:#0f172a;">${contentHtml}</div>
										${ctaUrl ? `<p style="margin:24px 0 0 0;"><a href="${escapeHtml(ctaUrl)}" style="display:inline-block;padding:12px 16px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;">Read on the site</a></p>` : ''}
									</td>
								</tr>
							</table>
							<div style="max-width:720px;margin:16px auto 0 auto;font-size:12px;line-height:1.5;color:#64748b;">You're enrolled in the ${escapeHtml(params.workshopTitle)} email course. Each lesson builds on the last—reply anytime, I read every message.</div>
						</td>
					</tr>
				</table>
			</body>
		</html>
	`
}

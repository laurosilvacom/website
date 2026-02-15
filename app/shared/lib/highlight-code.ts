import {codeToHtml} from 'shiki'

export async function highlightCode(code: string, language: string): Promise<string> {
	try {
		return await codeToHtml(code, {
			lang: language || 'plaintext',
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		})
	} catch (error) {
		console.error('Shiki highlighting failed:', error)
		// Fallback for unknown languages or errors
		return `<pre><code>${code}</code></pre>`
	}
}

import {baseUrl} from 'app/sitemap'

export default function robots() {
	const disallowForAll = ['/api/', '/admin/', '/_next/', '/private/', '/og']

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'GPTBot',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'ChatGPT-User',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'Google-Extended',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'CCBot',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'anthropic-ai',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'Claude-Web',
				allow: '/',
				disallow: disallowForAll,
			},
			{
				userAgent: 'ClaudeBot',
				allow: '/',
				disallow: disallowForAll,
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl,
	}
}

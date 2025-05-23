import {baseUrl} from 'app/sitemap'

export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: [
					'/api/',
					'/admin/',
					'/_next/',
					'/private/',
					'*.json',
					'/og',
					'/rss'
				]
			},
			{
				userAgent: 'GPTBot',
				disallow: '/'
			},
			{
				userAgent: 'ChatGPT-User',
				disallow: '/'
			},
			{
				userAgent: 'CCBot',
				disallow: '/'
			},
			{
				userAgent: 'anthropic-ai',
				disallow: '/'
			},
			{
				userAgent: 'Claude-Web',
				disallow: '/'
			}
		],
		sitemap: `${baseUrl}/sitemap.xml`,
		host: baseUrl
	}
}

import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = decodeURIComponent(
			url.searchParams.get('title') || 'Lauro Silva'
		)

		// Keep font loading
		const fontData = await fetch(
			new URL('/wotfard/Wotfard-SemiBold.ttf', request.url)
		).then((res) => res.arrayBuffer())

		return new ImageResponse(
			(
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'white',
						padding: '40px'
					}}>
					<div
						style={{
							display: 'flex',
							fontSize: '60px',
							fontFamily: 'Wotfard',
							letterSpacing: '-0.05em',
							color: '#333',
							padding: '40px'
						}}>
						{title}
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: 'Wotfard',
						data: fontData,
						style: 'normal',
						weight: 600
					}
				]
			}
		)
	} catch (e) {
		console.error('OG Error:', e)
		return new Response(`Failed to generate image: ${e.message}`, {
			status: 500
		})
	}
}

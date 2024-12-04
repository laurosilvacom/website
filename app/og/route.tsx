import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		// 1. Parse and prepare all URLs and data first
		const url = new URL(request.url)
		const baseUrl = `${url.protocol}//${url.host}`

		// 2. Get and decode parameters safely
		const title = decodeURIComponent(
			url.searchParams.get('title') || 'Lauro Silva'
		)
		const iconParam = url.searchParams.get('icon')
		const icon = iconParam ? decodeURIComponent(iconParam) : null
		const profileImage = `${baseUrl}/heroavatar.jpg`

		// 3. Load font
		const fontData = await fetch(
			new URL('/wotfard/Wotfard-SemiBold.ttf', request.url)
		).then((res) => res.arrayBuffer())

		// 4. Generate image response
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
					{icon && (
						<div style={{display: 'flex', marginBottom: '20px'}}>
							<img src={icon} alt="Post icon" width={48} height={48} />
						</div>
					)}

					<div
						style={{
							display: 'flex',
							fontSize: '60px',
							fontFamily: 'Wotfard',
							letterSpacing: '-0.05em',
							color: '#333',
							marginBottom: '20px'
						}}>
						{title}
					</div>

					<div style={{display: 'flex', alignItems: 'center'}}>
						<img src={profileImage} alt="Lauro Silva" width={40} height={40} />
						<span
							style={{
								marginLeft: '10px',
								fontFamily: 'Wotfard',
								color: '#666'
							}}>
							Lauro Silva
						</span>
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

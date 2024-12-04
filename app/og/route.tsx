import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = decodeURIComponent(
			url.searchParams.get('title') || 'Lauro Silva'
		)
		const icon = url.searchParams.get('icon')
		const baseUrl = `${url.protocol}//${url.host}`

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
					{/* Icon if available */}
					{icon && (
						<div style={{display: 'flex', marginBottom: '20px'}}>
							<img src={icon} alt="Post icon" width={48} height={48} />
						</div>
					)}

					{/* Title */}
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

					{/* Profile */}
					<div style={{display: 'flex', alignItems: 'center'}}>
						<img
							src={`${baseUrl}/heroavatar.jpg`}
							alt="Lauro Silva"
							width={40}
							height={40}
						/>
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

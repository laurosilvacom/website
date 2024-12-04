import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = decodeURIComponent(
			url.searchParams.get('title') || 'Lauro Silva'
		)
		const icon = decodeURIComponent(url.searchParams.get('icon') || '')
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
						backgroundColor: '#1E293B', // Deep blue background
						padding: '80px'
					}}>
					{/* Color bar at the top */}
					<div
						style={{
							display: 'flex',
							height: '8px',
							width: '100px',
							backgroundColor: '#FF6B6B',
							marginBottom: '60px',
							borderRadius: '4px'
						}}
					/>

					{/* Main content */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}>
						{icon && (
							<div
								style={{
									display: 'flex',
									backgroundColor: '#334155',
									padding: '16px',
									borderRadius: '16px',
									width: '80px',
									height: '80px',
									marginBottom: '40px'
								}}>
								<img src={icon} width={48} height={48} alt="Post icon" />
							</div>
						)}

						{/* Title */}
						<div
							style={{
								display: 'flex',
								color: 'white',
								fontSize: '72px',
								fontFamily: 'Wotfard',
								letterSpacing: '-0.05em',
								marginBottom: '60px',
								lineHeight: 1.1,
								width: '850px'
							}}>
							{title}
						</div>

						{/* Author section */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center'
							}}>
							<img
								src={`${baseUrl}/heroavatar.jpg`}
								width={54}
								height={54}
								alt="Lauro Silva"
								style={{
									borderRadius: '27px',
									marginRight: '16px'
								}}
							/>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									marginLeft: '8px'
								}}>
								<span
									style={{
										color: 'white',
										fontSize: '24px',
										fontFamily: 'Wotfard'
									}}>
									Lauro Silva
								</span>
								<span
									style={{
										color: '#94A3B8',
										fontSize: '18px',
										fontFamily: 'Wotfard'
									}}>
									laurosilvadevelopment.com
								</span>
							</div>
						</div>
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
		console.log(`${e.message}`)
		return new Response(`Failed to generate the image`, {
			status: 500
		})
	}
}

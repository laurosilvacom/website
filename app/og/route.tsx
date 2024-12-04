import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = decodeURIComponent(
			url.searchParams.get('title') || 'Lauro Silva'
		)
		const iconParam = url.searchParams.get('icon')
		const icon = iconParam ? decodeURIComponent(iconParam) : null

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
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#FAFAFA'
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							backgroundColor: 'white',
							padding: '56px',
							margin: '40px',
							borderRadius: '24px',
							boxShadow: '0 2px 40px rgba(0,0,0,0.1)',
							border: '2px solid #E2E8F0',
							width: '1000px'
						}}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: '32px'
							}}>
							{icon && (
								<div
									style={{
										display: 'flex',
										padding: '12px',
										backgroundColor: '#F8FAFC',
										borderRadius: '16px',
										border: '2px solid #E2E8F0'
									}}>
									<img src={icon} alt="Post icon" width={40} height={40} />
								</div>
							)}
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '40px'
							}}>
							<div
								style={{
									fontSize: '64px',
									fontFamily: 'Wotfard',
									letterSpacing: '-0.03em',
									color: '#1E293B',
									lineHeight: '1.1'
								}}>
								{title}
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								backgroundColor: '#F8FAFC',
								padding: '12px 16px',
								borderRadius: '12px',
								border: '2px solid #E2E8F0'
							}}>
							<img
								src="https://res.cloudinary.com/laurosilvacom/image/upload/v1733356380/laurosilvacom/lauro/kldqbcyrvtngub7fmutn.png"
								alt="Lauro Silva"
								width={44}
								height={44}
								style={{
									borderRadius: '22px',
									marginRight: '16px',
									border: '2px solid #E2E8F0'
								}}
							/>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<span
									style={{
										color: '#334155',
										fontSize: '20px',
										fontFamily: 'Wotfard'
									}}>
									Lauro Silva
								</span>
								<span
									style={{
										color: '#64748B',
										fontSize: '16px',
										fontFamily: 'Wotfard'
									}}>
									Software Engineer
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
		console.error('OG Error:', e)
		return new Response(`Failed to generate image: ${e.message}`, {
			status: 500
		})
	}
}

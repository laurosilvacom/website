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
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#FAFBFC'
					}}>
					{/* Main card */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							backgroundColor: 'white',
							padding: '50px 60px',
							margin: '20px',
							borderRadius: '24px',
							border: '2px solid #E2E8F0',
							boxShadow: '0 2px 40px rgba(0,0,0,0.08)',
							width: '1000px'
						}}>
						{/* Top section with icon */}
						{icon && (
							<div
								style={{
									display: 'flex',
									backgroundColor: '#F8FAFC',
									padding: '16px',
									borderRadius: '16px',
									marginBottom: '32px',
									border: '2px solid #E2E8F0'
								}}>
								<img src={icon} width={40} height={40} alt="Post icon" />
							</div>
						)}

						{/* Title section */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginBottom: '40px'
							}}>
							<div
								style={{
									fontSize: '68px',
									fontFamily: 'Wotfard',
									letterSpacing: '-0.03em',
									color: '#1A365D',
									lineHeight: '1.1',
									marginBottom: '8px'
								}}>
								{title}
							</div>
						</div>

						{/* Author section */}
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
								src={`${baseUrl}/heroavatar.jpg`}
								width={44}
								height={44}
								alt="Lauro Silva"
								style={{
									borderRadius: '22px',
									marginRight: '16px',
									border: '2px solid #E2E8F0'
								}}
							/>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<span
									style={{
										color: '#2D3748',
										fontSize: '20px',
										fontFamily: 'Wotfard'
									}}>
									Lauro Silva
								</span>
								<span
									style={{
										color: '#718096',
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
		console.log(`${e.message}`)
		return new Response(`Failed to generate the image`, {
			status: 500
		})
	}
}

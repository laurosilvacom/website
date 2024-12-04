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
						backgroundColor: '#FEF6F3'
					}}>
					{/* Main card with bigger padding for more "air" */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: 'white',
							padding: '68px',
							margin: '40px',
							borderRadius: '32px',
							boxShadow: '0 2px 40px rgba(0,0,0,0.08)',
							border: '3px solid #FFE5DB', // Playful border color
							width: '1000px'
						}}>
						{/* Icon section with fun background */}
						{icon && (
							<div
								style={{
									display: 'flex',
									marginBottom: '40px'
								}}>
								<div
									style={{
										display: 'flex',
										padding: '16px',
										backgroundColor: '#F4FAFF', // Cool background for contrast
										borderRadius: '20px',
										border: '3px solid #E6F0FF'
									}}>
									<img src={icon} alt="Post icon" width={48} height={48} />
								</div>
							</div>
						)}

						{/* Title with generous spacing */}
						<div
							style={{
								display: 'flex',
								marginBottom: '48px'
							}}>
							<div
								style={{
									fontSize: '68px',
									fontFamily: 'Wotfard',
									letterSpacing: '-0.03em',
									color: '#1A365D',
									lineHeight: '1.1'
								}}>
								{title}
							</div>
						</div>

						{/* Author card with playful style */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								backgroundColor: '#F9FAFB',
								padding: '16px 20px',
								borderRadius: '20px',
								border: '3px solid #EDF2F7',
								width: 'fit-content' // Make it wrap the content
							}}>
							<img
								src="https://res.cloudinary.com/laurosilvacom/image/upload/v1733356380/laurosilvacom/lauro/kldqbcyrvtngub7fmutn.png"
								alt="Lauro Silva"
								width={48}
								height={48}
								style={{
									borderRadius: '24px',
									marginRight: '16px',
									border: '3px solid #EDF2F7'
								}}
							/>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<span
									style={{
										color: '#2D3748',
										fontSize: '22px',
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
		console.error('OG Error:', e)
		return new Response(`Failed to generate image: ${e.message}`, {
			status: 500
		})
	}
}

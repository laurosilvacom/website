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
						backgroundColor: 'hsl(225, 25%, 97%)' // --background
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: 'hsl(225, 25%, 99%)', // --card
							padding: '68px',
							margin: '40px',
							borderRadius: '12px', // --radius
							boxShadow: '0 2px 40px rgba(0,0,0,0.08)',
							border: '2px solid hsl(225, 25%, 90%)', // --border
							width: '1000px'
						}}>
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
										backgroundColor: 'hsl(225, 25%, 95%)', // --secondary
										borderRadius: '12px',
										border: '2px solid hsl(225, 25%, 90%)' // --border
									}}>
									<img src={icon} alt="Post icon" width={48} height={48} />
								</div>
							</div>
						)}

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
									color: 'hsl(225, 25%, 20%)', // --foreground
									lineHeight: '1.1'
								}}>
								{title}
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								backgroundColor: 'hsl(225, 25%, 95%)', // --secondary
								padding: '16px 20px',
								borderRadius: '12px',
								border: '2px solid hsl(225, 25%, 90%)', // --border
								width: '320px'
							}}>
							<img
								src="https://res.cloudinary.com/laurosilvacom/image/upload/v1733356380/laurosilvacom/lauro/kldqbcyrvtngub7fmutn.png"
								alt="Lauro Silva"
								width={78}
								height={78}
								style={{
									borderRadius: '24px',
									marginRight: '16px',
									border: '2px solid hsl(225, 25%, 90%)' // --border
								}}
							/>
							<div style={{display: 'flex', flexDirection: 'column'}}>
								<span
									style={{
										color: 'hsl(225, 25%, 20%)', // --foreground
										fontSize: '22px',
										fontFamily: 'Wotfard'
									}}>
									Lauro Silva
								</span>
								<span
									style={{
										color: 'hsl(225, 25%, 40%)', // --muted-foreground
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

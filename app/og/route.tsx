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
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontFamily: 'Wotfard',
						background: '#FAFAFA'
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							background: 'white',
							padding: '60px',
							margin: '40px',
							borderRadius: '24px',
							boxShadow: '0 2px 40px rgba(0,0,0,0.1)',
							border: '2px solid rgba(0,0,0,0.1)',
							position: 'relative',
							maxWidth: '850px'
						}}>
						<div
							style={{
								position: 'absolute',
								top: '-15px',
								left: '-15px',
								width: '140px',
								height: '140px',
								background: 'linear-gradient(45deg, #FF6B6B, #ee5253)',
								borderRadius: '16px',
								transform: 'rotate(-15deg)',
								opacity: 0.1
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: '-20px',
								right: '-20px',
								width: '180px',
								height: '180px',
								background: 'linear-gradient(45deg, #4834d4, #686de0)',
								borderRadius: '20px',
								transform: 'rotate(15deg)',
								opacity: 0.1
							}}
						/>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '32px',
								position: 'relative',
								zIndex: 1
							}}>
							{icon && (
								<div
									style={{
										display: 'flex',
										padding: '12px',
										background: 'rgba(0,0,0,0.03)',
										borderRadius: '16px',
										width: 'fit-content'
									}}>
									<img
										src={icon}
										alt="Post icon"
										width={48}
										height={48}
										style={{
											objectFit: 'contain'
										}}
									/>
								</div>
							)}

							<div style={{display: 'flex'}}>
								<h1
									style={{
										margin: 0,
										fontSize: '72px',
										fontWeight: 600,
										color: '#16222A',
										letterSpacing: '-0.03em',
										lineHeight: 1.1
									}}>
									{title}
								</h1>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '12px'
								}}>
								<img
									src={`${baseUrl}/heroavatar.jpg`}
									alt="Lauro Silva"
									width={44}
									height={44}
									style={{
										borderRadius: '50%',
										border: '2px solid rgba(0,0,0,0.05)'
									}}
								/>
								<span
									style={{
										color: '#666',
										fontSize: '22px',
										letterSpacing: '-0.01em'
									}}>
									Lauro Silva
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

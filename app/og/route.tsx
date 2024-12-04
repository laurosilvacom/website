import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const title = url.searchParams.get('title') || 'Lauro Silva'

	// Load the font file directly using fetch
	const fontData = await fetch(
		new URL('/wotfard/Wotfard-SemiBold.ttf', request.url)
	).then((res) => res.arrayBuffer())

	return new ImageResponse(
		(
			<div
				style={{
					background: 'linear-gradient(130deg, #fff1f1 0%, #e8f2ff 100%)',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '40px',
					fontFamily: 'Wotfard'
				}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						background: 'white',
						padding: '60px',
						borderRadius: '24px',
						boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
						border: '2px solid rgba(0, 0, 0, 0.06)',
						position: 'relative',
						width: '90%',
						maxWidth: '900px'
					}}>
					{/* Decorative shapes */}
					<div
						style={{
							position: 'absolute',
							top: '-20px',
							left: '-40px',
							width: '80px',
							height: '80px',
							background: 'hsl(12, 90%, 63%)',
							borderRadius: '12px',
							transform: 'rotate(-20deg)',
							opacity: 0.8
						}}
					/>
					<div
						style={{
							position: 'absolute',
							bottom: '-30px',
							right: '-20px',
							width: '100px',
							height: '100px',
							background: 'hsl(260, 85%, 65%)',
							borderRadius: '16px',
							transform: 'rotate(15deg)',
							opacity: 0.6
						}}
					/>

					<div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
						<h1
							style={{
								margin: 0,
								fontSize: '68px',
								fontWeight: 600,
								color: '#333',
								letterSpacing: '-0.02em',
								lineHeight: 1.2,
								fontFamily: 'Wotfard'
							}}>
							{title}
						</h1>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px'
							}}>
							<img
								src="https://res.cloudinary.com/laurosilvacom/image/upload/v1733352657/laurosilvacom/lauro/v0apzla84d3xnux8u2pl.webp"
								alt="Lauro Silva"
								width={48}
								height={48}
								style={{
									borderRadius: '24px',
									border: '2px solid rgba(0, 0, 0, 0.06)'
								}}
							/>
							<span
								style={{
									color: '#666',
									fontSize: '24px',
									fontFamily: 'Wotfard'
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
}

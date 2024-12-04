import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const title = url.searchParams.get('title') || 'Lauro Silva'

	return new ImageResponse(
		(
			<div
				style={{
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative'
				}}>
				{/* Background gradient */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(130deg, #fff1f1 0%, #e8f2ff 100%)'
					}}
				/>

				{/* Content wrapper */}
				<div
					style={{
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
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

					{/* Main content */}
					<div
						style={{
							background: 'white',
							padding: '60px',
							borderRadius: '24px',
							boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
							border: '2px solid rgba(0, 0, 0, 0.06)'
						}}>
						<h1
							style={{
								margin: 0,
								fontSize: '68px',
								fontWeight: 'bold',
								color: '#333',
								letterSpacing: '-0.02em',
								lineHeight: 1.2
							}}>
							{title}
						</h1>

						<div
							style={{
								marginTop: '24px',
								display: 'flex',
								alignItems: 'center'
							}}>
							<span style={{fontSize: '32px', marginRight: '12px'}}>✨</span>
							<div
								style={{
									color: '#666',
									fontSize: '24px'
								}}>
								Lauro Silva
							</div>
						</div>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630
		}
	)
}

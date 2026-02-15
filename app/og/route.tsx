import {ImageResponse} from 'next/og'

export const runtime = 'edge'

// Convert OKLCH to approximate RGB for OG images
// Light mode: purple-tinted background
const bgLight = '#f5f3f8' // oklch(0.92 0.015 280) approximation
const cardLight = '#faf9fc' // oklch(0.95 0.012 280) approximation
const textLight = '#1a1625' // oklch(0.15 0.010 250) approximation
const primaryPurple = '#8b5cf6' // oklch(0.58 0.28 280) approximation
const mutedText = '#6b7280' // oklch(0.50 0.010 250) approximation

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = decodeURIComponent(url.searchParams.get('title') || 'Lauro Silva')

		// Load Bitter for headings (matches site - modern, bold, elegant serif)
		const fontData = await fetch(
			'https://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbeLIvQ.woff2',
		)
			.then((res) => res.arrayBuffer())
			.catch(() => null)

		return new ImageResponse(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					background: bgLight,
					fontFamily: 'system-ui, -apple-system, sans-serif',
				}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '900px',
						padding: '0 60px',
					}}>
					{/* Title - matches site h1 scale */}
					<div
						style={{
							display: 'flex',
							marginBottom: '40px',
						}}>
						<h1
							style={{
								fontSize: '48px',
								fontWeight: 600,
								letterSpacing: '-0.01em',
								color: textLight,
								lineHeight: '1.3',
								fontFamily: fontData ? 'Bitter' : 'Georgia, serif',
								margin: 0,
							}}>
							{title}
						</h1>
					</div>

					{/* Author section - minimal, spacing-based */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
							paddingTop: '32px',
							marginTop: '32px',
						}}>
						<div
							style={{
								width: '48px',
								height: '48px',
								borderRadius: '50%',
								backgroundColor: primaryPurple,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '20px',
								fontWeight: 600,
								color: '#ffffff',
								flexShrink: 0,
							}}>
							LS
						</div>
						<div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
							<span
								style={{
									color: textLight,
									fontSize: '18px',
									fontWeight: 600,
									letterSpacing: '-0.01em',
									lineHeight: '1.4',
									fontFamily: fontData ? 'Bitter' : 'Georgia, serif',
								}}>
								Lauro Silva
							</span>
							<span
								style={{
									color: mutedText,
									fontSize: '14px',
									fontWeight: 400,
									lineHeight: '1.5',
								}}>
								Software Engineer & Developer Educator
							</span>
						</div>
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: fontData
					? [
							{
								name: 'Bitter',
								data: fontData,
								style: 'normal',
								weight: 600,
							},
						]
					: [],
			},
		)
	} catch (e) {
		console.error('OG Error:', e)
		const message = e instanceof Error ? e.message : 'Unknown error'
		return new Response(`Failed to generate image: ${message}`, {
			status: 500,
		})
	}
}

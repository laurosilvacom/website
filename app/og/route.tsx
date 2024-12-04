import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = url.searchParams.get('title') || 'Lauro Silva'

		// Use Inter font from Google Fonts
		const interFont = await fetch(
			new URL(
				'https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap'
			)
		).then((res) => res.arrayBuffer())

		return new ImageResponse(
			(
				<div
					tw="flex w-full h-full items-center justify-center relative"
					style={{
						background:
							'linear-gradient(to bottom right, #fdfcfb 0%, #f9f7f7 100%)'
					}}>
					{/* ... rest of your components ... */}
					<div tw="flex flex-col px-12 py-8 bg-white/80 rounded-2xl border-2 backdrop-blur">
						<h1
							tw="text-6xl font-bold text-gray-800 tracking-tight"
							style={{
								fontFamily: 'Inter',
								textShadow: '0 2px 10px rgba(0,0,0,0.1)'
							}}>
							{title}
						</h1>
						<div tw="flex items-center mt-8">
							<div tw="ml-4" style={{fontFamily: 'Inter'}}>
								<p tw="text-xl text-gray-700">Lauro Silva</p>
								<p tw="text-gray-500">laurosilvadevelopment.com</p>
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
						name: 'Inter',
						data: interFont,
						style: 'normal',
						weight: 500
					}
				]
			}
		)
	} catch (error) {
		console.error(error)
		return new Response(`Failed to generate image: ${error.message}`, {
			status: 500
		})
	}
}

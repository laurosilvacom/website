import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const title = url.searchParams.get('title') || 'Lauro Silva'

		return new ImageResponse(
			(
				<div
					tw="flex w-full h-full items-center justify-center relative"
					style={{
						background:
							'linear-gradient(to bottom right, #fdfcfb 0%, #f9f7f7 100%)'
					}}>
					{/* Decorative elements */}
					<div
						tw="absolute top-0 right-0 w-[400px] h-[400px] opacity-50"
						style={{
							background:
								'radial-gradient(circle at center, hsl(12, 90%, 63%) 0%, transparent 70%)',
							filter: 'blur(100px)'
						}}
					/>
					<div
						tw="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-50"
						style={{
							background:
								'radial-gradient(circle at center, hsl(260, 85%, 65%) 0%, transparent 70%)',
							filter: 'blur(100px)'
						}}
					/>

					{/* Content container */}
					<div tw="flex flex-col relative z-10 max-w-4xl">
						{/* Small decorative shapes */}
						<div
							tw="absolute -top-8 -left-8 w-16 h-16 rotate-12 opacity-50"
							style={{background: 'hsl(12, 90%, 63%)'}}
						/>
						<div
							tw="absolute -bottom-8 -right-8 w-16 h-16 -rotate-12 opacity-50"
							style={{background: 'hsl(260, 85%, 65%)'}}
						/>

						{/* Main content */}
						<div tw="flex flex-col px-12 py-8 bg-white/80 rounded-2xl border-2 backdrop-blur">
							<h1 tw="text-6xl font-bold text-gray-800 tracking-tight">
								{title}
							</h1>

							{/* Author info */}
							<div tw="flex items-center mt-8">
								<div tw="ml-4">
									<p tw="text-xl text-gray-700">Lauro Silva</p>
									<p tw="text-gray-500">laurosilvadevelopment.com</p>
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
	} catch (error) {
		console.error(error)
		return new Response(`Failed to generate image: ${error.message}`, {
			status: 500
		})
	}
}

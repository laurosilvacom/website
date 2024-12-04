import {ImageResponse} from 'next/og'

export function GET(request: Request) {
	const url = new URL(request.url)
	const title = url.searchParams.get('title') || 'Lauro Silva'

	return new ImageResponse(
		(
			<div
				tw="flex w-full h-full items-center justify-center relative"
				style={{
					background: 'linear-gradient(to bottom right, white, #fafafa)'
				}}>
				{/* Gradient Orbs */}
				<div
					tw="absolute top-0 right-0 w-[400px] h-[400px] opacity-30"
					style={{
						background:
							'radial-gradient(circle at center, hsl(12, 90%, 63%) 0%, transparent 70%)',
						filter: 'blur(100px)'
					}}
				/>
				<div
					tw="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-30"
					style={{
						background:
							'radial-gradient(circle at center, hsl(260, 85%, 65%) 0%, transparent 70%)',
						filter: 'blur(100px)'
					}}
				/>

				{/* Main Container */}
				<div tw="flex relative z-10 w-full max-w-4xl px-20">
					{/* Decorative Elements */}
					<div tw="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-500/50 to-transparent" />

					{/* Content */}
					<div tw="flex flex-col">
						<div tw="text-[3.5rem] font-bold leading-tight tracking-tight text-gray-800">
							{title}
						</div>

						{/* Bottom Info */}
						<div tw="mt-8 flex items-center gap-2 text-gray-500">
							<span tw="font-medium">Lauro Silva</span>
							<span>•</span>
							<span>laurosilvadevelopment.com</span>
						</div>
					</div>
				</div>

				{/* Corner Accent */}
				<div
					tw="absolute bottom-0 right-0 w-32 h-32 opacity-40"
					style={{
						background:
							'linear-gradient(135deg, transparent 50%, hsl(12, 90%, 63%) 50%)'
					}}
				/>
			</div>
		),
		{
			width: 1200,
			height: 630
		}
	)
}

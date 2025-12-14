import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	images: {
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		qualities: [70, 75, 95],
		minimumCacheTTL: 31536000, // 1 year
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io'
			},
			{
				protocol: 'https',
				hostname: 'www.google.com'
			}
		]
	},
	experimental: {
		optimizePackageImports: [
			'lucide-react',
			'@radix-ui/react-dialog',
			'@radix-ui/react-dropdown-menu',
			'@radix-ui/react-tooltip',
			'@radix-ui/react-collapsible',
			'@radix-ui/react-select',
			'@radix-ui/react-separator',
			'@radix-ui/react-slot',
			'@radix-ui/react-progress'
		]
	},
	reactStrictMode: true,
	compress: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production'
	},
	typescript: {
		ignoreBuildErrors: false
	}
}

export default nextConfig

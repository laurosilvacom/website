import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
		],
		formats: ['image/avif', 'image/webp'],
		qualities: [70, 75, 95]
	},
	experimental: {
		optimizePackageImports: ['lucide-react']
	}
}

export default nextConfig

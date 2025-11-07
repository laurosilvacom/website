import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
		],
		formats: ['image/avif', 'image/webp']
	},
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		optimizePackageImports: ['lucide-react']
	}
}

export default nextConfig

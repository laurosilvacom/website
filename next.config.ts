import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com'
			}
		]
	},
	 transpilePackages: ["next-mdx-remote"]
}

export default nextConfig

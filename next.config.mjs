import createMDX from '@next/mdx'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '26s5nnor6zhqxavm.public.blob.vercel-storage.com',
        pathname: '/**',
      }
    ],
  },
  allowedDevOrigins: ['*'],
}

const withMDX = createMDX({
  options: { 
    remarkPlugins: [remarkMath], 
    rehypePlugins: [rehypeKatex],
    },
})

export default withMDX(nextConfig)

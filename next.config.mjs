import createMDX from '@next/mdx'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['26s5nnor6zhqxavm.public.blob.vercel-storage.com'],
  },
}

const withMDX = createMDX({
  // options: {
  //   remarkPlugins: [remarkMath],
  //   rehypePlugins: [rehypeKatex],
  // },
})

export default withMDX(nextConfig)

import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'
// Blog posts are dynamic routes (/blog/$slug) and aren't linked from any
// other page yet, so crawlLinks alone can't discover them. We read the
const blogSlugs = readdirSync('content/blog')
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''))
const config = defineConfig({
  base: '/mettavkarthik-portfolio/',
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      pages: [
        { path: '/' },
        { path: '/projects' },
        { path: '/resume' },
        { path: '/contact' },
        ...blogSlugs.map((slug) => ({ path: `/blog/${slug}` })),
      ],
    }),
    viteReact(),
  ],
})
export default config
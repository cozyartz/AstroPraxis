import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://astropraxis.cc', // Required for sitemap + SEO
  output: 'server', // Changed to server to support API routes
  adapter: node({
    mode: 'standalone'
  }),

  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap() // 🗺️ Auto-generates sitemap.xml from routes
  ],

  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  }
});

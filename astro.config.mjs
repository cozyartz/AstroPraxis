import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://astropraxis.cc', // Required for sitemap + SEO
  output: 'static',

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

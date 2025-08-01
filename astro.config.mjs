import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://astropraxis.cc', // Required for sitemap + SEO
  output: 'static', // Static output for Cloudflare Pages

  integrations: [
    tailwind(),
    mdx(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://astropraxis.cc/services',
        'https://astropraxis.cc/about',
        'https://astropraxis.cc/contact'
      ],
      // Add cross-references to related domains
      serialize(item) {
        if (item.url === 'https://astropraxis.cc/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        }
        return item;
      }
    }) // 🗺️ Auto-generates sitemap.xml from routes
  ],

  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  },

  // Enhanced SEO and performance
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'utils': ['date-fns', 'framer-motion']
          }
        }
      }
    }
  }
});

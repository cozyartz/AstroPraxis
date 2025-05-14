import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // ensures Astro builds as a static site (good for Cloudflare Pages)
  site: 'https://astropraxis.cc', // helps generate full URLs in RSS, sitemaps, etc.
});

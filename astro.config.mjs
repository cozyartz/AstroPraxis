import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static', // ensures compatibility with Cloudflare Pages
  site: 'https://astropraxis.cc', // required for canonical URLs, RSS, etc.
});

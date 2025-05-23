import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://astropraxis.cc',
  output: 'static',
  integrations: [
    tailwind(),
    mdx(),
    react()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  }
});

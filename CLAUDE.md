# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AstroPraxis Consulting Website** - A professional consulting site built with Astro 5.7.13, focusing on equity, systems strategy, and inclusive design services.

- **Primary Tech Stack**: Astro, React 19, TypeScript, Tailwind CSS
- **Deployment**: Cloudflare Pages via Wrangler CLI
- **Site URL**: https://astropraxis.cc

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build  

# Preview production build
npm run preview

# Deploy to Cloudflare Pages
npx wrangler pages deploy ./dist --project-name=astropraxis
```

## Architecture Overview

### Framework Configuration
- **Astro 5.7.13** with static output mode (`output: 'static'`)
- **React integration** for interactive components  
- **Content Collections** for type-safe content management
- **MDX support** for rich markdown content

### Content Management System
- **Case Studies**: `/src/content/case-studies/` - Markdown files with frontmatter schema
- **Services**: `/src/content/services/` - Markdown files + `/src/content/services.json` data
- **Navigation**: JSON-based hierarchical navigation with dropdown support in `/src/data/`

### Styling Architecture
- **Tailwind CSS 3.4.1** with custom dark theme configuration
- **Typography plugin** configured for dark theme prose styling
- **Custom animations** in `/public/styles/global.css` (rainbow gradient borders, fade-ins)
- **Framer Motion** for scroll-triggered animations

### Key Configuration Files
- `astro.config.mjs` - Astro configuration with integrations (Tailwind, MDX, React, Sitemap)
- `tailwind.config.cjs` - Custom Tailwind setup with typography, safelist includes 'hidden'
- `src/content/content.config.ts` - Content collection schemas for case studies and services
- `wrangler.toml` - Cloudflare Pages deployment configuration

### Special Features
- **Mobile Menu**: Custom JavaScript toggle with random FontAwesome icon selection (`/public/scripts/site.js`)
- **SEO Management**: SeoMeta component with integrated sitemap generation
- **Accessibility Focus**: ARIA labels, semantic HTML, ADA compliance emphasis
- **FontAwesome Pro**: Kit 8a91e67263 integrated throughout the site

### Directory Structure Notes
- `/public/images/` contains WebP format team member photos
- `/src/components/` houses reusable UI components
- `/src/layouts/` contains Astro layout templates
- Content collections use both markdown files and JSON data sources
- Build output goes to `/dist/` for Cloudflare Pages deployment

## Content Schema Requirements

When working with content collections:
- **Case Studies**: Require title, description, date, tags fields
- **Services**: Use structured data with categories and descriptions
- All content follows accessibility-first design principles
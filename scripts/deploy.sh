#!/bin/bash

echo "🚀 Deploying AstroPraxis to Cloudflare Pages..."
echo ""

# Build the site
echo "📦 Building site..."
npm run build

# Deploy to Cloudflare Pages using Wrangler
echo "☁️ Deploying to Cloudflare..."
npx wrangler pages deploy dist --project-name astropraxis

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔗 Your site features:"
echo "   • Modern glassmorphism design"
echo "   • Cosmic animations and effects"
echo "   • Cross-domain SEO to andreacozart.me & amylundin.me"
echo "   • Enhanced performance and accessibility"
echo "   • Mobile-optimized PWA capabilities"
echo ""
echo "📊 SEO Optimizations:"
echo "   • Structured data with team connections"
echo "   • Optimized meta tags and social sharing"
echo "   • Cross-domain rel=me relationships"
echo "   • Enhanced sitemap and robots.txt"
echo ""
echo "🎯 Next: Verify your deployment at https://astropraxis.cc"
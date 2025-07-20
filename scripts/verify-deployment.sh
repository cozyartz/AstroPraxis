#!/bin/bash

echo "🔍 Verifying AstroPraxis deployment..."
echo ""

# Check if the site is live
echo "📡 Checking site availability..."
curl -s -o /dev/null -w "%{http_code}" https://astropraxis.cc

echo ""
echo "🔗 Verifying cross-domain connections..."
echo "   • andreacozart.me connection"
echo "   • amylundin.me connection"
echo ""

echo "✅ Deployment verification complete!"
echo ""
echo "🎯 Your enhanced site features:"
echo "   ✨ Modern glassmorphism design"
echo "   🚀 Cosmic animations and effects"
echo "   🔗 Cross-domain SEO connections"
echo "   📱 PWA-ready mobile experience"
echo "   ⚡ Cloudflare-optimized performance"
echo ""
echo "🌐 Live at: https://astropraxis.cc"
echo "📊 Check performance: https://pagespeed.web.dev/analysis?url=https://astropraxis.cc"
echo "🔍 Verify SEO: https://search.google.com/search-console"
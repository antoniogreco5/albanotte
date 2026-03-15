# ALBANOTTE — Headless Shopify + Next.js

Italian-inspired specialty coffee. Roasted in Harrington Park, NJ.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add your Shopify Storefront API token to .env.local
npm run dev
```

## Deploy to Vercel

### Option 1: Via GitHub (recommended)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "ALBANOTTE initial build"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/albanotte.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your `albanotte` repo
4. Add environment variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = `albanotte.myshopify.com`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` = your token
5. Deploy

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts, add env vars when asked
```

### Connect Custom Domain

1. In Vercel dashboard → your project → Settings → Domains
2. Add `albanotte.com`
3. Update DNS records as Vercel instructs

## Shopify Admin Checklist

Before the site pulls real data:

- [ ] Create all 6 coffee products with grind variants (Whole Bean, Drip, French Press, Espresso, Pour Over)
- [ ] Set pricing ($22/bag)
- [ ] Upload product images (label shots + bag mockups)
- [ ] Create "Coffee" collection, add all 6 blends
- [ ] Create metafield definitions: `custom.tasting_notes`, `custom.origin`, `custom.roast_level`, `custom.blend_color`
- [ ] Fill in metafields on each product
- [ ] Set up shipping rates / free shipping at $40
- [ ] Create a Storefront API access token (Settings → Apps → Develop apps)
- [ ] Set up Shopify webhook pointing to `https://albanotte.com/api/revalidate`

## Stack

- **Next.js 14** (App Router) on **Vercel**
- **Tailwind CSS** with custom design tokens
- **Shopify Storefront API** (GraphQL)
- **Framer Motion** + **Lenis** smooth scroll
- **TypeScript** throughout

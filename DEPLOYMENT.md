# The Ink Bureau — Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A [Vercel](https://vercel.com) account (free tier works)
- Git repository (GitHub, GitLab, or Bitbucket)

---

## Local Development

```bash
# 1. Navigate to the project directory
cd ink-bureau

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

## Production Build (local test)

```bash
npm run build
npm run start
```

Confirm all pages render at:
- http://localhost:3000 — Home
- http://localhost:3000/services — Services
- http://localhost:3000/blog — Blog
- http://localhost:3000/blog/what-makes-a-great-long-form-article-in-2026
- http://localhost:3000/blog/the-anatomy-of-a-compelling-short-story
- http://localhost:3000/blog/why-human-written-content-still-wins-against-ai
- http://localhost:3000/about — About
- http://localhost:3000/contact — Contact
- http://localhost:3000/privacy-policy — Privacy Policy
- http://localhost:3000/terms — Terms & Conditions
- http://localhost:3000/disclaimer — Disclaimer
- http://localhost:3000/sitemap.xml — Sitemap
- http://localhost:3000/robots.txt — Robots

---

## Deploying to Vercel

### Option A: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. From the ink-bureau directory, run:
vercel

# 3. Follow the prompts:
#    - Log in to your Vercel account
#    - Confirm project settings (Next.js detected automatically)
#    - Deploy

# 4. For production deployment:
vercel --prod
```

### Option B: Vercel Dashboard (Git Integration)

1. Push your repository to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **"Import Git Repository"**
4. Select your repository
5. Vercel will auto-detect Next.js — no configuration needed
6. Click **Deploy**
7. Vercel assigns a `.vercel.app` URL automatically

---

## Environment Variables

No environment variables are required for the base deployment. If you later add:
- A real contact form backend (e.g., Resend, Formspree): add `EMAIL_API_KEY`
- Analytics (e.g., Plausible, Fathom): add the script via layout.tsx
- Google AdSense: add your publisher ID to `NEXT_PUBLIC_ADSENSE_ID`

Set environment variables in Vercel Dashboard → Project → Settings → Environment Variables.

---

## Custom Domain Setup

1. In Vercel Dashboard → Project → Settings → Domains
2. Click **"Add Domain"**
3. Enter your domain (e.g., `theinkbureau.com`)
4. Update your DNS records as instructed by Vercel:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or update A records to Vercel's IPs
5. SSL/HTTPS is handled automatically by Vercel

---

## Google AdSense Setup

1. Apply for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Verify your site is approved (Privacy Policy, Terms, and Disclaimer pages are already in place)
3. Once approved, replace the `.ad-zone` placeholder `<div>` elements with actual AdSense `<ins>` tags:

**Ad zones are pre-built at:**
- Home page: Between hero and services sections
- Blog post pages: After article content (in-content ad)
- Blog post pages: Right sidebar (300×600, desktop only)

**To add AdSense code:**
```tsx
// Replace ad-zone divs with:
<ins
  className="adsbygoogle"
  style={{ display: "block" }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

Add the AdSense script to `src/app/layout.tsx`:
```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
/>
```

---

## Adding New Blog Posts

1. Create a new `.mdx` file in `content/blog/`:
   ```
   content/blog/your-post-slug.mdx
   ```

2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Post Title"
   description: "A brief description for SEO (150-160 chars)"
   date: "2026-06-01"
   category: "Writing Tips"  # Articles | Stories | Writing Tips | Behind the Craft
   author: "The Ink Bureau Team"
   excerpt: "First 1-2 sentences of the post..."
   featuredImage: "/images/your-image.svg"
   tags: ["tag1", "tag2"]
   keyTakeaways:
     - "First takeaway"
     - "Second takeaway"
   ---
   ```

3. Write your post content below the frontmatter in Markdown/MDX

4. Add a featured image SVG to `public/images/`

5. Run `npm run build` to verify, then deploy

---

## Performance Optimization Notes

- All images use Next.js `<Image>` component with lazy loading
- All pages are statically generated at build time
- Google Fonts (Playfair Display + Inter) are self-hosted via `next/font/google`
- Tailwind CSS v4 generates minimal CSS (only used utilities)
- No JavaScript-heavy dependencies on static pages

---

## SEO Checklist (Post-Deployment)

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt is accessible: `https://yourdomain.com/robots.txt`
- [ ] Set up Google Analytics or privacy-friendly analytics
- [ ] Apply for Google AdSense (Privacy Policy page is ready)
- [ ] Verify Open Graph tags using [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Test structured data using [Google's Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Run PageSpeed Insights: [pagespeed.web.dev](https://pagespeed.web.dev)

---

## Tech Stack Summary

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Blog System | MDX (file-based) + next-mdx-remote |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Deployment | Vercel |
| SEO | Built-in Next.js Metadata API + JSON-LD schemas |

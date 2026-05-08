# The Quill Draft — Deployment Guide (Netlify)

## Overview

This site deploys to Netlify using the `@netlify/plugin-nextjs` plugin.
All configuration is in `netlify.toml`.

---

## Prerequisites

- Complete the `SETUP.md` guide (Supabase project + database + API keys)
- A GitHub account with this repository pushed

---

## Step 1: Push to GitHub

If the code isn't already on GitHub:

```bash
git add .
git commit -m "Initial Quill Draft build"
git push origin main
```

---

## Step 2: Create a Netlify Site

1. Go to https://app.netlify.com and sign in
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** and authorize Netlify
4. Find and select your `verified-agent-identity` repository
5. Configure build settings:
   - **Branch to deploy**: `main` (or your target branch)
   - **Base directory**: `quill-draft` ← IMPORTANT: set this to the subfolder
   - **Build command**: `npm run build`
   - **Publish directory**: `quill-draft/.next`

   > Note: If you're using a separate clean branch with only the `quill-draft` files at root, leave Base directory blank.

6. Click **Deploy site** — the first deploy will likely fail because env vars aren't set yet. That's expected.

---

## Step 3: Set Environment Variables in Netlify

1. In your Netlify site dashboard, go to **Site configuration** → **Environment variables**
2. Click **Add a variable** for each:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key-here` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key-here` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-site-name.netlify.app` |

3. After adding all variables, go to **Deploys** and click **Trigger deploy** → **Deploy site**

---

## Step 4: Update Site URL

Once Netlify gives you a URL (e.g. `https://thequilldraft.netlify.app`):

1. Update the `NEXT_PUBLIC_SITE_URL` environment variable in Netlify to match your actual URL
2. Trigger a new deploy

You can also set a custom domain:
1. Go to **Domain management** → **Add custom domain**
2. Follow Netlify's DNS setup instructions

---

## Step 5: Update Supabase Auth Settings

1. In Supabase, go to **Authentication** → **URL Configuration**
2. Add your Netlify URL to **Site URL**: `https://your-site.netlify.app`
3. Add to **Redirect URLs**: `https://your-site.netlify.app/admin`

---

## Deploying Updates

Any push to your deployment branch will trigger a new Netlify deploy automatically.

Or manually: Netlify dashboard → **Deploys** → **Trigger deploy**

---

## Troubleshooting

**Build fails with "Supabase URL required"**
→ Check that all 3 environment variables are set in Netlify

**Admin login redirects loop**
→ Make sure `NEXT_PUBLIC_SITE_URL` is set to your live URL (not localhost)

**Images not uploading**
→ Make sure the `post-images` Supabase storage bucket is public and service role policies are set

**404 on dynamic routes**
→ The `@netlify/plugin-nextjs` plugin handles this. Make sure `netlify.toml` is at the project root.

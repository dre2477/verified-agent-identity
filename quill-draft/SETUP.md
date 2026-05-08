# The Quill Draft — Setup Guide

## Prerequisites
- Node.js 18+ installed
- A free Supabase account at https://supabase.com
- A Netlify account at https://netlify.com

---

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click **New Project**
3. Choose your organization, enter a project name (e.g. "quill-draft"), and set a strong database password
4. Choose a region close to your users
5. Click **Create new project** — wait ~2 minutes for it to provision

---

## Step 2: Create the Database Tables

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New Query** and paste the following SQL, then click **Run**:

```sql
-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  featured_image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  read_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (read access for published posts)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon USING (true);

-- Service role has full access (used by admin API routes)
CREATE POLICY "Service role full access to posts"
  ON posts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to categories"
  ON categories FOR ALL
  USING (auth.role() = 'service_role');
```

3. You should see "Success. No rows returned" — that means it worked.

---

## Step 3: Create the Image Storage Bucket

1. In Supabase, click **Storage** in the left sidebar
2. Click **New bucket**
3. Name it exactly: `post-images`
4. Check **Public bucket** (so images can be displayed publicly)
5. Click **Create bucket**
6. Click on the `post-images` bucket, then go to **Policies**
7. Click **New Policy** → **For full customization**
8. Create this policy:
   - Policy name: `Public read`
   - Allowed operation: `SELECT`
   - Target roles: `anon, authenticated`
   - Policy definition: `true`
9. Create another policy for uploads:
   - Policy name: `Service role can upload`
   - Allowed operation: `INSERT`
   - Target roles: leave blank (applies to service role via API)
   - Policy definition: `true`

---

## Step 4: Get Your API Keys

1. In Supabase, click **Project Settings** (gear icon) → **API**
2. Copy these three values:
   - **Project URL** (e.g. `https://abcdef.supabase.co`)
   - **anon public** key (under Project API Keys)
   - **service_role** key (under Project API Keys — keep this secret!)

---

## Step 5: Create Your Admin User

1. In Supabase, click **Authentication** → **Users**
2. Click **Invite user** (or **Add user** → **Create new user**)
3. Enter your email and a strong password
4. This will be your admin login credentials

---

## Step 6: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

---

## Step 7: Install and Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

To access the admin:
- Go to http://localhost:3000/admin
- You'll be redirected to `/admin/login`
- Sign in with the email and password you created in Step 5

---

## How to Write a Blog Post (Admin Guide)

1. Go to `/admin` and sign in
2. Click **+ New Post** (top right) or **New Post** in the sidebar
3. Enter your post title in the title field
4. Write your content in the TipTap editor:
   - Use **H1/H2/H3** buttons for headings
   - **B** for bold, **I** for italic
   - Use the image button (🖼) to upload a featured image from your computer
   - Use the link button (🔗) to add hyperlinks
5. In the right sidebar:
   - Select a **Category** (or go to Categories to create one first)
   - Add an **Excerpt** (shown on blog listing pages)
   - Upload a **Featured Image** (shown as the card thumbnail)
6. Click **Save Draft** to save without publishing
7. Click **Publish** to make it live immediately
8. Once published, click **View live →** to see it on the site

---

## Seeding Test Categories (Optional)

Run this SQL in Supabase SQL Editor to add sample categories:

```sql
INSERT INTO categories (name, slug) VALUES
  ('Technology', 'technology'),
  ('Culture', 'culture'),
  ('Science', 'science'),
  ('Writing', 'writing'),
  ('Philosophy', 'philosophy');
```

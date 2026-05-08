import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();

  const { data: rawPosts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published");

  const { data: rawCategories } = await supabase.from("categories").select("slug, created_at");

  const posts = (rawPosts ?? []) as unknown as { slug: string; updated_at: string }[];
  const categories = (rawCategories ?? []) as unknown as { slug: string; created_at: string }[];

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map(c => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date(c.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}

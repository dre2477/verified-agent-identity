export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import PostCard from "@/components/PostCard";
import { SITE_NAME, SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import type { Post, Category } from "@/lib/supabase/types";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: rawCat } = await supabase.from("categories").select("name,slug").eq("slug", params.slug).single();
  if (!rawCat) return { title: "Not Found" };
  const cat = rawCat as unknown as Pick<Category, "name" | "slug">;
  return {
    title: `${cat.name} Articles`,
    description: `Browse all ${cat.name} articles on ${SITE_NAME}.`,
    openGraph: { url: `${SITE_URL}/category/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const supabase = createServerClient();
  const { data: rawCategory } = await supabase.from("categories").select("*").eq("slug", params.slug).single();
  if (!rawCategory) notFound();
  const category = rawCategory as unknown as Category;

  const { data: posts } = await supabase
    .from("posts")
    .select("*, categories(id,name,slug,created_at)")
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-xs mb-6 flex items-center gap-1" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>›</span>
        <Link href="/blog" className="hover:underline">Blog</Link>
        <span>›</span>
        <span>{category.name}</span>
      </nav>

      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#c9a84c" }}>Category</span>
        <h1 className="text-4xl font-bold font-serif" style={{ color: "var(--fg)" }}>{category.name}</h1>
        <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>{posts?.length ?? 0} articles</p>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">✒</div>
          <p className="font-serif text-lg mb-2" style={{ color: "var(--fg)" }}>No articles yet</p>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Check back soon for content in this category.</p>
          <Link href="/blog" className="text-sm font-semibold hover:underline" style={{ color: "#c9a84c" }}>← Back to All Articles</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts as unknown as (Post & { categories: Category | null })[]).map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}

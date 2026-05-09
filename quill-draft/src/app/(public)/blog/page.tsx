export const dynamic = "force-dynamic";
import { createServerClient } from "@/lib/supabase/server";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import type { Post, Category } from "@/lib/supabase/types";

const PAGE_SIZE = 9;
type PostFull = Post & { categories: Category | null };

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { cat?: string; q?: string; page?: string };
}) {
  // Debug: confirm env vars are present
  console.log("[BlogPage] SUPABASE_URL set:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[BlogPage] SUPABASE_ANON_KEY set:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const supabase = createServerClient();
  const page = Math.max(1, Number(searchParams.page) || 1);
  const catFilter = searchParams.cat ?? "";
  const query = searchParams.q ?? "";

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  let q = supabase
    .from("posts")
    .select("*, categories(id,name,slug,created_at)", { count: "exact" })
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (catFilter) q = q.eq("category_id", catFilter);
  if (query) q = q.ilike("title", `%${query}%`);

  const { data, count, error: postsError } = await q;

  console.log("[BlogPage] posts fetched:", data?.length ?? 0, "total:", count ?? 0);
  if (postsError) console.error("[BlogPage] posts error:", postsError.message);

  const categories = (categoriesData ?? []) as Category[];
  const posts = ((data ?? []) as unknown) as PostFull[];
  const total = count ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>The Blog</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Thoughtful articles on ideas that matter</p>
      </div>

      {/* Search */}
      <form method="GET" action="/blog" className="flex gap-2 max-w-xl mx-auto mb-8">
        {catFilter && <input type="hidden" name="cat" value={catFilter} />}
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Search articles…"
          className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}
        />
        <button type="submit"
          className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
          Search
        </button>
      </form>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <Link href="/blog"
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: !catFilter ? "#c9a84c" : "var(--surface)",
              color: !catFilter ? "#1a1a2e" : "var(--fg)",
              border: "1px solid var(--border)",
            }}>
            All
          </Link>
          {categories.map(cat => (
            <Link key={cat.id}
              href={`/blog?cat=${cat.id}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: catFilter === cat.id ? "#c9a84c" : "var(--surface)",
                color: catFilter === cat.id ? "#1a1a2e" : "var(--fg)",
                border: "1px solid var(--border)",
              }}>
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">✒</div>
          <p className="font-serif text-lg mb-2" style={{ color: "var(--fg)" }}>No articles found</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {query ? "Try a different search term." : "Check back soon for new posts."}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <Link key={p}
              href={`/blog?page=${p}${catFilter ? `&cat=${catFilter}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className="w-9 h-9 rounded-full text-sm font-medium transition-all flex items-center justify-center"
              style={{
                backgroundColor: page === p ? "#c9a84c" : "var(--surface)",
                color: page === p ? "#1a1a2e" : "var(--fg)",
                border: "1px solid var(--border)",
              }}>
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

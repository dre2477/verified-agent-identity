"use client";
import { useEffect, useState, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import PostCard from "@/components/PostCard";
import type { Post, Category } from "@/lib/supabase/types";

const PAGE_SIZE = 9;

export default function BlogPage() {
  const supabase = createBrowserClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let q = supabase
      .from("posts")
      .select("*, categories(id,name,slug,created_at)", { count: "exact" })
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (catFilter) q = q.eq("category_id", catFilter);
    if (query) q = q.ilike("title", `%${query}%`);

    const { data, count } = await q;
    setPosts((data as Post[]) ?? []);
    setTotal(count ?? 0);
    setLoading(false);
  }, [supabase, page, catFilter, query]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => {
    supabase.from("categories").select("*").order("name").then(({ data }) => setCategories(data ?? []));
  }, [supabase]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setQuery(search);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>The Blog</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Thoughtful articles on ideas that matter</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}
        />
        <button type="submit" className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
          Search
        </button>
      </form>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => { setCatFilter(""); setPage(1); }}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: catFilter === "" ? "#c9a84c" : "var(--surface)",
              color: catFilter === "" ? "#1a1a2e" : "var(--fg)",
              border: "1px solid var(--border)",
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button key={cat.id}
              onClick={() => { setCatFilter(cat.id); setPage(1); }}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: catFilter === cat.id ? "#c9a84c" : "var(--surface)",
                color: catFilter === cat.id ? "#1a1a2e" : "var(--fg)",
                border: "1px solid var(--border)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {loading ? (
        <div className="text-center py-20" style={{ color: "var(--muted)" }}>Loading articles…</div>
      ) : posts.length === 0 ? (
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
            <button key={p} onClick={() => setPage(p)}
              className="w-9 h-9 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: page === p ? "#c9a84c" : "var(--surface)",
                color: page === p ? "#1a1a2e" : "var(--fg)",
                border: "1px solid var(--border)",
              }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Ad zone — hidden until AdSense is activated */}
      {/* <div className="ad-zone h-20 mt-12">[ Advertisement ]</div> */}
    </div>
  );
}

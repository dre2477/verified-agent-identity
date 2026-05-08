"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import { PostMeta } from "@/lib/blog";

const POSTS_PER_PAGE = 9;

export default function BlogListClient({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={
                activeCategory === cat
                  ? { backgroundColor: "var(--color-gold)", color: "#1a1a2e" }
                  : { backgroundColor: "var(--surface)", color: "var(--fg)", border: "1px solid var(--border)" }
              }
              className="px-5 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p style={{ color: "var(--muted)" }} className="text-lg">
              No posts in this category yet.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                border: "1px solid var(--border)",
                color: "var(--fg)",
                opacity: page === 1 ? 0.4 : 1,
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-70 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={
                  p === page
                    ? { backgroundColor: "var(--color-gold)", color: "#1a1a2e" }
                    : { border: "1px solid var(--border)", color: "var(--fg)" }
                }
                className="w-9 h-9 rounded-lg text-sm font-medium hover:opacity-80 transition-all"
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                border: "1px solid var(--border)",
                color: "var(--fg)",
                opacity: page === totalPages ? 0.4 : 1,
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-70 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

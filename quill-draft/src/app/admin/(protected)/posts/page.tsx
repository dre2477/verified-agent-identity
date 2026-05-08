"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/supabase/types";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/posts");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleting(null);
  };

  const handleToggleStatus = async (post: Post) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: updated.status } : p));
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif" style={{ color: "#f5f0e8" }}>All Posts</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(245,240,232,0.5)" }}>{posts.length} total</p>
        </div>
        <Link href="/admin/posts/new"
          className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
          + New Post
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}>
        {loading ? (
          <div className="px-6 py-16 text-center text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>Loading posts…</div>
        ) : posts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">✒</div>
            <p className="text-sm mb-4" style={{ color: "rgba(245,240,232,0.5)" }}>No posts yet.</p>
            <Link href="/admin/posts/new" className="text-sm font-semibold hover:underline" style={{ color: "#c9a84c" }}>Write your first post →</Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {/* Header row */}
            <div className="px-6 py-3 grid grid-cols-12 gap-4 text-xs font-semibold uppercase tracking-wider"
              style={{ color: "rgba(245,240,232,0.35)", backgroundColor: "rgba(0,0,0,0.2)" }}>
              <span className="col-span-6">Title</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Date</span>
              <span className="col-span-2 text-right">Actions</span>
            </div>
            {posts.map(post => (
              <div key={post.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-white/5 transition-colors">
                <div className="col-span-6 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#f5f0e8" }}>{post.title}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: "rgba(245,240,232,0.35)" }}>/{post.slug}</p>
                </div>
                <div className="col-span-2">
                  <button onClick={() => handleToggleStatus(post)}
                    className="text-xs px-2.5 py-1 rounded-full font-medium transition-all hover:opacity-80 cursor-pointer"
                    style={{
                      backgroundColor: post.status === "published" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                      color: post.status === "published" ? "#86efac" : "#fde047",
                      border: "1px solid transparent",
                    }}
                    title="Click to toggle"
                  >
                    {post.status}
                  </button>
                </div>
                <div className="col-span-2 text-xs" style={{ color: "rgba(245,240,232,0.4)" }}>
                  {formatDate(post.created_at)}
                </div>
                <div className="col-span-2 flex justify-end gap-3">
                  <Link href={`/blog/${post.slug}`} target="_blank"
                    className="text-xs hover:underline" style={{ color: "rgba(245,240,232,0.4)" }}>
                    View
                  </Link>
                  <Link href={`/admin/posts/${post.id}`}
                    className="text-xs hover:underline" style={{ color: "#c9a84c" }}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleting === post.id}
                    className="text-xs hover:underline disabled:opacity-50"
                    style={{ color: "#f87171" }}>
                    {deleting === post.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

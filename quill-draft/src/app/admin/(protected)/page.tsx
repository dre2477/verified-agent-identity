export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/supabase/types";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ count: totalPosts }, { count: publishedPosts }, { count: draftPosts }, { count: totalCategories }, { data: recent }] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("id,title,slug,status,created_at").order("created_at", { ascending: false }).limit(5),
  ]);
  const recentPosts = (recent ?? []) as unknown as Pick<Post, "id" | "title" | "slug" | "status" | "created_at">[];

  const stats = [
    { label: "Total Posts", value: totalPosts ?? 0, icon: "✍", href: "/admin/posts" },
    { label: "Published", value: publishedPosts ?? 0, icon: "✓", href: "/admin/posts?status=published" },
    { label: "Drafts", value: draftPosts ?? 0, icon: "◌", href: "/admin/posts?status=draft" },
    { label: "Categories", value: totalCategories ?? 0, icon: "⊞", href: "/admin/categories" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif" style={{ color: "#f5f0e8" }}>Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(245,240,232,0.5)" }}>Welcome back. Here&apos;s your content overview.</p>
        </div>
        <Link href="/admin/posts/new"
          className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
          + New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href}
            className="rounded-xl p-5 transition-all hover:opacity-80"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold font-serif mb-1" style={{ color: "#c9a84c" }}>{stat.value}</div>
            <div className="text-xs" style={{ color: "rgba(245,240,232,0.5)" }}>{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
          <h2 className="font-bold font-serif" style={{ color: "#f5f0e8" }}>Recent Posts</h2>
          <Link href="/admin/posts" className="text-xs font-semibold hover:underline" style={{ color: "#c9a84c" }}>View all →</Link>
        </div>
        {recentPosts.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>No posts yet.</p>
            <Link href="/admin/posts/new" className="text-sm font-semibold hover:underline mt-2 inline-block" style={{ color: "#c9a84c" }}>Write your first post →</Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {recentPosts.map(post => (
              <div key={post.id} className="px-6 py-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: "#f5f0e8" }}>{post.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.4)" }}>{formatDate(post.created_at)}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: post.status === "published" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
                      color: post.status === "published" ? "#86efac" : "#fde047",
                    }}>
                    {post.status}
                  </span>
                  <Link href={`/admin/posts/${post.id}`} className="text-xs hover:underline" style={{ color: "#c9a84c" }}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

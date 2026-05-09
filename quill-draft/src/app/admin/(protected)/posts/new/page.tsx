"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import nextDynamic from "next/dynamic";
import type { Category } from "@/lib/supabase/types";

const TipTapEditor = nextDynamic(() => import("@/components/admin/TipTapEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCategories(data); });
  }, []);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setFeaturedImage(url);
    }
    setUploadingImage(false);
  };

  const handleSave = async (saveStatus: "draft" | "published") => {
    if (!title.trim()) { setError("Title is required"); return; }
    if (!content || content === "<p></p>") { setError("Content is required"); return; }
    setError("");
    setSaving(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, excerpt, featured_image_url: featuredImage, category_id: categoryId, status: saveStatus }),
    });

    if (res.ok) {
      const post = await res.json();
      router.push(`/admin/posts/${post.id}`);
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to save post");
      setSaving(false);
    }
  };

  const inputStyle = { backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,168,76,0.25)", color: "#f5f0e8" };
  const selectStyle = { backgroundColor: "#2d2d50", border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-serif" style={{ color: "#f5f0e8" }}>New Post</h1>
        <div className="flex gap-3">
          <button onClick={() => handleSave("draft")} disabled={saving}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" }}>
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button onClick={() => handleSave("published")} disabled={saving}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            {saving ? "Publishing…" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post title…"
            className="w-full px-4 py-3 rounded-xl text-xl font-bold font-serif outline-none"
            style={inputStyle}
          />
          <TipTapEditor content={content} onChange={setContent} />
        </div>

        {/* Settings panel */}
        <div className="space-y-5">
          {/* Status */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Status</h3>
            <select value={status} onChange={e => setStatus(e.target.value as "draft" | "published")}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={selectStyle}>
              <option value="draft" style={{ backgroundColor: "#2d2d50" }}>Draft</option>
              <option value="published" style={{ backgroundColor: "#2d2d50" }}>Published</option>
            </select>
          </div>

          {/* Category */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Category</h3>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={selectStyle}>
              <option value="" style={{ backgroundColor: "#2d2d50" }}>— Select a category —</option>
              {categories.length === 0 ? (
                <option disabled style={{ backgroundColor: "#2d2d50" }}>No categories yet — create one first</option>
              ) : (
                categories.map(cat => (
                  <option key={cat.id} value={cat.id} style={{ backgroundColor: "#2d2d50" }}>{cat.name}</option>
                ))
              )}
            </select>
            {categories.length === 0 && (
              <p className="text-xs mt-1.5" style={{ color: "rgba(201,168,76,0.7)" }}>
                Go to <a href="/admin/categories" className="underline hover:opacity-80">Categories</a> to create one first.
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Excerpt</h3>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="Brief summary for previews…"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
          </div>

          {/* Featured Image */}
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Featured Image</h3>
            {featuredImage && (
              <div className="mb-3 rounded-lg overflow-hidden h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80"
              style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
              {uploadingImage ? "Uploading…" : "Upload Image"}
              <input type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
            </label>
            <p className="text-xs mt-2" style={{ color: "rgba(245,240,232,0.3)" }}>Or paste URL:</p>
            <input type="url" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
              placeholder="https://…"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none mt-1" style={inputStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}

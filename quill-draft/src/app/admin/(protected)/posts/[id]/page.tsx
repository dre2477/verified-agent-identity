"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Category, Post } from "@/lib/supabase/types";

const TipTapEditor = nextDynamic(() => import("@/components/admin/TipTapEditor"), { ssr: false });

const BUCKET = "post-images";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = useMemo(() => createBrowserClient(), []);

  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);

  const fetchPost = useCallback(async () => {
    const res = await fetch(`/api/posts/${params.id}`);
    if (res.ok) {
      const data: Post = await res.json();
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt ?? "");
      setCategoryId(data.category_id ?? "");
      setStatus(data.status);
      setFeaturedImage(data.featured_image_url ?? "");
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
    fetch("/api/categories").then(r => r.json()).then(data => { if (Array.isArray(data)) setCategories(data); });
  }, [fetchPost]);

  const handleImageUpload = async (file: File) => {
    setUploadError("");
    setSelectedFile({ name: file.name, size: (file.size / 1024).toFixed(1) + " KB" });
    setUploadingImage(true);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.");
      setUploadingImage(false);
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError("File too large. Maximum size is 5MB.");
      setUploadingImage(false);
      return;
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (uploadErr) {
      setUploadError(uploadErr.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
      setFeaturedImage(publicUrl);
      setSelectedFile(null);
    }
    setUploadingImage(false);
  };

  const handleSave = async (saveStatus?: "draft" | "published") => {
    if (!title.trim()) { setError("Title is required"); return; }
    setError("");
    setSaving(true);
    setSaved(false);

    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title, content, excerpt,
        featured_image_url: featuredImage,
        category_id: categoryId,
        status: saveStatus ?? status,
      }),
    });

    if (res.ok) {
      const updated: Post = await res.json();
      setStatus(updated.status);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
    }
    setSaving(false);
  };

  const inputStyle = { backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,168,76,0.25)", color: "#f5f0e8" };
  const selectStyle = { backgroundColor: "#2d2d50", border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" };

  if (!post) return <div className="text-sm py-10 text-center" style={{ color: "rgba(245,240,232,0.4)" }}>Loading post…</div>;

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="text-sm hover:underline" style={{ color: "rgba(245,240,232,0.4)" }}>← Posts</Link>
          <h1 className="text-2xl font-bold font-serif" style={{ color: "#f5f0e8" }}>Edit Post</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm" style={{ color: "#86efac" }}>✓ Saved</span>}
          <button onClick={() => handleSave(status === "draft" ? "published" : "draft")} disabled={saving}
            className="px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" }}>
            {status === "draft" ? "Publish" : "Unpublish"}
          </button>
          <button onClick={() => handleSave()} disabled={saving}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Post title…"
            className="w-full px-4 py-3 rounded-xl text-xl font-bold font-serif outline-none"
            style={inputStyle} />
          <TipTapEditor content={content} onChange={setContent} />
        </div>

        <div className="space-y-5">
          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#c9a84c" }}>Status</h3>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{
              backgroundColor: status === "published" ? "rgba(34,197,94,0.15)" : "rgba(234,179,8,0.15)",
              color: status === "published" ? "#86efac" : "#fde047",
            }}>
              {status}
            </span>
          </div>

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

          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Excerpt</h3>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="Brief summary…"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Featured Image</h3>

            {uploadError && (
              <div className="mb-3 px-3 py-2 rounded-lg text-xs break-all" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
                ✗ {uploadError}
              </div>
            )}
            {selectedFile && !uploadingImage && (
              <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c" }}>
                Selected: {selectedFile.name} ({selectedFile.size})
              </div>
            )}
            {featuredImage && (
              <div className="mb-3 rounded-lg overflow-hidden h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80"
              style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
              {uploadingImage ? `Uploading ${selectedFile?.name ?? ""}…` : "Change Image"}
              <input type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); e.target.value = ""; }} />
            </label>
            <input type="url" value={featuredImage} onChange={e => setFeaturedImage(e.target.value)}
              placeholder="https://…"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none mt-2" style={inputStyle} />
          </div>

          {post && (
            <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h3 className="text-sm font-bold mb-3" style={{ color: "#c9a84c" }}>Permalink</h3>
              <p className="text-xs break-all" style={{ color: "rgba(245,240,232,0.5)" }}>/blog/{post.slug}</p>
              {post.status === "published" && (
                <Link href={`/blog/${post.slug}`} target="_blank"
                  className="text-xs hover:underline mt-2 inline-block" style={{ color: "#c9a84c" }}>
                  View live →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

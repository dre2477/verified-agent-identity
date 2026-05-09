"use client";
import { useState, useEffect, useCallback } from "react";
import { createBrowserClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/supabase/types";

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(201,168,76,0.25)",
  color: "#f5f0e8",
};
const cardStyle = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.15)",
};

// ─── Upload helper ─────────────────────────────────────────────────────────────
async function uploadImage(
  file: File,
  bucket: "images" = "images"
): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`/api/upload?bucket=${bucket}`, { method: "POST", body: formData });
  if (!res.ok) return null;
  const { url } = await res.json();
  return url as string;
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION A — Branding
// ═════════════════════════════════════════════════════════════════════════════
function BrandingSection() {
  const [tagline, setTagline] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [heroUrl, setHeroUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        setTagline(d.site_tagline ?? "");
        setLogoUrl(d.logo_url ?? "");
        setHeroUrl(d.hero_image_url ?? "");
      });
  }, []);

  const handleUpload = async (
    file: File,
    setter: (v: string) => void,
    setUploading: (v: boolean) => void
  ) => {
    setUploading(true);
    setError("");
    const url = await uploadImage(file, "images");
    if (url) setter(url);
    else setError("Upload failed — check that the 'images' bucket exists in Supabase Storage and is public.");
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site_tagline: tagline, logo_url: logoUrl, hero_image_url: heroUrl }),
    });
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    else { const d = await res.json(); setError(d.error ?? "Failed to save"); }
    setSaving(false);
  };

  return (
    <section className="rounded-2xl p-6 mb-6" style={cardStyle}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold font-serif" style={{ color: "#c9a84c" }}>Branding</h2>
          <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.4)" }}>Logo, hero banner, and tagline</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm" style={{ color: "#86efac" }}>✓ Saved</span>}
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            {saving ? "Saving…" : "Save Branding"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Tagline */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>
            Site Tagline <span style={{ color: "rgba(245,240,232,0.3)" }}>— shown in the homepage hero</span>
          </label>
          <input type="text" value={tagline} onChange={e => setTagline(e.target.value)}
            placeholder="Where Curiosity Meets Craft"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>

        {/* Logo */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>
            Site Logo <span style={{ color: "rgba(245,240,232,0.3)" }}>— leave blank to use text logo</span>
          </label>
          {logoUrl && (
            <div className="mb-2 h-14 rounded-lg overflow-hidden flex items-center px-4" style={{ backgroundColor: "#1a1a2e", border: "1px solid rgba(201,168,76,0.15)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Logo" className="h-9 object-contain" />
            </div>
          )}
          <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80 mb-2"
            style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
            {uploadingLogo ? "Uploading…" : "Upload Logo"}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f, setLogoUrl, setUploadingLogo); e.target.value = ""; }} />
          </label>
          <input type="url" value={logoUrl} onChange={e => setLogoUrl(e.target.value)}
            placeholder="https://… or paste a URL"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>

        {/* Hero / Banner */}
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>
            Homepage Hero / Banner <span style={{ color: "rgba(245,240,232,0.3)" }}>— leave blank for default gradient</span>
          </label>
          {heroUrl && (
            <div className="mb-2 rounded-lg overflow-hidden h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroUrl} alt="Hero" className="w-full h-full object-cover" />
            </div>
          )}
          <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80 mb-2"
            style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
            {uploadingHero ? "Uploading…" : "Upload Banner Image"}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f, setHeroUrl, setUploadingHero); e.target.value = ""; }} />
          </label>
          <input type="url" value={heroUrl} onChange={e => setHeroUrl(e.target.value)}
            placeholder="https://… or paste a URL"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION B — Categories Manager
// ═════════════════════════════════════════════════════════════════════════════
function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    const res = await fetch("/api/categories");
    if (res.ok) setCategories(await res.json());
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    setError("");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    if (res.ok) { setNewName(""); await fetchCategories(); }
    else { const d = await res.json(); setError(d.error ?? "Failed to add category"); }
    setAdding(false);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setError("");
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) await fetchCategories();
    else { const d = await res.json(); setError(d.error ?? "Failed to delete category"); }
    setDeletingId(null);
  };

  return (
    <section className="rounded-2xl p-6 mb-6" style={cardStyle}>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "#c9a84c" }}>Categories</h2>
      <p className="text-xs mb-5" style={{ color: "rgba(245,240,232,0.4)" }}>Add or remove post categories</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      {/* Add new */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleAdd(); }}
          placeholder="New category name…"
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
          style={inputStyle}
        />
        <button onClick={handleAdd} disabled={adding || !newName.trim()}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
          {adding ? "Adding…" : "Add"}
        </button>
      </div>

      {/* Category list */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: "rgba(245,240,232,0.3)" }}>No categories yet</p>
        ) : (
          categories.map(cat => (
            <div key={cat.id} className="flex items-center justify-between px-4 py-2.5 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <div>
                <span className="text-sm font-medium" style={{ color: "#f5f0e8" }}>{cat.name}</span>
                <span className="text-xs ml-2" style={{ color: "rgba(245,240,232,0.35)" }}>/{cat.slug}</span>
              </div>
              <button
                onClick={() => handleDelete(cat.id)}
                disabled={deletingId === cat.id}
                className="text-xs px-3 py-1 rounded-full transition-opacity hover:opacity-80 disabled:opacity-40"
                style={{ backgroundColor: "rgba(220,38,38,0.15)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
                {deletingId === cat.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// SECTION C — Account
// ═════════════════════════════════════════════════════════════════════════════
function AccountSection() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [sending, setSending] = useState(false);
  const supabase = createBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, [supabase]);

  const handlePasswordReset = async () => {
    if (!email) return;
    setSending(true);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    setResetSent(true);
    setSending(false);
  };

  return (
    <section className="rounded-2xl p-6" style={cardStyle}>
      <h2 className="text-lg font-bold font-serif mb-1" style={{ color: "#c9a84c" }}>Account</h2>
      <p className="text-xs mb-5" style={{ color: "rgba(245,240,232,0.4)" }}>Your admin login details</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>
            Logged in as
          </label>
          <div className="px-4 py-2.5 rounded-lg text-sm" style={{ ...inputStyle, opacity: 0.7 }}>
            {email || "Loading…"}
          </div>
        </div>

        <div>
          {resetSent ? (
            <div className="px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}>
              ✓ Password reset email sent to {email}
            </div>
          ) : (
            <button onClick={handlePasswordReset} disabled={sending || !email}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" }}>
              {sending ? "Sending…" : "Send Password Reset Email"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// Main page
// ═════════════════════════════════════════════════════════════════════════════
export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif" style={{ color: "#f5f0e8" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(245,240,232,0.4)" }}>Manage your site branding, categories, and account</p>
      </div>
      <BrandingSection />
      <CategoriesSection />
      <AccountSection />
    </div>
  );
}

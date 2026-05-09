"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
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
      .then(data => {
        setTagline(data.site_tagline ?? "");
        setLogoUrl(data.logo_url ?? "");
        setHeroUrl(data.hero_image_url ?? "");
      });
  }, []);

  const handleUpload = async (
    file: File,
    setter: (url: string) => void,
    setUploading: (v: boolean) => void
  ) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setter(url);
    } else {
      const data = await res.json();
      setError(data.error ?? "Upload failed");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_tagline: tagline,
        logo_url: logoUrl,
        hero_image_url: heroUrl,
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to save settings");
    }
    setSaving(false);
  };

  const inputStyle = { backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,168,76,0.25)", color: "#f5f0e8" };
  const cardStyle = { backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-serif" style={{ color: "#f5f0e8" }}>Site Settings</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm" style={{ color: "#86efac" }}>✓ Saved</span>}
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            {saving ? "Saving…" : "Save Settings"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Tagline */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <h3 className="text-sm font-bold mb-1" style={{ color: "#c9a84c" }}>Site Tagline</h3>
          <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.4)" }}>Shown on the homepage hero section</p>
          <input type="text" value={tagline} onChange={e => setTagline(e.target.value)}
            placeholder="Where Curiosity Meets Craft"
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>

        {/* Logo */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <h3 className="text-sm font-bold mb-1" style={{ color: "#c9a84c" }}>Site Logo</h3>
          <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.4)" }}>Upload an image or paste a URL. Leave blank to use the text logo.</p>
          {logoUrl && (
            <div className="mb-3 h-16 rounded-lg overflow-hidden flex items-center px-3" style={{ backgroundColor: "#1a1a2e" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Logo preview" className="h-10 object-contain" />
            </div>
          )}
          <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80 mb-2"
            style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
            {uploadingLogo ? "Uploading…" : "Upload Logo"}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f, setLogoUrl, setUploadingLogo); }} />
          </label>
          <input type="url" value={logoUrl} onChange={e => setLogoUrl(e.target.value)}
            placeholder="https://…"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>

        {/* Hero / Banner */}
        <div className="rounded-xl p-5" style={cardStyle}>
          <h3 className="text-sm font-bold mb-1" style={{ color: "#c9a84c" }}>Homepage Hero / Banner Image</h3>
          <p className="text-xs mb-3" style={{ color: "rgba(245,240,232,0.4)" }}>Shown as the background of the homepage hero section. Leave blank for the default dark gradient.</p>
          {heroUrl && (
            <div className="mb-3 rounded-lg overflow-hidden h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroUrl} alt="Hero preview" className="w-full h-full object-cover" />
            </div>
          )}
          <label className="block w-full text-center px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-opacity hover:opacity-80 mb-2"
            style={{ border: "1px dashed rgba(201,168,76,0.4)", color: "#c9a84c" }}>
            {uploadingHero ? "Uploading…" : "Upload Banner Image"}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f, setHeroUrl, setUploadingHero); }} />
          </label>
          <input type="url" value={heroUrl} onChange={e => setHeroUrl(e.target.value)}
            placeholder="https://…"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
      </div>
    </div>
  );
}

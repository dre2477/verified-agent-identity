"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect, useCallback } from "react";
import type { Category } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/categories");
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSaving(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories(prev => [...prev, cat].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to create");
    }
    setSaving(false);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName.trim() }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories(prev => prev.map(c => c.id === id ? updated : c).sort((a, b) => a.name.localeCompare(b.name)));
      setEditId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? Posts in this category will become uncategorized.`)) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) setCategories(prev => prev.filter(c => c.id !== id));
  };

  const inputStyle = { backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(201,168,76,0.25)", color: "#f5f0e8" };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-serif" style={{ color: "#f5f0e8" }}>Categories</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(245,240,232,0.5)" }}>Organize your posts into topics</p>
      </div>

      {/* Create new */}
      <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}>
        <h2 className="text-sm font-bold mb-4" style={{ color: "#c9a84c" }}>Add New Category</h2>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
            placeholder="Category name…"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none" style={inputStyle} />
          <button type="submit" disabled={saving || !newName.trim()}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            {saving ? "Creating…" : "Create"}
          </button>
        </form>
        {error && <p className="text-xs mt-2" style={{ color: "#fca5a5" }}>{error}</p>}
      </div>

      {/* Category list */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)", backgroundColor: "rgba(255,255,255,0.03)" }}>
        {loading ? (
          <div className="px-6 py-10 text-center text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>Loading…</div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm" style={{ color: "rgba(245,240,232,0.4)" }}>
            No categories yet. Create your first one above.
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {categories.map(cat => (
              <div key={cat.id} className="px-6 py-4 flex items-center gap-4">
                {editId === cat.id ? (
                  <>
                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg text-sm outline-none" style={inputStyle}
                      onKeyDown={e => { if (e.key === "Enter") handleUpdate(cat.id); if (e.key === "Escape") setEditId(null); }}
                      autoFocus />
                    <button onClick={() => handleUpdate(cat.id)}
                      className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
                      Save
                    </button>
                    <button onClick={() => setEditId(null)}
                      className="text-xs hover:underline" style={{ color: "rgba(245,240,232,0.5)" }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "#f5f0e8" }}>{cat.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.35)" }}>
                        /{cat.slug} · Added {formatDate(cat.created_at)}
                      </p>
                    </div>
                    <button onClick={() => { setEditId(cat.id); setEditName(cat.name); }}
                      className="text-xs hover:underline" style={{ color: "#c9a84c" }}>
                      Rename
                    </button>
                    <button onClick={() => handleDelete(cat.id, cat.name)}
                      className="text-xs hover:underline" style={{ color: "#f87171" }}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

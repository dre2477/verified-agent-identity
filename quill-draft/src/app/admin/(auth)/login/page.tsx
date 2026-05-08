"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";
import { SITE_NAME } from "@/lib/utils";

export default function AdminLoginPage() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { backgroundColor: "rgba(245,240,232,0.08)", border: "1px solid rgba(201,168,76,0.3)", color: "#f5f0e8" };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #252542 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3" style={{ color: "#c9a84c" }}>✒</div>
          <h1 className="text-2xl font-bold font-serif" style={{ color: "#f5f0e8" }}>{SITE_NAME}</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(245,240,232,0.5)" }}>Admin Dashboard</p>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
          <h2 className="text-lg font-bold font-serif mb-6 text-center" style={{ color: "#f5f0e8" }}>Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@example.com" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "rgba(245,240,232,0.6)" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••" className={inputClass} style={inputStyle} />
            </div>

            {error && (
              <div className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", color: "#fca5a5" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60 mt-2"
              style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(245,240,232,0.3)" }}>
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const navItems = [
  { href: "/admin", label: "Dashboard", icon: <span>◈</span> },
  { href: "/admin/posts", label: "Posts", icon: <span>✍</span> },
  { href: "/admin/posts/new", label: "New Post", icon: <span>+</span> },
  { href: "/admin/categories", label: "Categories", icon: <span>⊞</span> },
  { href: "/admin/settings", label: "Settings", icon: <GearIcon /> },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="w-56 shrink-0 min-h-screen flex flex-col" style={{ backgroundColor: "#1a1a2e", borderRight: "1px solid rgba(201,168,76,0.2)" }}>
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <Link href="/" className="text-lg font-bold font-serif" style={{ color: "#c9a84c" }}>✒ The Quill</Link>
        <p className="text-xs mt-0.5" style={{ color: "rgba(245,240,232,0.4)" }}>Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive ? "rgba(201,168,76,0.15)" : "transparent",
                color: isActive ? "#c9a84c" : "rgba(245,240,232,0.7)",
              }}
            >
              <span className="flex items-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(201,168,76,0.2)" }}>
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:opacity-80"
          style={{ color: "rgba(245,240,232,0.5)" }}>
          <span>←</span> View Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:opacity-80 mt-1 text-left"
          style={{ color: "rgba(245,240,232,0.5)" }}>
          <span>⏻</span> Sign Out
        </button>
      </div>
    </aside>
  );
}

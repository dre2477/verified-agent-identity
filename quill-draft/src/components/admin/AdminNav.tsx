"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/posts", label: "Posts", icon: "✍" },
  { href: "/admin/posts/new", label: "New Post", icon: "+" },
  { href: "/admin/categories", label: "Categories", icon: "⊞" },
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
              <span className="text-base">{item.icon}</span>
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

"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ logoUrl = "" }: { logoUrl?: string }) {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {logoUrl
            ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={logoUrl} alt="The Quill Draft" className="h-9 object-contain" />
            : <span className="text-2xl font-bold font-serif" style={{ color: "var(--gold)" }}>✒ The Quill Draft</span>
          }
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--fg)" }}>{l.label}</Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded-full hover:opacity-70 transition-opacity" style={{ color: "var(--fg)", border: "1px solid var(--border)" }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link href="/admin" className="text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity" style={{ backgroundColor: "var(--gold)", color: "#1a1a2e" }}>Admin</Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} style={{ color: "var(--fg)" }} className="p-2">{theme === "dark" ? "☀️" : "🌙"}</button>
          <button onClick={() => setOpen(!open)} style={{ color: "var(--fg)" }} className="p-2" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4" style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium hover:opacity-70" style={{ color: "var(--fg)" }}>{l.label}</Link>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)} className="mt-2 block text-center px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: "var(--gold)", color: "#1a1a2e" }}>Admin</Link>
        </div>
      )}
    </header>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/yourhandle", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
  { label: "Facebook", href: "https://facebook.com/yourpage", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { label: "Instagram", href: "https://instagram.com/yourhandle", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
];

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
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="p-2 rounded-full hover:opacity-70 transition-opacity"
              style={{ color: "var(--fg)", border: "1px solid var(--border)" }}>
              {s.icon}
            </a>
          ))}
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

import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/yourhandle",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/yourpage",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yourhandle",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Email Newsletter",
    href: "/contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a2e", color: "#f5f0e8", borderTop: "2px solid #c9a84c" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <span className="text-2xl font-bold font-serif" style={{ color: "#c9a84c" }}>✒ {SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ opacity: 0.7 }}>{SITE_TAGLINE}. Premium editorial content for the curious mind.</p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#c9a84c" }}>Navigation</h3>
            <ul className="space-y-2">
              {[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:opacity-100 transition-opacity" style={{ opacity: 0.75, color: "#f5f0e8" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#c9a84c" }}>Legal</h3>
            <ul className="space-y-2">
              {[{ href: "/privacy-policy", label: "Privacy Policy" }, { href: "/terms", label: "Terms & Conditions" }, { href: "/disclaimer", label: "Disclaimer" }].map(l => (
                <li key={l.href}><Link href={l.href} className="text-sm hover:opacity-100 transition-opacity" style={{ opacity: 0.75, color: "#f5f0e8" }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ borderTop: "1px solid rgba(201,168,76,0.2)", opacity: 0.55 }}>
          <p>© 2026 {SITE_NAME}. All rights reserved.</p>
          <p>Have something to say? We write it.</p>
        </div>
      </div>
    </footer>
  );
}

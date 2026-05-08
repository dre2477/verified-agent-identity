import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/utils";

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
              {["𝕏", "in", "f", "📧"].map((icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}>{icon}</span>
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

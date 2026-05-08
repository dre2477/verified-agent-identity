import Link from "next/link";

const footerLinks = {
  Navigation: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/disclaimer", label: "Disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "var(--color-cream)",
        borderTop: "2px solid var(--color-gold)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <span
                style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
                className="text-2xl font-bold"
              >
                ✒ The Ink Bureau
              </span>
            </Link>
            <p style={{ color: "var(--color-cream)", opacity: 0.7 }} className="text-sm leading-relaxed max-w-xs">
              A premium content studio crafting SEO-optimized articles, compelling stories, and brand narratives that resonate and rank.
            </p>
            {/* Social Placeholders */}
            <div className="flex gap-3 mt-5">
              {["𝕏", "in", "f", "📧"].map((icon, i) => (
                <span
                  key={i}
                  style={{
                    border: "1px solid rgba(201,168,76,0.4)",
                    color: "var(--color-gold)",
                  }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
              className="text-sm font-bold uppercase tracking-widest mb-4"
            >
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.Navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--color-cream)", opacity: 0.75 }}
                    className="text-sm hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
              className="text-sm font-bold uppercase tracking-widest mb-4"
            >
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "var(--color-cream)", opacity: 0.75 }}
                    className="text-sm hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid rgba(201,168,76,0.2)", color: "var(--color-cream)", opacity: 0.55 }}
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
        >
          <p>© 2026 The Ink Bureau. All rights reserved.</p>
          <p>Human-crafted content. No AI spam.</p>
        </div>
      </div>
    </footer>
  );
}

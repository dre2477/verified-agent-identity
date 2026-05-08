import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — ${SITE_TAGLINE}. Our mission, our writers, and what we stand for.`,
  openGraph: { url: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-14">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#c9a84c" }}>About Us</span>
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4" style={{ color: "var(--fg)" }}>{SITE_NAME}</h1>
        <p className="text-xl font-serif italic" style={{ color: "#c9a84c" }}>{SITE_TAGLINE}</p>
      </div>

      <div className="prose max-w-none" style={{ color: "var(--fg)" }}>
        <h2>Our Mission</h2>
        <p>
          {SITE_NAME} was built on a simple belief: the best ideas deserve the best words. In a world dominated by
          rapid-fire takes and disposable content, we are committed to slow, careful, deeply-researched writing
          that respects your time and intelligence.
        </p>
        <p>
          We cover a wide range of topics — technology, culture, science, philosophy, craft, and the human experience —
          united by one standard: every piece we publish must be worth reading twice.
        </p>

        <h2>Who We Are</h2>
        <p>
          We are a team of writers, researchers, and editors who believe that curiosity is the most underrated
          skill in the modern world. Our contributors come from diverse backgrounds — journalism, academia,
          industry, and independent research — but share a common commitment to rigorous, honest, and engaging prose.
        </p>
        <p>
          Every article published on {SITE_NAME} goes through an editorial review process to ensure accuracy,
          depth, and clarity. We cite our sources, acknowledge our uncertainties, and strive to give credit
          where it is due.
        </p>

        <h2>Editorial Standards</h2>
        <ul>
          <li><strong>Accuracy first:</strong> We fact-check all claims and link to primary sources whenever possible.</li>
          <li><strong>Depth over brevity:</strong> We write long-form because some ideas cannot be reduced to bullet points.</li>
          <li><strong>Independence:</strong> Our editorial decisions are not influenced by advertisers or sponsors.</li>
          <li><strong>Transparency:</strong> When we make an error, we correct it promptly and openly.</li>
          <li><strong>Respect for readers:</strong> We write for curious adults who can handle nuance and complexity.</li>
        </ul>

        <h2>About Our Content</h2>
        <p>
          All articles on {SITE_NAME} are written and edited by human professionals. We believe in the
          value of authentic human experience, perspective, and voice. Our writers bring their expertise,
          curiosity, and personal insight to every piece they craft.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have a tip, pitch, or question? We would love to hear from you.{" "}
          <Link href="/contact" style={{ color: "#c9a84c" }}>Reach out via our contact page</Link>.
        </p>
      </div>

      {/* E-E-A-T signals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
        {[
          { icon: "✓", label: "Fact-Checked" },
          { icon: "✍", label: "Human-Written" },
          { icon: "📚", label: "Expert Authors" },
          { icon: "🔒", label: "Editorial Independence" },
        ].map(item => (
          <div key={item.label} className="text-center p-4 rounded-xl" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs font-semibold" style={{ color: "var(--fg)" }}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing Services — Article & Story Writing",
  description:
    "Explore The Ink Bureau's full range of writing services: SEO blog articles, journalism-style features, short stories, brand storytelling, narrative nonfiction, and content strategy.",
  alternates: { canonical: "https://theinkbureau.com/services" },
  openGraph: {
    url: "https://theinkbureau.com/services",
    title: "Writing Services | The Ink Bureau",
    description:
      "Article writing, story writing, and content strategy services from a premium content studio.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Ink Bureau Writing Services",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Article Writing",
        description:
          "Professional article writing services including SEO blog posts, journalism-style features, research-based long-form articles, and content marketing pieces.",
        provider: { "@type": "Organization", name: "The Ink Bureau" },
        url: "https://theinkbureau.com/services#article-writing",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Story Writing",
        description:
          "Creative story writing services including short stories, narrative nonfiction, brand storytelling, and series writing.",
        provider: { "@type": "Organization", name: "The Ink Bureau" },
        url: "https://theinkbureau.com/services#story-writing",
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of articles does The Ink Bureau write?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We write SEO blog articles, long-form research pieces (2,000–10,000+ words), journalism-style features, how-to guides, listicles, opinion pieces, white papers, and thought leadership content.",
      },
    },
    {
      "@type": "Question",
      name: "Can you write stories for my brand?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our brand storytelling service transforms your company's mission, values, and customer journeys into compelling narratives. We also write short fiction, narrative nonfiction, and serialized content.",
      },
    },
    {
      "@type": "Question",
      name: "What is content strategy consulting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our content strategy service covers editorial calendar planning, pillar-cluster content architecture, keyword research and mapping, competitor content analysis, and content audit services.",
      },
    },
  ],
};

const articleServices = [
  {
    icon: "📝",
    title: "Blog Articles",
    desc: "Engaging, well-researched blog posts optimized for SEO and designed to rank. Ideal for building topical authority and organic traffic.",
    features: ["500–3,000 words", "Keyword-optimized", "Internal linking", "Meta description included"],
  },
  {
    icon: "📰",
    title: "Journalism-Style Features",
    desc: "In-depth, reported feature articles with a journalistic lens. Ideal for thought leadership, industry publications, and editorial content.",
    features: ["1,000–5,000 words", "Source-backed reporting", "Narrative structure", "Expert interviews (optional)"],
  },
  {
    icon: "🔬",
    title: "Research-Based Long-Form",
    desc: "Comprehensive long-form content backed by data, studies, and in-depth research. Built to be the definitive resource on any topic.",
    features: ["3,000–15,000 words", "Cited sources", "Data analysis", "Table of contents"],
  },
  {
    icon: "🔍",
    title: "SEO Articles",
    desc: "Content engineered for search engine performance — with strategic keyword placement, proper header hierarchy, and schema markup suggestions.",
    features: ["Keyword research included", "Competitor gap analysis", "SERP feature optimization", "Readability scoring"],
  },
];

const storyServices = [
  {
    icon: "✨",
    title: "Short Stories",
    desc: "Original, carefully crafted short fiction across genres — literary, commercial, speculative, or custom to your brief.",
    features: ["500–7,500 words", "Genre-flexible", "Character-driven", "Revision rounds included"],
  },
  {
    icon: "📚",
    title: "Narrative Nonfiction",
    desc: "True stories told with the techniques of fiction — immersive, emotional, and unforgettable. Perfect for memoirs, essays, and profiles.",
    features: ["1,000–10,000 words", "Scene-based storytelling", "Voice-matched writing", "Fact-verified"],
  },
  {
    icon: "🏢",
    title: "Brand Storytelling",
    desc: "Transform your company's origin, mission, and customer impact into stories that build trust and emotional connection with your audience.",
    features: ["About page rewrites", "Founder stories", "Case study narratives", "Mission/vision copy"],
  },
  {
    icon: "📖",
    title: "Series Writing",
    desc: "Multi-part content series — serialized fiction, episodic blog narratives, or linked article clusters — that keep audiences coming back.",
    features: ["Customizable episode lengths", "Consistent voice & arc", "Series bible development", "Flexible scheduling"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Hero */}
      <section
        style={{ backgroundColor: "var(--color-charcoal)", borderBottom: "3px solid var(--color-gold)" }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div
            style={{ color: "var(--color-gold)" }}
            className="text-sm uppercase tracking-widest font-semibold mb-4"
          >
            What We Offer
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Our Writing Services
          </h1>
          <p style={{ color: "var(--color-cream)", opacity: 0.75 }} className="text-lg max-w-xl mx-auto">
            Every service we offer is grounded in craft, research, and a genuine commitment to
            producing content that performs — in search engines and in the minds of readers.
          </p>
        </div>
      </section>

      {/* Article Writing */}
      <section
        id="article-writing"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div style={{ color: "var(--color-gold)" }} className="text-sm font-semibold uppercase tracking-widest mb-2">
              Service 01
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Article Writing
            </h2>
            <p style={{ color: "var(--muted)" }} className="text-lg max-w-2xl">
              Words that educate, persuade, and rank. Our article writing service covers the full
              spectrum — from quick SEO blog posts to sprawling long-form investigations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articleServices.map((s) => (
              <div
                key={s.title}
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-2xl p-6 flex flex-col"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-lg font-bold mb-2"
                >
                  {s.title}
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-4 flex-1">
                  {s.desc}
                </p>
                <ul className="space-y-1">
                  {s.features.map((f) => (
                    <li key={f} style={{ color: "var(--muted)" }} className="text-xs flex items-center gap-2">
                      <span style={{ color: "var(--color-gold)" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{ color: "var(--color-gold)", marginTop: "1rem" }}
                  className="text-sm font-semibold hover:underline"
                >
                  Get a Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Writing */}
      <section
        id="story-writing"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--surface-alt)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div style={{ color: "var(--color-gold)" }} className="text-sm font-semibold uppercase tracking-widest mb-2">
              Service 02
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Story Writing
            </h2>
            <p style={{ color: "var(--muted)" }} className="text-lg max-w-2xl">
              Stories create meaning that facts alone cannot. Whether it&apos;s a short story, a brand
              narrative, or a multi-part serial — we write with intention and craft.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyServices.map((s) => (
              <div
                key={s.title}
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-2xl p-6 flex flex-col"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-lg font-bold mb-2"
                >
                  {s.title}
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-4 flex-1">
                  {s.desc}
                </p>
                <ul className="space-y-1">
                  {s.features.map((f) => (
                    <li key={f} style={{ color: "var(--muted)" }} className="text-xs flex items-center gap-2">
                      <span style={{ color: "var(--color-gold)" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{ color: "var(--color-gold)", marginTop: "1rem" }}
                  className="text-sm font-semibold hover:underline"
                >
                  Get a Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Strategy */}
      <section
        id="content-strategy"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            style={{ backgroundColor: "var(--color-charcoal)", border: "2px solid var(--color-gold)" }}
            className="rounded-3xl p-10 sm:p-14"
          >
            <div style={{ color: "var(--color-gold)" }} className="text-sm font-semibold uppercase tracking-widest mb-3">
              Service 03
            </div>
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
              className="text-3xl sm:text-4xl font-bold mb-5"
            >
              Content Strategy
            </h2>
            <p style={{ color: "var(--color-cream)", opacity: 0.8 }} className="text-lg mb-8 leading-relaxed">
              Great writing without strategy is a shot in the dark. We help you define your content
              architecture, identify content gaps, build editorial calendars, and create a
              compounding content engine that grows your audience over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                "Editorial calendar planning",
                "Pillar-cluster architecture",
                "Keyword research & mapping",
                "Competitor content analysis",
                "Content audit & gap analysis",
                "Voice & tone documentation",
              ].map((item) => (
                <div key={item} style={{ color: "var(--color-cream)", opacity: 0.85 }} className="flex items-center gap-2 text-sm">
                  <span style={{ color: "var(--color-gold)" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
              className="inline-block px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Discuss Your Strategy →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Services FAQ
          </h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, i) => (
              <div
                key={i}
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
                className="rounded-xl p-6"
              >
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-lg font-bold mb-3"
                >
                  {faq.name}
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{ background: "linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold) 100%)" }}
        className="py-16 px-4 text-center"
      >
        <h2
          style={{ fontFamily: "var(--font-playfair)", color: "#1a1a2e" }}
          className="text-3xl font-bold mb-4"
        >
          Not Sure Which Service You Need?
        </h2>
        <p style={{ color: "#1a1a2e", opacity: 0.8 }} className="mb-6 text-lg">
          Tell us about your project and we&apos;ll recommend the right fit.
        </p>
        <Link
          href="/contact"
          style={{ backgroundColor: "#1a1a2e", color: "var(--color-cream)" }}
          className="inline-block px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "The Ink Bureau — Premium Article & Story Writing Studio",
  description:
    "The Ink Bureau crafts SEO-optimized articles, long-form content, and compelling stories. Human-written, deeply researched, deadline-driven. Explore our work or request a quote.",
  alternates: { canonical: "https://theinkbureau.com" },
  openGraph: {
    url: "https://theinkbureau.com",
    title: "The Ink Bureau — Premium Article & Story Writing Studio",
    description:
      "Professional content studio specializing in article writing and story writing. Human-crafted, SEO-optimized.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Ink Bureau",
  url: "https://theinkbureau.com",
  logo: "https://theinkbureau.com/og-default.png",
  description:
    "A premium content studio specializing in article writing, story writing, and content strategy.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "hello@theinkbureau.com",
    availableLanguage: "English",
  },
  sameAs: ["https://twitter.com/theinkbureau"],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What writing services does The Ink Bureau offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Ink Bureau offers article writing (blog posts, journalism-style features, SEO articles, long-form research pieces), story writing (short stories, narrative nonfiction, brand storytelling, series writing), and content strategy consulting.",
      },
    },
    {
      "@type": "Question",
      name: "Is the content written by humans or AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All content produced by The Ink Bureau is 100% human-written by experienced writers. We do not use AI text generators. Every piece is deeply researched, original, and written with a genuine human voice.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to receive my article?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Turnaround times vary by project scope. Standard blog articles (500–1000 words) are typically delivered within 3–5 business days. Long-form pieces and in-depth research articles take 7–14 business days. Rush delivery is available.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer SEO-optimized content?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every article we write is optimized for search engines — including keyword integration, proper heading structure, meta descriptions, internal linking suggestions, and readability optimization.",
      },
    },
  ],
};

const services = [
  {
    icon: "📰",
    title: "Article Writing",
    desc: "From blog posts to long-form journalism, we craft articles that inform, engage, and rank on Google.",
    href: "/services#article-writing",
  },
  {
    icon: "📖",
    title: "Story Writing",
    desc: "Compelling short stories, narrative nonfiction, and brand storytelling that connects with your audience.",
    href: "/services#story-writing",
  },
  {
    icon: "🗺️",
    title: "Content Strategy",
    desc: "We map your content ecosystem — from editorial calendars to pillar-cluster architecture.",
    href: "/services#content-strategy",
  },
];

const trustSignals = [
  {
    icon: "🔍",
    title: "SEO-Optimized Content",
    desc: "Every piece is built with keyword strategy, proper heading hierarchy, and on-page SEO best practices baked in.",
  },
  {
    icon: "✍️",
    title: "Human Voice, Not AI Spam",
    desc: "Our writers are human. Every word is researched, crafted, and edited by real people who care about quality.",
  },
  {
    icon: "⏱️",
    title: "Deadline-Driven",
    desc: "We take deadlines seriously. On-time delivery is part of our commitment to every client.",
  },
  {
    icon: "🎯",
    title: "Niche-Deep Research",
    desc: "We go beyond the surface. Our content is backed by thorough research, credible sources, and subject-matter expertise.",
  },
];

const testimonials = [
  {
    quote:
      "The Ink Bureau transformed our content marketing. Their articles consistently rank on page one and drive real traffic.",
    name: "Sarah M.",
    role: "Marketing Director, TechFlow",
  },
  {
    quote:
      "Professional, punctual, and genuinely talented writers. Our brand voice has never sounded better.",
    name: "James K.",
    role: "Founder, Clarity Brands",
  },
  {
    quote:
      "I needed long-form research articles that could compete with industry leaders. The Ink Bureau delivered beyond expectations.",
    name: "Priya R.",
    role: "Content Lead, DataSight",
  },
];

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, var(--color-charcoal) 0%, #252542 100%)" }}
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-gold) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            style={{ color: "var(--color-gold)", fontFamily: "var(--font-inter)" }}
            className="text-sm uppercase tracking-widest font-semibold mb-4"
          >
            Premium Content Studio
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Words That Work.
            <br />
            <span style={{ color: "var(--color-gold)" }}>Stories That Stick.</span>
          </h1>
          <p
            style={{ color: "var(--color-cream)", opacity: 0.8 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            The Ink Bureau is a professional content studio crafting SEO-optimized articles,
            compelling narratives, and brand stories — all human-written, deeply researched,
            and delivered on time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              style={{
                border: "2px solid var(--color-gold)",
                color: "var(--color-gold)",
                fontFamily: "var(--font-inter)",
              }}
              className="px-8 py-3 rounded-full font-semibold hover:opacity-80 transition-opacity text-center"
            >
              Explore Our Work
            </Link>
            <Link
              href="/contact"
              style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e", fontFamily: "var(--font-inter)" }}
              className="px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Zone — between hero and services */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="ad-zone h-20 rounded-lg text-xs" aria-label="Advertisement placeholder">
          Ad Space — 728×90 Leaderboard
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              What We Write
            </h2>
            <p style={{ color: "var(--muted)" }} className="text-lg max-w-xl mx-auto">
              From authoritative long-form articles to vivid short stories — we cover the full
              spectrum of content creation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-xl font-bold mb-3"
                >
                  {s.title}
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-5">
                  {s.desc}
                </p>
                <Link
                  href={s.href}
                  style={{ color: "var(--color-gold)" }}
                  className="text-sm font-semibold hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: "var(--surface-alt)" }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Why Choose The Ink Bureau
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustSignals.map((t) => (
              <div key={t.title} className="text-center">
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-lg font-bold mb-2"
                >
                  {t.title}
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-3xl sm:text-4xl font-bold"
            >
              From the Bureau
            </h2>
            <Link
              href="/blog"
              style={{ color: "var(--color-gold)" }}
              className="text-sm font-semibold hover:underline hidden sm:block"
            >
              View All Posts →
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)" }} className="text-center py-10">
              Blog posts coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: "var(--color-charcoal)" }} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,168,76,0.25)",
                }}
                className="rounded-2xl p-8"
              >
                <div style={{ color: "var(--color-gold)" }} className="text-3xl mb-4">
                  &ldquo;
                </div>
                <p
                  style={{ color: "var(--color-cream)", opacity: 0.85 }}
                  className="text-sm leading-relaxed mb-6 italic"
                >
                  {t.quote}
                </p>
                <div>
                  <div
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
                    className="font-bold text-sm"
                  >
                    {t.name}
                  </div>
                  <div style={{ color: "var(--color-gold)", opacity: 0.8 }} className="text-xs mt-1">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
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

      {/* Footer CTA */}
      <section
        style={{ background: "linear-gradient(135deg, var(--color-gold-dark) 0%, var(--color-gold) 100%)" }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "#1a1a2e" }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Ready to Publish Something Great?
          </h2>
          <p className="mb-8 text-lg" style={{ color: "#1a1a2e", opacity: 0.8 }}>
            Let&apos;s work together on your next article, story, or content campaign.
          </p>
          <Link
            href="/contact"
            style={{ backgroundColor: "#1a1a2e", color: "var(--color-cream)" }}
            className="px-10 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity inline-block"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </>
  );
}

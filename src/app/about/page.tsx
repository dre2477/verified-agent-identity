import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About The Ink Bureau — Our Story & Philosophy",
  description:
    "Learn about The Ink Bureau — who we are, our writing philosophy, and why human-crafted content still matters. Meet our team of experienced content creators.",
  alternates: { canonical: "https://theinkbureau.com/about" },
  openGraph: {
    url: "https://theinkbureau.com/about",
    title: "About The Ink Bureau",
    description:
      "The Ink Bureau is a premium content studio built on the belief that great writing changes minds, builds brands, and outlasts algorithms.",
  },
};

const team = [
  {
    name: "Morgan Ellis",
    role: "Founder & Lead Writer",
    bio: "Morgan has 12+ years of experience in journalism, content marketing, and brand storytelling. Former staff writer at two national publications, Morgan founded The Ink Bureau to bring editorial-grade writing to brands and creators who demand the best.",
    specializations: ["Long-form journalism", "SEO content", "Brand voice"],
    experience: "12+ years",
  },
  {
    name: "Jordan Reyes",
    role: "Story Writing & Narrative Editor",
    bio: "Jordan is a published fiction author and narrative editor with deep expertise in short-form storytelling and brand narrative development. Jordan holds an MFA in Creative Writing and has edited hundreds of short stories and brand narratives.",
    specializations: ["Short fiction", "Narrative nonfiction", "Editorial development"],
    experience: "9+ years",
  },
  {
    name: "Sam Okafor",
    role: "Research & SEO Content Specialist",
    bio: "Sam brings a background in investigative journalism and search engine optimization to produce deeply researched, high-authority articles. Specializes in technical, scientific, and business content that ranks and converts.",
    specializations: ["Research journalism", "Technical writing", "SEO optimization"],
    experience: "7+ years",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ backgroundColor: "var(--color-charcoal)", borderBottom: "3px solid var(--color-gold)" }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div style={{ color: "var(--color-gold)" }} className="text-sm uppercase tracking-widest font-semibold mb-4">
            Who We Are
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            About The Ink Bureau
          </h1>
          <p style={{ color: "var(--color-cream)", opacity: 0.75 }} className="text-lg">
            A studio built on the belief that great writing changes minds, builds brands, and
            outlasts every algorithm update.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <h2
                style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                className="text-3xl font-bold mb-6"
              >
                Who We Are
              </h2>
              <p style={{ color: "var(--muted)" }} className="leading-relaxed mb-4">
                The Ink Bureau is a boutique content studio specializing in two things: articles that
                rank and stories that resonate. We work with brands, publishers, founders, and
                creators who believe that quality content is a long-term investment — not a
                commodity.
              </p>
              <p style={{ color: "var(--muted)" }} className="leading-relaxed mb-4">
                Founded in 2024, we operate at the intersection of journalism, SEO, and storytelling.
                Our team brings decades of combined experience from national newsrooms, digital
                marketing agencies, and creative writing programs.
              </p>
              <p style={{ color: "var(--muted)" }} className="leading-relaxed">
                Our niche is clear: deeply researched, human-written content that serves real readers
                first and search engines second — because that&apos;s exactly what Google rewards.
              </p>
            </div>
            <div
              style={{ backgroundColor: "var(--surface)", border: "2px solid var(--color-gold)" }}
              className="rounded-2xl p-8"
            >
              <div className="space-y-4">
                {[
                  { label: "Founded", value: "2024" },
                  { label: "Articles Published", value: "500+" },
                  { label: "Client Industries", value: "20+" },
                  { label: "Words Written", value: "2M+" },
                  { label: "Team Experience", value: "28+ combined years" },
                ].map((stat) => (
                  <div key={stat.label} style={{ borderBottom: "1px solid var(--border)" }} className="pb-4">
                    <div style={{ color: "var(--muted)" }} className="text-xs uppercase tracking-widest mb-1">
                      {stat.label}
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
                      className="text-2xl font-bold"
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--surface-alt)" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Our Philosophy
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "Human-Crafted, Always",
                body: "We don't use AI writing tools to generate content. Every word is written by an experienced human writer who has done the research, developed the argument, and refined the prose. We believe readers deserve that respect — and so do you.",
              },
              {
                title: "Research is Non-Negotiable",
                body: "Surface-level content is everywhere. We go deeper. Every article we write is backed by primary sources, credible data, and subject-matter investigation. We cite our sources, check our facts, and write with authority.",
              },
              {
                title: "Writing for Readers, Not Just Algorithms",
                body: "SEO is a means, not an end. We write for humans first — with clear structure, genuine insight, and engaging prose. Search engines reward exactly this kind of content, which is why our articles consistently rank long-term.",
              },
              {
                title: "Craft Matters",
                body: "We care about the quality of writing itself. Word choice, sentence rhythm, paragraph pacing — these aren't afterthoughts. A well-crafted piece earns more trust, keeps readers longer, and converts better. Always.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{ borderLeft: "4px solid var(--color-gold)", paddingLeft: "1.5rem" }}
              >
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-xl font-bold mb-3"
                >
                  {item.title}
                </h3>
                <p style={{ color: "var(--muted)" }} className="leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
          >
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member) => (
              <div
                key={member.name}
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-2xl p-8"
              >
                {/* Photo Placeholder */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "var(--color-charcoal)",
                    border: "3px solid var(--color-gold)",
                  }}
                  className="rounded-full flex items-center justify-center mb-5 text-2xl"
                >
                  ✒
                </div>
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-xl font-bold mb-1"
                >
                  {member.name}
                </h3>
                <div style={{ color: "var(--color-gold)" }} className="text-sm font-semibold mb-4">
                  {member.role}
                </div>
                <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-5">
                  {member.bio}
                </p>
                <div className="space-y-2">
                  <div style={{ color: "var(--fg)" }} className="text-xs font-semibold uppercase tracking-widest">
                    Specializations
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.specializations.map((s) => (
                      <span
                        key={s}
                        style={{ backgroundColor: "var(--surface-alt)", color: "var(--muted)", border: "1px solid var(--border)" }}
                        className="text-xs px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: "var(--muted)" }} className="text-xs mt-3">
                    Experience: <span style={{ color: "var(--color-gold)" }} className="font-semibold">{member.experience}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-E-A-T Signals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--color-charcoal)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-2xl font-bold mb-8"
          >
            Credentials & Experience
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { icon: "🏆", label: "28+", desc: "Combined years of writing experience" },
              { icon: "📰", label: "2 Publications", desc: "National editorial background" },
              { icon: "🎓", label: "MFA Educated", desc: "Formal creative writing credentials" },
              { icon: "📊", label: "20+ Industries", desc: "Cross-sector content expertise" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
                  className="text-xl font-bold mb-1"
                >
                  {item.label}
                </div>
                <div style={{ color: "var(--color-cream)", opacity: 0.7 }} className="text-xs">
                  {item.desc}
                </div>
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
          Let&apos;s Create Something Together
        </h2>
        <Link
          href="/contact"
          style={{ backgroundColor: "#1a1a2e", color: "var(--color-cream)" }}
          className="inline-block px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </section>
    </>
  );
}

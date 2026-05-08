import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Request a Quote",
  description:
    "Get in touch with The Ink Bureau to request a writing quote, discuss a project, or ask about our services. We reply within 24 hours.",
  alternates: { canonical: "https://theinkbureau.com/contact" },
  openGraph: {
    url: "https://theinkbureau.com/contact",
    title: "Contact The Ink Bureau",
    description: "Request a writing quote or discuss your project. We reply within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ backgroundColor: "var(--color-charcoal)", borderBottom: "3px solid var(--color-gold)" }}
        className="py-20 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div style={{ color: "var(--color-gold)" }} className="text-sm uppercase tracking-widest font-semibold mb-4">
            Let&apos;s Talk
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Start a Project
          </h1>
          <p style={{ color: "var(--color-cream)", opacity: 0.75 }} className="text-lg">
            Tell us about your writing needs and we&apos;ll get back to you within 24 hours with a
            custom proposal.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-14">
          {/* Contact Info */}
          <div className="md:col-span-2">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-2xl font-bold mb-6"
            >
              Contact Information
            </h2>
            <div className="space-y-6">
              <div style={{ borderLeft: "4px solid var(--color-gold)", paddingLeft: "1rem" }}>
                <div style={{ color: "var(--fg)" }} className="font-semibold text-sm mb-1">
                  Email
                </div>
                <a
                  href="mailto:hello@theinkbureau.com"
                  style={{ color: "var(--color-gold)" }}
                  className="text-sm hover:underline"
                >
                  hello@theinkbureau.com
                </a>
              </div>
              <div style={{ borderLeft: "4px solid var(--color-gold)", paddingLeft: "1rem" }}>
                <div style={{ color: "var(--fg)" }} className="font-semibold text-sm mb-1">
                  Response Time
                </div>
                <p style={{ color: "var(--muted)" }} className="text-sm">
                  We reply within <strong style={{ color: "var(--fg)" }}>24 hours</strong> on
                  business days.
                </p>
              </div>
              <div style={{ borderLeft: "4px solid var(--color-gold)", paddingLeft: "1rem" }}>
                <div style={{ color: "var(--fg)" }} className="font-semibold text-sm mb-1">
                  Working Hours
                </div>
                <p style={{ color: "var(--muted)" }} className="text-sm">
                  Monday – Friday, 9am – 6pm EST
                </p>
              </div>
            </div>

            <div
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
              className="rounded-2xl p-6 mt-10"
            >
              <h3
                style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                className="text-lg font-bold mb-4"
              >
                What to Include
              </h3>
              <ul className="space-y-2">
                {[
                  "Type of content needed",
                  "Approximate word count or length",
                  "Target audience",
                  "Deadline or timeline",
                  "Any reference examples",
                ].map((item) => (
                  <li key={item} style={{ color: "var(--muted)" }} className="text-sm flex gap-2">
                    <span style={{ color: "var(--color-gold)" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section
      style={{ backgroundColor: "var(--bg)" }}
      className="min-h-[60vh] flex items-center justify-center px-4 py-20"
    >
      <div className="text-center max-w-lg">
        <div
          style={{ color: "var(--color-gold)", fontFamily: "var(--font-playfair)" }}
          className="text-8xl font-bold mb-4"
        >
          404
        </div>
        <h1
          style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
          className="text-3xl font-bold mb-4"
        >
          Page Not Found
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have wandered off. Perhaps it was edited out in
          revision, or never made it past the first draft.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
            className="px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
          <Link
            href="/blog"
            style={{ border: "2px solid var(--color-gold)", color: "var(--color-gold)" }}
            className="px-8 py-3 rounded-full font-semibold hover:opacity-80 transition-opacity"
          >
            Browse the Blog
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/blog";
import BlogListClient from "@/components/BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Writing Tips, Articles & Stories",
  description:
    "The Ink Bureau blog: expert articles on writing craft, content strategy, SEO writing, storytelling techniques, and the art of long-form content.",
  alternates: { canonical: "https://theinkbureau.com/blog" },
  openGraph: {
    url: "https://theinkbureau.com/blog",
    title: "The Ink Bureau Blog",
    description:
      "Writing tips, story craft insights, SEO content guides, and behind-the-scenes from a professional content studio.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      {/* Hero */}
      <section
        style={{ backgroundColor: "var(--color-charcoal)", borderBottom: "3px solid var(--color-gold)" }}
        className="py-16 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div style={{ color: "var(--color-gold)" }} className="text-sm uppercase tracking-widest font-semibold mb-4">
            The Bureau
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Our Writing Journal
          </h1>
          <p style={{ color: "var(--color-cream)", opacity: 0.75 }} className="text-lg">
            Craft, strategy, and stories — from the writers behind the bureau.
          </p>
        </div>
      </section>

      {/* Blog List with Filter */}
      <BlogListClient posts={posts} categories={CATEGORIES} />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Post, PostMeta } from "@/lib/blog";
import BlogCard from "./BlogCard";
import BlogPostContent from "./BlogPostContent";

export default function BlogPostClient({
  post,
  related,
}: {
  post: Post;
  related: PostMeta[];
}) {
  return (
    <>
      {/* Post Hero */}
      <section
        style={{ backgroundColor: "var(--color-charcoal)" }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/blog"
              style={{ color: "var(--color-gold)", opacity: 0.8 }}
              className="text-sm hover:underline"
            >
              ← Back to Blog
            </Link>
            <span style={{ color: "var(--color-gold)" }}>·</span>
            <span
              style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
              className="text-xs font-semibold px-3 py-1 rounded-full"
            >
              {post.category}
            </span>
          </div>
          <h1
            style={{ fontFamily: "var(--font-playfair)", color: "var(--color-cream)" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          >
            {post.title}
          </h1>
          <div
            className="flex flex-wrap items-center gap-4"
            style={{ color: "var(--color-cream)", opacity: 0.65 }}
          >
            <span className="text-sm">By {post.author}</span>
            <span>·</span>
            <span className="text-sm">{post.date}</span>
            <span>·</span>
            <span className="text-sm">{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div
        className="relative w-full h-72 sm:h-96 overflow-hidden"
        style={{ backgroundColor: "var(--surface-alt)" }}
      >
        <Image
          src={post.featuredImage}
          alt={`Featured image for ${post.title}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--color-gold)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <h2
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--color-gold)" }}
                  className="text-lg font-bold mb-3"
                >
                  ✦ Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {post.keyTakeaways.map((item, i) => (
                    <li key={i} style={{ color: "var(--fg)" }} className="text-sm flex gap-2">
                      <span style={{ color: "var(--color-gold)", marginTop: "2px" }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MDX Content - rendered server-side */}
            <div className="prose">
              <BlogPostContent content={post.content} />
            </div>

            {/* Ad Zone — after content */}
            <div
              className="ad-zone h-24 rounded-lg my-8 text-xs"
              aria-label="Advertisement"
            >
              Ad Space — 728×90 In-Content
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "var(--surface-alt)",
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                      }}
                      className="text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Links */}
            <div
              style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
              className="rounded-xl p-6 mt-10"
            >
              <h3
                style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                className="text-lg font-bold mb-4"
              >
                Explore More
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { href: "/services", label: "Our Writing Services" },
                  { href: "/blog", label: "All Blog Posts" },
                  { href: "/contact", label: "Request a Quote" },
                  { href: "/about", label: "About The Ink Bureau" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ color: "var(--color-gold)" }}
                    className="text-sm font-medium hover:underline"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Ad Zone — right sidebar */}
              <div
                className="ad-zone rounded-lg text-xs"
                style={{ height: "600px" }}
                aria-label="Advertisement"
              >
                Ad Space — 300×600 Sidebar
              </div>

              {/* About Box */}
              <div
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
                className="rounded-xl p-5"
              >
                <h3
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
                  className="text-base font-bold mb-2"
                >
                  About The Ink Bureau
                </h3>
                <p style={{ color: "var(--muted)" }} className="text-xs leading-relaxed mb-4">
                  A premium content studio specializing in human-crafted, SEO-optimized articles
                  and compelling stories.
                </p>
                <Link
                  href="/services"
                  style={{ color: "var(--color-gold)" }}
                  className="text-xs font-semibold hover:underline"
                >
                  View Our Services →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2
              style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
              className="text-2xl font-bold mb-8"
            >
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

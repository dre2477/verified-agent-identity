import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <article
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
      className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full bg-gradient-to-br from-charcoal to-charcoal-light overflow-hidden"
        style={{ backgroundColor: "var(--color-charcoal)" }}>
        <Image
          src={post.featuredImage}
          alt={`Featured image for ${post.title}`}
          fill
          className="object-cover opacity-80"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
            className="text-xs font-semibold px-3 py-1 rounded-full"
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3" style={{ color: "var(--muted)" }}>
          <span className="text-xs">{post.date}</span>
          <span className="text-xs">·</span>
          <span className="text-xs">{post.readTime}</span>
        </div>
        <h2
          style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
          className="text-lg font-bold mb-3 leading-snug"
        >
          <Link href={`/blog/${post.slug}`} className="hover:opacity-70 transition-opacity">
            {post.title}
          </Link>
        </h2>
        <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          style={{ color: "var(--color-gold)" }}
          className="text-sm font-semibold hover:underline"
        >
          Read Article →
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="relative h-48 w-full" style={{ backgroundColor: "var(--charcoal)" }}>
        {post.featured_image_url ? (
          <Image src={post.featured_image_url} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl" style={{ backgroundColor: "#1a1a2e" }}>✒</div>
        )}
        {post.categories && (
          <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>{post.categories.name}</span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--muted)" }}>
          <span>{formatDate(post.created_at)}</span>
          {post.read_time && <><span>·</span><span>{post.read_time} min read</span></>}
        </div>
        <h2 className="text-lg font-bold mb-3 leading-snug font-serif" style={{ color: "var(--fg)" }}>
          <Link href={`/blog/${post.slug}`} className="hover:opacity-70 transition-opacity">{post.title}</Link>
        </h2>
        {post.excerpt && <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--muted)" }}>{post.excerpt}</p>}
        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold hover:underline" style={{ color: "#c9a84c" }}>Read Article →</Link>
      </div>
    </article>
  );
}

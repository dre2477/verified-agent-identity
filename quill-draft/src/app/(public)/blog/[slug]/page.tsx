export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { formatDate, SITE_NAME, SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import type { Post, Category } from "@/lib/supabase/types";

type PostFull = Post & { categories: Category | null };

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: rawMeta } = await supabase
    .from("posts")
    .select("title, excerpt, featured_image_url, slug")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!rawMeta) return { title: "Not Found" };
  const post = rawMeta as unknown as Pick<Post, "title" | "excerpt" | "featured_image_url" | "slug">;

  return {
    title: post.title,
    description: post.excerpt ?? `${post.title} — ${SITE_NAME}`,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `${SITE_URL}/blog/${post.slug}`,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : [{ url: "/og-default.png" }],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const supabase = createServerClient();
  const { data: rawPost } = await supabase
    .from("posts")
    .select("*, categories(id,name,slug,created_at)")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!rawPost) notFound();
  const post = rawPost as unknown as PostFull;

  const { data: relatedRaw } = await supabase
    .from("posts")
    .select("id,title,slug,excerpt,created_at,featured_image_url,read_time,category_id,categories(id,name,slug,created_at)")
    .eq("status", "published")
    .neq("id", post.id)
    .eq("category_id", post.category_id ?? "")
    .limit(3);
  const related = (relatedRaw ?? []) as unknown as PostFull[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    image: post.featured_image_url ?? `${SITE_URL}/og-default.png`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-1" style={{ color: "var(--muted)" }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          {post.categories && (
            <>
              <span>›</span>
              <Link href={`/category/${post.categories!.slug}`} className="hover:underline">{post.categories!.name}</Link>
            </>
          )}
        </nav>

        {/* Category badge */}
        {post.categories && (
          <Link href={`/category/${post.categories!.slug}`}>
            <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
              {post.categories!.name}
            </span>
          </Link>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight" style={{ color: "var(--fg)" }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8 text-sm" style={{ color: "var(--muted)" }}>
          <span>{formatDate(post.created_at)}</span>
          {post.read_time && <><span>·</span><span>{post.read_time} min read</span></>}
        </div>

        {/* Featured image */}
        {post.featured_image_url && (
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share */}
        <div className="mt-12 pt-8 flex items-center gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-sm font-semibold" style={{ color: "var(--muted)" }}>Share:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}
          >
            𝕏 Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)}`}
            target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}
          >
            LinkedIn
          </a>
        </div>
      </article>

      {/* Ad zone — hidden until AdSense is activated */}
      {/* <div className="ad-zone h-20 max-w-3xl mx-auto my-6 mx-4">[ Advertisement ]</div> */}

      {/* Related posts */}
      {related && related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold font-serif mb-6" style={{ color: "var(--fg)" }}>Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(r => (
              <div key={r.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="h-36" style={{ backgroundColor: "#1a1a2e" }}>
                  {r.featured_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.featured_image_url} alt={r.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">✒</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold font-serif mb-2 text-sm leading-snug" style={{ color: "var(--fg)" }}>
                    <Link href={`/blog/${r.slug}`} className="hover:opacity-70">{r.title}</Link>
                  </h3>
                  <Link href={`/blog/${r.slug}`} className="text-xs font-semibold hover:underline" style={{ color: "#c9a84c" }}>Read →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

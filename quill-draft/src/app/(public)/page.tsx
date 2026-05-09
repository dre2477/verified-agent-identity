export const dynamic = "force-dynamic";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import PostCard from "@/components/PostCard";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/utils";
import type { Metadata } from "next";
import type { Post, Category } from "@/lib/supabase/types";

type PostFull = Post & { categories: Category | null };

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: "A premier editorial blog covering ideas, curiosity, and craft. Thoughtful long-form writing on topics that matter.",
  openGraph: { url: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
};

export default async function HomePage() {
  // Debug: confirm env vars are present
  console.log("[HomePage] SUPABASE_URL set:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("[HomePage] SUPABASE_ANON_KEY set:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const supabase = createServerClient();

  const [
    { data: posts, error: postsError },
    { data: categories, error: categoriesError },
    { data: settingsRows },
  ] = await Promise.all([
    supabase
      .from("posts")
      .select("*, categories(id,name,slug,created_at)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase.from("categories").select("*").order("name"),
    supabase.from("site_settings").select("*"),
  ]);

  console.log("[HomePage] posts fetched:", posts?.length ?? 0);
  if (postsError) console.error("[HomePage] posts error:", postsError.message);
  if (categoriesError) console.error("[HomePage] categories error:", categoriesError.message);

  const settings: Record<string, string> = {};
  (settingsRows ?? []).forEach((row: { key: string; value: string }) => { settings[row.key] = row.value; });

  const allPosts = (posts ?? []) as unknown as PostFull[];
  const allCategories = (categories ?? []) as unknown as Category[];
  const featured = allPosts[0] ?? null;
  const recent = allPosts.slice(1);
  const heroImageUrl = settings.hero_image_url ?? "";
  const siteTagline = settings.site_tagline || SITE_TAGLINE;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-24 px-4 relative overflow-hidden"
        style={heroImageUrl
          ? { backgroundImage: `url(${heroImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "linear-gradient(135deg, #1a1a2e 0%, #252542 100%)" }
        }>
        {heroImageUrl && <div className="absolute inset-0" style={{ backgroundColor: "rgba(26,26,46,0.72)" }} />}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#c9a84c" }}>
            Editorial Blog
          </p>
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6 leading-tight" style={{ color: "#f5f0e8" }}>
            {SITE_NAME}
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-serif italic" style={{ color: "#c9a84c" }}>
            {siteTagline}
          </p>
          <p className="text-base max-w-xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(245,240,232,0.75)" }}>
            A home for thoughtful long-form writing. Dive into ideas that challenge, inspire, and stay with you long after you&apos;ve finished reading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
              Read the Blog
            </Link>
            <Link href="/about" className="px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80" style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#f5f0e8" }}>
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-16 px-4" style={{ backgroundColor: "var(--surface-alt)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--gold)" }}>Featured Article</span>
              <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
            </div>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden" style={{ backgroundColor: "#1a1a2e" }}>
                {featured.featured_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.featured_image_url} alt={featured.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">✒</div>
                )}
              </div>
              <div>
                {featured.categories && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
                    {featured.categories.name}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 leading-snug" style={{ color: "var(--fg)" }}>
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>{featured.excerpt}</p>
                )}
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all" style={{ color: "#c9a84c" }}>
                  Read Full Article <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recent.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-bold font-serif" style={{ color: "var(--fg)" }}>Recent Articles</h2>
              <Link href="/blog" className="text-sm font-semibold hover:underline" style={{ color: "#c9a84c" }}>View All →</Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {allCategories.length > 0 && (
        <section className="py-16 px-4" style={{ backgroundColor: "var(--surface-alt)" }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Browse by Topic</h2>
            <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>Explore our curated categories</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {allCategories.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 px-4" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #252542 100%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-serif mb-3" style={{ color: "#f5f0e8" }}>Stay in the Loop</h2>
          <p className="text-sm mb-6" style={{ color: "rgba(245,240,232,0.7)" }}>
            New articles delivered to your inbox. No spam — just thoughtful writing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
              style={{ backgroundColor: "rgba(245,240,232,0.1)", border: "1px solid rgba(201,168,76,0.4)", color: "#f5f0e8" }}
            />
            <button className="px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
              Subscribe
            </button>
          </div>
          <p className="text-xs mt-3" style={{ color: "rgba(245,240,232,0.4)" }}>No commitment. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}

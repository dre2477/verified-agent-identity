import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import BlogPostClient from "@/components/BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || post.excerpt,
    alternates: { canonical: `https://theinkbureau.com/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `https://theinkbureau.com/blog/${slug}`,
      title: post.title,
      description: post.description || post.excerpt,
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://theinkbureau.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "The Ink Bureau",
      logo: {
        "@type": "ImageObject",
        url: "https://theinkbureau.com/og-default.png",
      },
    },
    image: post.featuredImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://theinkbureau.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient post={post} related={related} />
    </>
  );
}

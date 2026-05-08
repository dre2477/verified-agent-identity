import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  keyTakeaways?: string[];
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);
    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      category: data.category ?? "Articles",
      author: data.author ?? "The Ink Bureau Team",
      readTime: rt.text,
      excerpt: data.excerpt ?? content.slice(0, 160).replace(/[#*`]/g, ""),
      featuredImage: data.featuredImage ?? "/images/blog-placeholder.svg",
      tags: data.tags ?? [],
      keyTakeaways: data.keyTakeaways ?? [],
    } as PostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "Articles",
    author: data.author ?? "The Ink Bureau Team",
    readTime: rt.text,
    excerpt: data.excerpt ?? content.slice(0, 160).replace(/[#*`]/g, ""),
    featuredImage: data.featuredImage ?? "/images/blog-placeholder.svg",
    tags: data.tags ?? [],
    keyTakeaways: data.keyTakeaways ?? [],
    content,
  };
}

export function getPostsByCategory(category: string): PostMeta[] {
  if (category === "All") return getAllPosts();
  return getAllPosts().filter((p) => p.category === category);
}

export const CATEGORIES = ["All", "Articles", "Stories", "Writing Tips", "Behind the Craft"];

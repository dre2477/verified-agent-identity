import slugifyLib from "slugify";

export function slugify(text: string): string {
  return slugifyLib(text, { lower: true, strict: true, trim: true });
}

export function calcReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export function truncate(str: string, n: number): string {
  const plain = str.replace(/<[^>]*>/g, "");
  return plain.length > n ? plain.slice(0, n).trim() + "…" : plain;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://the-quill-draft.netlify.app";
export const SITE_NAME = "The Quill Draft";
export const SITE_TAGLINE = "Where Curiosity Meets Craft";

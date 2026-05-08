import Link from "next/link";
import { SITE_NAME } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold font-serif mb-4" style={{ color: "#c9a84c" }}>404</div>
        <h1 className="text-2xl font-bold font-serif mb-3" style={{ color: "var(--fg)" }}>
          This Page Seems to Have Wandered Off
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a different address.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="px-6 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>
            Back to Home
          </Link>
          <Link href="/blog" className="px-6 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ border: "1px solid var(--border)", color: "var(--fg)" }}>
            Browse Articles
          </Link>
        </div>
        <p className="mt-8 text-xs" style={{ color: "var(--muted)" }}>{SITE_NAME} · ✒</p>
      </div>
    </div>
  );
}

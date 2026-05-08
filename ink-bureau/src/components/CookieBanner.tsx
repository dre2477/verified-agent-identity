"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--color-charcoal)",
        borderTop: "2px solid var(--color-gold)",
        color: "var(--color-cream)",
      }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm leading-relaxed" style={{ opacity: 0.9 }}>
          We use cookies to improve your experience, analyze site traffic, and serve relevant content. We also participate in the Google AdSense program, which uses cookies to serve personalized ads.{" "}
          <Link href="/privacy-policy" style={{ color: "var(--color-gold)" }} className="underline">
            Learn more
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            style={{ border: "1px solid rgba(201,168,76,0.5)", color: "var(--color-cream)" }}
            className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Decline
          </button>
          <button
            onClick={accept}
            style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
            className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

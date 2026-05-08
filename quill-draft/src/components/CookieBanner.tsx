"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem("cookie-consent")) setVisible(true); }, []);
  if (!visible) return null;
  const accept = () => { localStorage.setItem("cookie-consent", "accepted"); setVisible(false); };
  const decline = () => { localStorage.setItem("cookie-consent", "declined"); setVisible(false); };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4" style={{ backgroundColor: "#1a1a2e", borderTop: "2px solid #c9a84c", color: "#f5f0e8" }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm leading-relaxed" style={{ opacity: 0.9 }}>
          We use cookies to improve your experience and serve relevant ads via Google AdSense.{" "}
          <Link href="/privacy-policy" className="underline" style={{ color: "#c9a84c" }}>Learn more</Link>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={decline} className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity" style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#f5f0e8" }}>Decline</button>
          <button onClick={accept} className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity" style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}>Accept All</button>
        </div>
      </div>
    </div>
  );
}

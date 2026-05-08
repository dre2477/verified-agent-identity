"use client";
import { useState } from "react";
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1000));
    setStatus("sent");
    setName(""); setEmail(""); setSubject(""); setMessage("");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { backgroundColor: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: "#c9a84c" }}>Get in Touch</span>
        <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Contact Us</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Have a pitch, question, or just want to say hello? We read every message.
        </p>
      </div>

      {status === "sent" ? (
        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Message Sent!</h2>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Thank you for reaching out. We typically respond within 2 business days.
          </p>
          <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold hover:underline" style={{ color: "#c9a84c" }}>
            Send another message
          </button>
        </div>
      ) : (
        <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>Your Name *</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="Jane Smith" className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>Email Address *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="jane@example.com" className={inputClass} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>Subject</label>
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                placeholder="What is this about?" className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>Message *</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={6}
                placeholder={`Tell us what's on your mind…`}
                className={inputClass} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === "sending" || !name || !email || !message}
              className="w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#c9a84c", color: "#1a1a2e" }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-10 text-center text-sm" style={{ color: "var(--muted)" }}>
        <p>We typically respond within 2 business days.</p>
        <p className="mt-1">For editorial pitches, please include a brief 2-3 sentence summary.</p>
      </div>
    </div>
  );
}

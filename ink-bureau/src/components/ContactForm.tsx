"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const initialState: FormState = { name: "", email: "", service: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setForm(initialState);
  };

  if (submitted) {
    return (
      <div
        style={{ backgroundColor: "var(--surface)", border: "2px solid var(--color-gold)" }}
        className="rounded-2xl p-10 text-center"
      >
        <div className="text-5xl mb-4">✉️</div>
        <h3
          style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
          className="text-2xl font-bold mb-3"
        >
          Message Received!
        </h3>
        <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-6">
          Thank you for reaching out. We&apos;ll review your inquiry and reply within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e" }}
          className="px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  const fieldStyle = {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--fg)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    fontFamily: "var(--font-inter)",
    fontSize: "0.9rem",
    outline: "none",
  };

  return (
    <div
      style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
      className="rounded-2xl p-8"
    >
      <h2
        style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }}
        className="text-2xl font-bold mb-6"
      >
        Send Us a Message
      </h2>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            style={{ color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}
          >
            Full Name <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            style={fieldStyle}
            aria-label="Full name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            style={{ color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}
          >
            Email Address <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={fieldStyle}
            aria-label="Email address"
          />
        </div>

        {/* Service */}
        <div>
          <label
            style={{ color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}
          >
            Service Type
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            style={{ ...fieldStyle, cursor: "pointer" }}
            aria-label="Service type"
          >
            <option value="">Select a service...</option>
            <option value="blog-articles">Blog Articles</option>
            <option value="long-form">Research-Based Long-Form</option>
            <option value="seo-articles">SEO Articles</option>
            <option value="journalism-features">Journalism-Style Features</option>
            <option value="short-stories">Short Stories</option>
            <option value="narrative-nonfiction">Narrative Nonfiction</option>
            <option value="brand-storytelling">Brand Storytelling</option>
            <option value="series-writing">Series Writing</option>
            <option value="content-strategy">Content Strategy</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            style={{ color: "var(--fg)", fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: "0.4rem" }}
          >
            Message <span style={{ color: "var(--color-gold)" }}>*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project — content type, word count, deadline, audience, etc."
            rows={6}
            style={{ ...fieldStyle, resize: "vertical" }}
            aria-label="Message"
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#e05252" }} className="text-sm">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: "var(--color-gold)", color: "#1a1a2e", width: "100%" }}
          className="py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Send Message
        </button>

        <p style={{ color: "var(--muted)" }} className="text-xs text-center">
          We reply within 24 hours on business days.
        </p>
      </div>
    </div>
  );
}

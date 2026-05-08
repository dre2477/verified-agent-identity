import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}`,
  openGraph: { url: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Privacy Policy</h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      <div className="prose max-w-none" style={{ color: "var(--fg)" }}>
        <h2>1. Information We Collect</h2>
        <p>
          When you visit {SITE_NAME}, we may collect certain information automatically, including your IP address,
          browser type, operating system, referring URLs, and pages visited. This information helps us understand
          how visitors use our site and improve our content.
        </p>
        <p>
          If you submit a contact form, we collect the name, email address, and message you provide. We use this
          information solely to respond to your inquiry.
        </p>

        <h2>2. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our site. These include:
        </p>
        <ul>
          <li><strong>Essential cookies:</strong> Required for the site to function properly (e.g., theme preference).</li>
          <li><strong>Analytics cookies:</strong> Help us understand visitor behavior (Google Analytics).</li>
          <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant ads based on your interests.</li>
        </ul>
        <p>
          You can manage or disable cookies through your browser settings. Note that disabling certain cookies
          may affect site functionality.
        </p>

        <h2>3. Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements. Google and its partners may use cookies and web
          beacons to serve ads based on your visits to our site and other websites on the Internet. You can
          opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
        </p>

        <h2>4. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our website</li>
          <li>Respond to your messages and inquiries</li>
          <li>Analyze site traffic and user behavior</li>
          <li>Display relevant advertisements</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share information
          with trusted third-party service providers (such as Google Analytics and Google AdSense) who assist
          us in operating our website, subject to their own privacy policies.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain contact form submissions for up to 12 months. Analytics data is retained per Google&apos;s
          standard retention policies.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights regarding your personal data, including the right to
          access, correct, or delete your information. To exercise these rights, contact us via our{" "}
          <a href="/contact">contact page</a>.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our site is not directed at children under the age of 13. We do not knowingly collect personal
          information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. We will notify you of significant changes by posting
          the new policy on this page with an updated date.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us via our{" "}
          <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}

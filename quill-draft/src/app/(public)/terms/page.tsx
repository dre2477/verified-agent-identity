import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${SITE_NAME}`,
  openGraph: { url: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Terms &amp; Conditions</h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      <div className="prose max-w-none" style={{ color: "var(--fg)" }}>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using {SITE_NAME} (&quot;the Site&quot;), you accept and agree to be bound by these
          Terms and Conditions. If you do not agree to these terms, please do not use our site.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          All content published on {SITE_NAME}, including articles, images, graphics, and other materials,
          is protected by copyright and other intellectual property laws. You may not reproduce, distribute,
          or create derivative works without express written permission.
        </p>
        <p>
          You may share links to our articles and quote brief excerpts (under 100 words) with proper
          attribution and a link back to the original article.
        </p>

        <h2>3. User Conduct</h2>
        <p>When using our site, you agree not to:</p>
        <ul>
          <li>Violate any applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to any part of the site</li>
          <li>Transmit any harmful, offensive, or malicious content</li>
          <li>Interfere with the proper functioning of the site</li>
          <li>Scrape or harvest content in bulk without permission</li>
        </ul>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The content on {SITE_NAME} is provided for informational purposes only. While we strive for
          accuracy, we make no warranties or representations regarding the completeness, accuracy, or
          reliability of any content. Use of our content is at your own risk.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          {SITE_NAME} shall not be liable for any direct, indirect, incidental, special, or consequential
          damages arising from your use of the site or reliance on any content published herein.
        </p>

        <h2>6. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. These links are provided for your convenience.
          We do not endorse or control the content of third-party sites and are not responsible for their
          privacy practices or content.
        </p>

        <h2>7. Advertising</h2>
        <p>
          {SITE_NAME} displays advertisements through Google AdSense. Advertisements are clearly separated
          from editorial content. We do not endorse the products or services advertised.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued use of the site after changes
          are posted constitutes acceptance of the revised terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these Terms, please contact us via our <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}

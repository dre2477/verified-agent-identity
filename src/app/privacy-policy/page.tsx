import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "The Ink Bureau Privacy Policy — how we collect, use, and protect your data, including our use of cookies and participation in Google AdSense.",
  alternates: { canonical: "https://theinkbureau.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }} className="text-4xl font-bold mb-2">
        Privacy Policy
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-10">Last updated: January 1, 2026</p>

      <div className="prose">
        <p>
          This Privacy Policy describes how <strong>The Ink Bureau</strong> ("we," "us," or "our"),
          operating at <strong>theinkbureau.com</strong>, collects, uses, and shares information about
          you when you visit our website or use our services.
        </p>
        <p>
          By using our website, you agree to the collection and use of information in accordance with
          this policy.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Information You Provide</h3>
        <p>
          When you fill out our contact form or request a quote, we collect the following information:
        </p>
        <ul>
          <li>Your full name</li>
          <li>Your email address</li>
          <li>Your message or project description</li>
          <li>The type of service you are inquiring about</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our website, we may automatically collect certain information, including:
        </p>
        <ul>
          <li>IP address and general location data</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring website or search query</li>
          <li>Device type and operating system</li>
        </ul>

        <h2>2. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies — small text files stored on your device — to improve your experience on our
          website. Cookies help us understand how visitors use our site, remember your preferences, and
          serve relevant content.
        </p>
        <h3>Types of Cookies We Use</h3>
        <ul>
          <li><strong>Essential cookies:</strong> Required for the website to function properly.</li>
          <li><strong>Analytics cookies:</strong> Help us understand site traffic and visitor behavior (e.g., Google Analytics).</li>
          <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve personalized advertisements (see Section 3 below).</li>
          <li><strong>Preference cookies:</strong> Remember your settings, such as dark/light mode selection.</li>
        </ul>
        <p>
          You can control cookie preferences through your browser settings or by using our cookie
          consent banner. Note that disabling cookies may affect site functionality.
        </p>

        <h2>3. Google AdSense</h2>
        <p>
          The Ink Bureau participates in the <strong>Google AdSense</strong> program. Google AdSense
          uses cookies to serve ads based on your prior visits to this website and other websites on
          the internet.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based
          on your visit to our site and/or other sites on the internet. You may opt out of personalized
          advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>
        <p>
          For more information about how Google uses data, please visit{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy & Terms
          </a>
          .
        </p>

        <h2>4. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide writing services</li>
          <li>Improve and optimize our website experience</li>
          <li>Analyze site traffic and visitor behavior</li>
          <li>Serve relevant advertisements through Google AdSense</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>5. Sharing of Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your
          information only in the following circumstances:
        </p>
        <ul>
          <li>With service providers who assist in operating our website (e.g., hosting services)</li>
          <li>With advertising partners (Google AdSense) as described above</li>
          <li>When required by law or to protect our legal rights</li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          We retain contact form submissions for up to 12 months. Analytics data is retained according
          to our analytics provider&apos;s policies. You may request deletion of your data at any time by
          contacting us at the email address below.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>The right to access the personal data we hold about you</li>
          <li>The right to request correction or deletion of your data</li>
          <li>The right to object to processing of your data</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:hello@theinkbureau.com">hello@theinkbureau.com</a>.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the privacy
          practices of those sites and encourage you to review their privacy policies.
        </p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>
          Our website is not directed to children under the age of 13. We do not knowingly collect
          personal information from children. If you believe a child has provided us with personal
          information, please contact us immediately.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant changes
          by updating the "Last updated" date at the top of this page. Your continued use of our website
          after any changes constitutes acceptance of the updated policy.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please contact us at:
          <br />
          <strong>The Ink Bureau</strong>
          <br />
          Email: <a href="mailto:hello@theinkbureau.com">hello@theinkbureau.com</a>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The Ink Bureau Terms & Conditions — the terms that govern use of our website and writing services.",
  alternates: { canonical: "https://theinkbureau.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }} className="text-4xl font-bold mb-2">
        Terms &amp; Conditions
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-10">Last updated: January 1, 2026</p>

      <div className="prose">
        <p>
          Please read these Terms &amp; Conditions carefully before using the website{" "}
          <strong>theinkbureau.com</strong> or engaging our writing services. By accessing our website
          or placing an order, you agree to be bound by these Terms.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using The Ink Bureau website, you agree to comply with and be bound by these
          Terms &amp; Conditions. If you do not agree, please do not use our website or services.
        </p>

        <h2>2. Services</h2>
        <p>
          The Ink Bureau provides professional writing services including, but not limited to, article
          writing, story writing, content strategy, and related content creation services. The specific
          scope, deliverables, and pricing of any engagement are agreed upon in writing prior to
          commencement of work.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          Upon receipt of full payment, The Ink Bureau assigns all intellectual property rights to the
          delivered content to the client. Before final payment, all content remains the property of
          The Ink Bureau.
        </p>
        <p>
          The Ink Bureau retains the right to use anonymized samples of work for portfolio or
          promotional purposes unless otherwise agreed in writing.
        </p>

        <h2>4. Payment Terms</h2>
        <p>
          Payment terms are specified in individual project agreements. In general:
        </p>
        <ul>
          <li>A deposit may be required before work commences on larger projects</li>
          <li>Final payment is due upon delivery of completed work</li>
          <li>Late payments may incur additional fees as specified in the project agreement</li>
        </ul>

        <h2>5. Revisions and Approvals</h2>
        <p>
          The number of revision rounds included in a project is specified in the individual project
          agreement. Revisions requested beyond the agreed scope may be subject to additional fees.
        </p>

        <h2>6. Deadlines</h2>
        <p>
          We are committed to delivering work by agreed deadlines. If a deadline cannot be met due to
          circumstances within our control, we will notify the client promptly and provide a revised
          timeline. Delays caused by the client (e.g., late provision of brief materials) may result
          in adjusted deadlines.
        </p>

        <h2>7. Confidentiality</h2>
        <p>
          We treat all client information and project details as confidential. We will not disclose
          your project details to third parties without your consent, except as required by law.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, The Ink Bureau shall not be liable for any indirect,
          incidental, special, or consequential damages arising from your use of our website or
          services. Our total liability for any claim shall not exceed the amount paid for the specific
          service giving rise to the claim.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          Our website and services are provided "as is" without warranties of any kind, express or
          implied. We do not guarantee that our website will be error-free or uninterrupted.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws. Any
          disputes arising from these Terms shall be resolved through good-faith negotiation, and
          if necessary, through appropriate legal proceedings.
        </p>

        <h2>11. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms at any time. Continued use of our website after
          changes constitutes acceptance of the revised Terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms? Contact us at:{" "}
          <a href="mailto:hello@theinkbureau.com">hello@theinkbureau.com</a>
        </p>
      </div>
    </div>
  );
}

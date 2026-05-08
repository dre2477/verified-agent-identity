import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "The Ink Bureau Disclaimer — information about the nature of our content and limitations of liability.",
  alternates: { canonical: "https://theinkbureau.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 style={{ fontFamily: "var(--font-playfair)", color: "var(--fg)" }} className="text-4xl font-bold mb-2">
        Disclaimer
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-10">Last updated: January 1, 2026</p>

      <div className="prose">
        <h2>General Information Disclaimer</h2>
        <p>
          The information provided on <strong>theinkbureau.com</strong> is for general informational
          and educational purposes only. All content published on this website reflects the opinions and
          experiences of The Ink Bureau team and is not intended as professional advice in any specific
          domain.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We strive to ensure that all content published on this website is accurate, up-to-date, and
          well-researched. However, we make no representations or warranties of any kind, express or
          implied, about the completeness, accuracy, reliability, suitability, or availability of the
          information contained on this website.
        </p>
        <p>
          Any reliance you place on such information is strictly at your own risk.
        </p>

        <h2>External Links Disclaimer</h2>
        <p>
          Our website may contain links to third-party websites. These links are provided for your
          convenience only. We have no control over the content of those sites and accept no
          responsibility for them or for any loss or damage that may arise from your use of them.
        </p>

        <h2>Advertising Disclaimer</h2>
        <p>
          This website participates in the <strong>Google AdSense</strong> advertising program.
          Advertisements displayed on this website are provided by Google and may be based on your
          browsing history and interests. The presence of advertisements does not constitute
          endorsement of the advertised products or services by The Ink Bureau.
        </p>

        <h2>Content Writing Services Disclaimer</h2>
        <p>
          Content produced by The Ink Bureau for clients is intended for the client&apos;s specified use
          cases. The Ink Bureau is not responsible for how clients use, publish, or distribute
          delivered content. Clients are responsible for ensuring that all content they publish
          complies with applicable laws and platform guidelines.
        </p>

        <h2>Testimonials Disclaimer</h2>
        <p>
          Testimonials displayed on this website represent individual client experiences. Results may
          vary. Testimonials are not claims of guaranteed outcomes.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Disclaimer, please contact us at:{" "}
          <a href="mailto:hello@theinkbureau.com">hello@theinkbureau.com</a>
        </p>
      </div>
    </div>
  );
}

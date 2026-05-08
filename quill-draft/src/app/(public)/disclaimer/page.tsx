import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${SITE_NAME}`,
  openGraph: { url: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold font-serif mb-2" style={{ color: "var(--fg)" }}>Disclaimer</h1>
      <p className="text-sm mb-10" style={{ color: "var(--muted)" }}>Last updated: May 2026</p>

      <div className="prose max-w-none" style={{ color: "var(--fg)" }}>
        <h2>General Disclaimer</h2>
        <p>
          The information provided on {SITE_NAME} is for general informational and educational purposes only.
          While we make every effort to keep the information accurate and up-to-date, we make no representations
          or warranties of any kind, express or implied, about the completeness, accuracy, reliability,
          suitability, or availability of the information, products, services, or related graphics contained
          on the website.
        </p>

        <h2>Not Professional Advice</h2>
        <p>
          The content on this website does not constitute professional advice of any kind — including but not
          limited to legal, financial, medical, or psychological advice. Always seek the guidance of a qualified
          professional for specific advice tailored to your situation.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We strive to publish accurate, well-researched content. However, the world changes rapidly, and
          information that was accurate at the time of writing may become outdated. We encourage readers to
          verify important facts independently and to check the publication date of articles.
        </p>

        <h2>External Links</h2>
        <p>
          This website may contain links to external websites. These links are provided for convenience and
          informational purposes only. {SITE_NAME} has no control over the nature, content, and availability
          of those sites and does not endorse or guarantee the accuracy of external content.
        </p>

        <h2>Affiliate and Advertising Disclosure</h2>
        <p>
          {SITE_NAME} participates in advertising programs including Google AdSense. Advertisements displayed
          on this site are clearly marked and separate from editorial content. We may receive compensation
          through advertising, but this does not influence our editorial decisions or content.
        </p>

        <h2>Views and Opinions</h2>
        <p>
          Any views or opinions expressed in articles on {SITE_NAME} are those of the individual authors
          and do not necessarily represent the views of the publication as a whole. We encourage thoughtful
          discussion and diverse perspectives.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this disclaimer, please contact us via our <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}

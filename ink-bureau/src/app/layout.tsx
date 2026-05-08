import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ThemeProvider from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theinkbureau.com"),
  title: {
    default: "The Ink Bureau — Premium Content Studio",
    template: "%s | The Ink Bureau",
  },
  description:
    "The Ink Bureau is a professional content studio specializing in article writing, story writing, and content strategy. Human-crafted, deeply researched, SEO-optimized content.",
  keywords: [
    "article writing",
    "story writing",
    "content studio",
    "SEO articles",
    "long-form writing",
    "brand storytelling",
    "content strategy",
  ],
  authors: [{ name: "The Ink Bureau Team" }],
  creator: "The Ink Bureau",
  publisher: "The Ink Bureau",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theinkbureau.com",
    siteName: "The Ink Bureau",
    title: "The Ink Bureau — Premium Content Studio",
    description:
      "Professional article writing and story writing services. Human-crafted, deeply researched, SEO-optimized content.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "The Ink Bureau — Premium Content Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ink Bureau — Premium Content Studio",
    description:
      "Professional article writing and story writing services. Human-crafted, deeply researched content.",
    images: ["/og-default.png"],
    creator: "@theinkbureau",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}

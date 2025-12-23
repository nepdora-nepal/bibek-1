import Script from "next/script";
import type { Metadata } from "next";
import Blog from "@/src/components/pages/Blog";

export const metadata: Metadata = {
  title: "Latest Updates & Blog — Brainstorm Global Education",
  description:
    "Stay updated with the latest news, tips, and insights on studying abroad. Read our blog for university updates, visa information, scholarship opportunities, and student success stories.",
  openGraph: {
    title: "Latest Updates & Blog — Brainstorm Global Education",
    description:
      "News, tips, and insights on studying abroad - university updates, visa info, and scholarships.",
    url: "https://brainstorm-global-education.vercel.app/latest-updates",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app/latest-updates",
  },
};

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Brainstorm Global Education Blog",
    description:
      "Latest news, tips, and insights on studying abroad for Nepali students.",
    url: "https://brainstorm-global-education.vercel.app/latest-updates",
    publisher: {
      "@type": "Organization",
      name: "Brainstorm Global Education",
      url: "https://brainstorm-global-education.vercel.app",
    },
  };

  return (
    <>
      <Script
        id="schema-blog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Blog />
    </>
  );
}
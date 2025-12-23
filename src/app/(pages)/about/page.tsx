import Script from "next/script";
import type { Metadata } from "next";
import About from "@/src/components/pages/About";

export const metadata: Metadata = {
  title: "About Us — Brainstorm Global Education",
  description:
    "Learn about Brainstorm Global Education, our mission, vision, and dedicated team helping students achieve their dreams of studying abroad in USA, UK, Canada, Australia, and New Zealand.",
  openGraph: {
    title: "About Us — Brainstorm Global Education",
    description:
      "Meet our team of expert education consultants dedicated to helping students study abroad.",
    url: "https://brainstorm-global-education.vercel.app/about",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app/about",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Brainstorm Global Education",
    description:
      "Learn about our mission to help students achieve their dreams of studying abroad.",
    url: "https://brainstorm-global-education.vercel.app/about",
    mainEntity: {
      "@type": "EducationalOrganization",
      name: "Brainstorm Global Education",
      description:
        "Expert study abroad consultancy helping students with university applications, visas, and scholarships.",
      url: "https://brainstorm-global-education.vercel.app",
    },
  };

  return (
    <>
      <Script
        id="schema-about"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <About />
    </>
  );
}
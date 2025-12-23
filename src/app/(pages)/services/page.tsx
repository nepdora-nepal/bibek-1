import Script from "next/script";
import type { Metadata } from "next";
import { Services } from "@/src/components/pages/services";

export const metadata: Metadata = {
  title: "Our Services — Brainstorm Global Education",
  description:
    "Explore our comprehensive study abroad services including university application assistance, visa guidance, scholarship search, IELTS/PTE preparation, and pre-departure support.",
  openGraph: {
    title: "Our Services — Brainstorm Global Education",
    description:
      "Complete study abroad services: applications, visas, scholarships, test prep, and more.",
    url: "https://brainstorm-global-education.vercel.app/services",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app/services",
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Educational Consulting",
    provider: {
      "@type": "EducationalOrganization",
      name: "Brainstorm Global Education",
      url: "https://brainstorm-global-education.vercel.app",
    },
    areaServed: ["Nepal", "USA", "UK", "Canada", "Australia", "New Zealand"],
    description:
      "Comprehensive study abroad services including university applications, visa guidance, and scholarship assistance.",
  };

  return (
    <>
      <Script
        id="schema-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Services />
    </>
  );
}
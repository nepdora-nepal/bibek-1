import Script from "next/script";
import type { Metadata } from "next";
import Contact from "@/src/components/pages/Contact";

export const metadata: Metadata = {
  title: "Contact Us — Brainstorm Global Education",
  description:
    "Get in touch with Brainstorm Global Education for free consultation on studying abroad. Contact our expert counselors for university applications, visa guidance, and scholarship assistance.",
  openGraph: {
    title: "Contact Us — Brainstorm Global Education",
    description:
      "Reach out for free study abroad consultation. We're here to help with university applications, visas, and scholarships.",
    url: "https://brainstorm-global-education.vercel.app/contact",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app/contact",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Brainstorm Global Education",
    description: "Get in touch for free study abroad consultation.",
    url: "https://brainstorm-global-education.vercel.app/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Brainstorm Global Education",
      telephone: "+977-9801149880",
      email: "info@brainstorm-global-education.vercel.app",
      address: {
        "@type": "44600",
        addressCountry: "NP",
      },
    },
  };

  return (
    <>
      <Script
        id="schema-contact"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Contact />
    </>
  );
}
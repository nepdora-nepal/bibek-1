import Script from "next/script";
import type { Metadata } from "next";
import Index from "@/src/components/pages/Index";

export const metadata: Metadata = {
  title: "Brainstorm Global Education — Study Abroad Consultancy in Nepal",
  description:
    "Leading education consultancy in Nepal for studying in USA, UK, Canada, Australia, and New Zealand. Get expert guidance on university application, visa processing, and scholarships.",
  openGraph: {
    title: "Brainstorm Global Education — Study Abroad Consultancy",
    description:
      "Your trusted partner for studying abroad. Expert counseling, test preparation (IELTS/PTE), and visa success for top study destinations.",
    url: "https://brainstorm-global-education.vercel.app",
    type: "website",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app",
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Brainstorm Global Education",
    url: "https://brainstorm-global-education.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://brainstorm-global-education.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Brainstorm Global Education",
    url: "https://brainstorm-global-education.vercel.app",
    logo: "https://brainstorm-global-education.vercel.app/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+977-9801149880",
      contactType: "customer support",
      areaServed: ["NP", "US", "UK", "AU", "CA", "NZ"],
      availableLanguage: ["English", "Nepali"],
    },
    sameAs: [
      "https://www.facebook.com/yourpage",
      "https://www.instagram.com/yourpage",
      "https://www.linkedin.com/company/yourpage",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Brainstorm Global Education provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide university application assistance, visa guidance, scholarship search, and pre-departure support for students planning to study abroad.",
        },
      },
      {
        "@type": "Question",
        name: "Which countries can I study in with Brainstorm Global Education?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We help students study in USA, UK, Canada, Australia, and New Zealand with comprehensive support for applications, visas, and scholarships.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer IELTS and PTE preparation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer comprehensive IELTS and PTE preparation courses to help students achieve their target scores for university admissions.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Index />
    </>
  );
}

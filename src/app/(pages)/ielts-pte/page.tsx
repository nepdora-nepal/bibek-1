import Script from "next/script";
import type { Metadata } from "next";
import IeltsPte from "@/src/components/pages/IeltsPte";

export const metadata: Metadata = {
  title: "IELTS & PTE Preparation — Brainstorm Global Education",
  description:
    "Prepare for IELTS and PTE exams with Brainstorm Global Education. Expert coaching, practice tests, and proven strategies to achieve your target scores for university admissions abroad.",
  openGraph: {
    title: "IELTS & PTE Preparation — Brainstorm Global Education",
    description:
      "Expert IELTS and PTE preparation courses to help you achieve your target scores.",
    url: "https://brainstorm-global-education.vercel.app/ielts-pte",
  },
  alternates: {
    canonical: "https://brainstorm-global-education.vercel.app/ielts-pte",
  },
};

export default function IeltsPtePage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "IELTS & PTE Preparation Course",
    description:
      "Expert coaching and proven strategies for IELTS and PTE exams to achieve your target scores.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Brainstorm Global Education",
      url: "https://brainstorm-global-education.vercel.app",
    },
    courseMode: "onsite",
    educationalCredentialAwarded: "Certificate of Completion",
  };

  return (
    <>
      <Script
        id="schema-ielts-pte"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <IeltsPte />
    </>
  );
}
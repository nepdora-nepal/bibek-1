import type { Metadata } from "next";
import Script from "next/script";
import CountryPage from "@/components/pages/CountryPage";

// Country data for SEO - Duplicate of what's in CountryPage temporarily or can be imported if shared.
// Ideally should be shared, but for now defining here to fix the metadata issue quickly.
const countryMeta: Record<
  string,
  { name: string; fullName: string; tagline: string }
> = {
  usa: {
    name: "USA",
    fullName: "United States of America",
    tagline: "World-Class Education & Unlimited Opportunities",
  },
  uk: {
    name: "UK",
    fullName: "United Kingdom",
    tagline: "Centuries of Academic Excellence",
  },
  australia: {
    name: "Australia",
    fullName: "Australia",
    tagline: "World-Class Education with Exceptional Lifestyle",
  },
  canada: {
    name: "Canada",
    fullName: "Canada",
    tagline: "Quality Education with Clear Immigration Pathways",
  },
  "new-zealand": {
    name: "New Zealand",
    fullName: "New Zealand",
    tagline: "Quality Education in Paradise",
  },
};

type Props = {
  params: Promise<{ country: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const data = countryMeta[country];

  if (!data) {
    return {
      title: "Country Not Found — Brainstorm Global Education",
    };
  }

  return {
    title: `Study in ${data.name} — Brainstorm Global Education`,
    description: `${data.tagline}. Complete guide to studying in ${data.fullName} for Nepali students.`,
    openGraph: {
      title: `Study in ${data.name} — Brainstorm Global Education`,
      description: `${data.tagline}. Complete guide to studying in ${data.fullName} for Nepali students.`,
      url: `https://brainstorm-global-education.vercel.app/countries/${country}`,
    },
    alternates: {
      canonical: `https://brainstorm-global-education.vercel.app/countries/${country}`,
    },
  };
}

export default async function Country({ params }: Props) {
  const { country } = await params;
  const data = countryMeta[country];

  const countrySchema = data
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Study in ${data.name} — Brainstorm Global Education`,
        description: `${data.tagline}. Complete guide to studying in ${data.fullName} for Nepali students.`,
        url: `https://brainstorm-global-education.vercel.app/countries/${country}`,
        mainEntity: {
          "@type": "Country",
          name: data.fullName,
        },
        provider: {
          "@type": "EducationalOrganization",
          name: "Brainstorm Global Education",
        },
      }
    : null;

  return (
    <>
      {countrySchema && (
        <Script
          id={`schema-country-${country}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(countrySchema) }}
        />
      )}
      <CountryPage countrySlug={country} />
    </>
  );
}
import Script from "next/script";
import type { Metadata } from "next";
import ServiceDetailView from "@/src/components/pages/service-details/service-detail";
import { servicesApi } from "@/src/services/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const service = await servicesApi.getServiceBySlug(slug);
    const plainDescription = service.description
      ?.replace(/<[^>]*>/g, "")
      .slice(0, 160);

    return {
      title: `${service.title} — Brainstorm Global Education`,
      description:
        plainDescription ||
        `Learn about our ${service.title} service for your study abroad journey.`,
      openGraph: {
        title: `${service.title} — Brainstorm Global Education`,
        description: plainDescription,
        url: `https://brainstorm-global-education.vercel.app/services/${slug}`,
        images: service.thumbnail_image
          ? [{ url: service.thumbnail_image }]
          : undefined,
      },
      alternates: {
        canonical: `https://brainstorm-global-education.vercel.app/services/${slug}`,
      },
    };
  } catch {
    return {
      title: "Service Not Found — Brainstorm Global Education",
    };
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  let serviceData = null;
  try {
    serviceData = await servicesApi.getServiceBySlug(slug);
  } catch {
    serviceData = null;
  }

  const serviceSchema = serviceData
    ? {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceData.title,
      description: serviceData.description?.replace(/<[^>]*>/g, ""),
      url: `https://brainstorm-global-education.vercel.app/services/${slug}`,
      provider: {
        "@type": "EducationalOrganization",
        name: "Brainstorm Global Education",
        url: "https://brainstorm-global-education.vercel.app",
      },
    }
    : null;

  return (
    <>
      {serviceSchema && (
        <Script
          id={`schema-service-${slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      )}
      <ServiceDetailView slug={slug} />
    </>
  );
}

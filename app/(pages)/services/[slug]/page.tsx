import ServiceDetailView from "@/components/pages/service-details/service-detail";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ServiceDetailView slug={slug} />;
}

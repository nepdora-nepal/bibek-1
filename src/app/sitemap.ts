import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";

const BASE_URL = "https://www.brainstorm.edu.np";

// Hardcoded country slugs (matches CountryPage.tsx)
const countries = ["usa", "uk", "australia", "canada", "new-zealand"];

async function getServiceSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${siteConfig.backendUrl}/api/service/`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.results?.map((service: { slug: string }) => service.slug) || [];
  } catch {
    return [];
  }
}

async function getBlogSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${siteConfig.backendUrl}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.results?.map((blog: { slug: string }) => blog.slug) || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ielts-pte`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/latest-updates`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/countries/${country}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const serviceSlugs = await getServiceSlugs();
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogSlugs = await getBlogSlugs();
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/latest-updates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...countryPages, ...servicePages, ...blogPages];
}

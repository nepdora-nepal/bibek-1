import Script from "next/script";
import type { Metadata } from "next";
import { BlogDetail } from "@/src/components/pages/blogDetails/blogDetails";
import { blogApi } from "@/src/services/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await blogApi.getBlogBySlug(slug);
    const plainDescription = blog.content?.replace(/<[^>]*>/g, "").slice(0, 160);

    return {
      title: `${blog.title} — Brainstorm Global Education`,
      description:
        plainDescription ||
        `Read our article: ${blog.title}. Stay updated with study abroad news.`,
      openGraph: {
        title: `${blog.title} — Brainstorm Global Education`,
        description: plainDescription,
        url: `https://brainstorm-global-education.vercel.app/latest-updates/${slug}`,
        type: "article",
        images: blog.thumbnail_image
          ? [{ url: blog.thumbnail_image }]
          : undefined,
        publishedTime: blog.created_at,
      },
      alternates: {
        canonical: `https://brainstorm-global-education.vercel.app/latest-updates/${slug}`,
      },
    };
  } catch {
    return {
      title: "Article Not Found — Brainstorm Global Education",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let blogData = null;
  try {
    blogData = await blogApi.getBlogBySlug(slug);
  } catch {
    blogData = null;
  }

  const articleSchema = blogData
    ? {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: blogData.title,
      description: blogData.content?.replace(/<[^>]*>/g, "").slice(0, 160),
      url: `https://brainstorm-global-education.vercel.app/latest-updates/${slug}`,
      image: blogData.thumbnail_image,
      datePublished: blogData.created_at,
      author: {
        "@type": "Organization",
        name: "Brainstorm Global Education",
      },
      publisher: {
        "@type": "Organization",
        name: "Brainstorm Global Education",
        url: "https://brainstorm-global-education.vercel.app",
      },
    }
    : null;

  return (
    <>
      {articleSchema && (
        <Script
          id={`schema-article-${slug}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <BlogDetail slug={slug} />
    </>
  );
}

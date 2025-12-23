"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlog, useBlogs } from "@/src/hooks/use-blog";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { AlertCircle } from "lucide-react";
import CTASection from "@/src/components/home/CTASection";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share"

interface BlogDetailProps {
  slug: string;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ slug }) => {
  const { data: blog, isLoading, error } = useBlog(slug);
  const { data: allBlogs } = useBlogs();
  const isFeatured = allBlogs?.results?.[0]?.slug === slug;

  const defaultImage =
    "https://images.unsplash.com/photo-1492538368677-f6e0ac4024a1?w=800&h=600&fit=crop";

  /* ------------------ Loading State ------------------ */
  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-6" />
          </div>
          <Skeleton className="w-full h-64 md:h-96 rounded-lg mb-12" />
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  /* ------------------ Error State ------------------ */
  if (error || !blog) {
    return (
      <div className="bg-background min-h-[50vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="max-w-xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message ||
                "Could not load blog post details. Please try again."}
            </AlertDescription>
            <div className="mt-4">
              <Link href="/latest-updates" className="text-primary underline">
                Go Back to Latest Updates
              </Link>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  /* ------------------ Main UI (Clean Blog Detail) ------------------ */
  return (
    <>
      <div className="pt-20 pb-10 bg-white">
        <div className="container mx-auto px-4 md:px-8 mb-12">

          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center max-w-4xl mx-auto gap-2 text-sm justify-center text-gray-500 whitespace-nowrap">
              <li className="shrink-0">
                <Link href="/" className="hover:text-blue-600 font-medium">
                  Home
                </Link>
              </li>
              <li className="shrink-0">/</li>
              <li className="shrink-0">
                <Link href="/latest-updates" className="hover:text-blue-600 font-medium">
                  Latest Updates
                </Link>
              </li>
              <li className="shrink-0">/</li>
              <li className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-[400px]">
                {blog.title}
              </li>
            </ol>
          </nav>

          {/* Title + Date */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h1 className="text-3xl md:text-2xl lg:text-3xl font-semibold justify-center  text-gray-900 leading-[1.15] mb-4">
              {blog.title}
            </h1>

            {/* Social Share Buttons */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <FacebookShareButton
                url={`${process.env.NEXT_PUBLIC_APP_URL}/latest-updates/${slug}`}
                quote={blog.title}
                hashtag={'#brainstorm'}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_APP_URL}/latest-updates/${slug}`}
                title={blog.title}
                hashtags={['brainstorm']}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={`${process.env.NEXT_PUBLIC_APP_URL}/latest-updates/${slug}`}
                title={blog.title}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <LinkedinShareButton
                url={`${process.env.NEXT_PUBLIC_APP_URL}/latest-updates/${slug}`}
                title={blog.title}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>

          {/* Main Thumbnail */}
          {blog.thumbnail_image && (
            <div className="rounded-3xl overflow-hidden h-[300px] md:h-[450px] max-w-[1100px] mx-auto shadow-lg mb-10 relative">
              <Image
                src={blog.thumbnail_image || defaultImage}
                alt={blog.thumbnail_image_alt_description || blog.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
              {isFeatured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Markdown Content */}
          <div className="max-w-4xl mx-auto space-y-6 prose prose-lg prose-gray">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-10 mb-4 text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-900">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 space-y-2 text-gray-700 mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700">{children}</li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-6">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <span className="block my-8 w-full">
                    <Image
                      src={(src as string) || ""}
                      alt={alt || ""}
                      width={1200}
                      height={600}
                      className="rounded-md object-contain mx-auto"
                    />
                  </span>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
};

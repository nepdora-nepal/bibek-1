"use client";

import Link from "next/link";
import Image from "next/image";
import { useBlogs } from "@/src/hooks/use-blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/src/components/ui/skeleton";
import { motion, Variants } from "framer-motion";

import CTASection from "../home/CTASection";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};


const Blog = () => {
  const { data: blogData, isLoading, error } = useBlogs();
  const blogs = blogData?.results || [];

  const featured = blogs.length > 0 ? blogs[0] : null;
  const others = blogs.length > 1 ? blogs.slice(1) : [];



  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-500">
        Failed to load blogs. Please try again later.
      </div>
    );
  }

  return (
    // If Layout is not a default export or handles 'children' differently, this might need alloc adjustment.
    // However, sticking to user's pattern:
    <>
      {/* Hero with Background Image */}
      <motion.section
        className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/student.jpg"
            alt="Students studying"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl px-4 sm:px-6 md:pl-20 lg:pl-46 py-12 sm:py-16 md:py-24">
          <div className="max-w-xl">
            <span className="inline-block bg-primary text-primary-foreground px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded mb-4 sm:mb-6">
              Latest Updates
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-3 sm:mb-4 leading-tight">
              Study Abroad<br />Insights & Guides
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-background/80 max-w-md">
              Expert tips and resources to help you navigate your international education journey.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Articles Grid */}
      <motion.section
        className="py-10 sm:py-16 md:py-20 bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Featured Post */}
          {featured && (
            <Link
              href={`/latest-updates/${featured.slug}`}
              className="group block mb-10 sm:mb-16"
            >
              <article className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center cursor-pointer">
                <div className="lg:col-span-3 relative overflow-hidden rounded-lg sm:rounded-xl aspect-video">
                  <Image
                    src={featured.thumbnail_image || "https://images.unsplash.com/photo-1499750310159-5b5f00e9fe59?w=800&fit=crop"}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-2 sm:space-y-4">
                  <span className="text-primary text-xs sm:text-sm font-medium">
                    {featured.tags && featured.tags.length > 0 ? featured.tags[0].name : "Article"}
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight text-foreground">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                    {featured.meta_description}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 sm:gap-1.5">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {format(new Date(featured.created_at), "MMM d, yyyy")}
                    </span>
                    {featured.time_to_read && (
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {featured.time_to_read}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center text-primary text-sm sm:text-base font-medium group-hover:gap-3 gap-2 transition-all pt-1 sm:pt-2">
                    Read Article <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
            {others.map((post) => (
              <Link
                key={post.id}
                href={`/latest-updates/${post.slug}`}
                className="group block"
              >
                <article className="space-y-3 sm:space-y-4 cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl aspect-video">
                    <Image
                      src={post.thumbnail_image || "https://images.unsplash.com/photo-1499750310159-5b5f00e9fe59?w=800&fit=crop"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                        <span className="bg-background/90 backdrop-blur-sm text-foreground px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded">
                          {post.tags[0].name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="font-semibold text-base sm:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                      {post.meta_description}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground pt-0.5 sm:pt-1">
                      <span>{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                      {post.time_to_read && (
                        <>
                          <span>•</span>
                          <span>{post.time_to_read}</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {!isLoading && blogs.length === 0 && !error && (
            <div className="text-center py-20 text-muted-foreground">
              No articles found.
            </div>
          )}
        </div>
      </motion.section>

      <CTASection />
    </>
  );
};

export default Blog;

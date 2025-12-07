"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, User, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BlogAuthor } from "@/types/blog";
import { useBlogs } from "@/hooks/use-blog";
import { Skeleton } from "@/components/ui/skeleton";
import { truncateText, stripHtml } from "@/lib/text-utils";
import { format } from "date-fns";

const categories = ["All", "Study Guide", "Test Prep", "Scholarships", "Visa Guide", "Immigration"];

const Blog = () => {
  const { data: blogData, isLoading } = useBlogs();
  const blogs = blogData?.results || [];

  const featuredPost = blogs.length > 0 ? blogs[0] : null;
  const otherPosts = blogs.length > 1 ? blogs.slice(1) : [];

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const getAuthorName = (author: BlogAuthor | null) => {
    if (!author) return "Brainstorm Team";
    return `${author.first_name} ${author.last_name}`.trim() || author.username || "Brainstorm Team";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 text-sm font-medium rounded mb-4">
              Resources & Insights
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Study Abroad Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert tips, guides, and insights to help you navigate your 
              international education journey.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  index === 0 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Skeleton className="w-full h-64 lg:h-80 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ) : featuredPost ? (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg bg-muted">
                {featuredPost.thumbnail_image ? (
                  <Image
                    src={featuredPost.thumbnail_image}
                    alt={featuredPost.thumbnail_image_alt_description || featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                ) : (
                   <div className="w-full h-64 lg:h-80 flex items-center justify-center bg-secondary/20">
                    <ImageIcon className="w-16 h-16 text-muted-foreground" />
                   </div>
                )}
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded">
                  Featured
                </span>
              </div>
              <div>
                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <span className="inline-block text-secondary-foreground px-3 py-1 text-xs font-medium rounded mb-4 bg-secondary">
                    {featuredPost.tags[0].name}
                  </span>
                )}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {featuredPost.meta_description || truncateText(stripHtml(featuredPost.content), 150)}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {getAuthorName(featuredPost.author)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {formatDate(featuredPost.created_at)}
                  </span>
                  {featuredPost.time_to_read && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {featuredPost.time_to_read}
                    </span>
                  )}
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No blog posts found.
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-16 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="bg-card border border-border rounded-lg overflow-hidden h-full">
                   <Skeleton className="w-full h-48" />
                   <div className="p-5 space-y-3">
                     <Skeleton className="h-6 w-3/4" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-5/6" />
                     <div className="flex justify-between pt-2">
                       <Skeleton className="h-3 w-1/4" />
                       <Skeleton className="h-3 w-1/4" />
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          ) : otherPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-md transition-all flex flex-col h-full"
                >
                  <div className="relative overflow-hidden bg-muted h-48">
                    {post.thumbnail_image ? (
                        <Image
                        src={post.thumbnail_image}
                        alt={post.thumbnail_image_alt_description || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                            <ImageIcon className="w-10 h-10 text-muted-foreground" />
                        </div>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 text-xs font-medium rounded">
                        {post.tags[0].name}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors" title={post.title}>
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 grow">
                      {post.meta_description || truncateText(stripHtml(post.content), 100)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(post.created_at)}
                      </span>
                      {post.time_to_read && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.time_to_read}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : !featuredPost && !isLoading ? (
             <div className="text-center py-12 text-muted-foreground">
              No recent articles found.
            </div>
          ) : null}

          {/* Load More */}
          {/* TODO: Implement pagination load more */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 bg-secondary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Study Abroad Tips
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get the latest guides, 
            scholarship updates, and visa tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-foreground placeholder:text-muted-foreground"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

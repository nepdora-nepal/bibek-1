"use client";

import { useBlogs } from "@/src/hooks/use-blog";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { truncateText, stripHtml } from "@/src/lib/text-utils";
import { Button } from "@/src/components/ui/button";

const BlogSection = () => {
  const { data: blogsData, isLoading } = useBlogs({ page_size: 3 });
  const blogs = blogsData?.results || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="blog" className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="px-4 py-1 text-sm font-medium mb-4 bg-accent text-accent-foreground">
            Latest Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Our Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights about studying abroad,
            visa processes, and international education opportunities.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-full overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link href={`/latest-updates/${blog.slug}`} key={blog.id}>
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
                    <div className="relative w-full h-48 overflow-hidden">
                      {blog.thumbnail_image ? (
                        <Image
                          src={blog.thumbnail_image}
                          alt={blog.thumbnail_image_alt_description || blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary/30">
                            {blog.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {blog.tags?.[0] && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          {blog.tags[0].name}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(blog.created_at)}
                        </span>
                        {blog.time_to_read && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.time_to_read}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors" title={blog.title}>
                        {blog.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm line-clamp-2">
                        {truncateText(stripHtml(blog.content), 120)}
                      </CardDescription>
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-4 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/latest-updates">
                <Button variant="outline" size="lg" className="group">
                  View All Articles
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

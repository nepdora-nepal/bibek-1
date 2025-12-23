"use client";

import React from "react";
import { useTestimonials } from "@/src/hooks/use-testimonial";
import { Testimonial } from "@/src/types/testimonial";
import { Skeleton } from "@/src/components/ui/skeleton";
import Image from "next/image";

const TestimonialsSection = () => {
  const { data: testimonials, isLoading } = useTestimonials();

  // Fallback/Loading UI
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl border border-border p-6 space-y-4">
              <div className="flex justify-center mb-4">
                <Skeleton className="h-28 w-28 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full" />
              <div className="space-y-2 text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const validTestimonials = testimonials || [];

  // Duplicate testimonials for seamless loop if we have enough
  // If we don't have enough, we might want to duplicate them more times or handle it differently
  const duplicatedTestimonials = validTestimonials.length > 0
    ? [...validTestimonials, ...validTestimonials, ...validTestimonials, ...validTestimonials]
    : [];

  // Split logic needs to be safe if no testimonials
  if (validTestimonials.length === 0) {
    return null; // Or return a "No testimonials yet" state
  }


  // If we have 8 items, 2x = 16.

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Students Who Made It
          </h2>
        </div>
      </div>

      {/* Scrolling Testimonials */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent z-10" />

        <div className="flex gap-6 px-4 justify-center">
          {/* Column 1 */}
          <div className="flex-1 space-y-6 scroll-up min-w-[300px] max-w-md">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="hidden md:block flex-1 space-y-6 scroll-up min-w-[300px] max-w-md" style={{ animationDelay: "-10s" }}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="hidden lg:block flex-1 space-y-6 scroll-up min-w-[300px] max-w-md" style={{ animationDelay: "-20s" }}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`col3-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-card border border-border p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 h-auto break-inside-avoid group">
    {/* Image at top */}
    <div className="flex justify-center mb-5">
      <div className="relative w-68 h-68 shrink-0">
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/40 via-primary/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative w-68 h-68 overflow-hidden bg-secondary ring-2 ring-background">
          {testimonial.image ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary-foreground font-bold text-4xl">
              {testimonial.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Testimonial text - smaller but readable */}
    <p className="text-foreground/90 mb-4 leading-relaxed italic text-sm text-center">&quot;{testimonial.comment}&quot;</p>

    {/* Name and designation */}
    <div className="text-center">
      <p className="font-bold text-foreground text-base">{testimonial.name}</p>
      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
        {testimonial.designation}
      </p>
    </div>
  </div>
);

export default TestimonialsSection;

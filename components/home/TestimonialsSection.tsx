"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTestimonials } from "@/hooks/use-testimonial";

const Testimonials: React.FC = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">
              Failed to load testimonials. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">No testimonials available.</p>
          </div>
        </div>
      </section>
    );
  }

  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="p-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {displayedTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="group cursor-pointer rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1 shadow-none border-none">
                    <CardContent className="text-center">
                      {testimonial.image && (
                        <div className="mb-6 flex justify-center">
                          <div className="relative h-82 w-82 overflow-hidden">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}

                      <h3 className="mb-2 text-3xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>

                      <p className="mb-4 text-lg text-gray-600">
                        {testimonial.designation}
                      </p>

                      <div className="relative">
                        <blockquote className="relative z-10 text-lg leading-relaxed font-medium text-gray-800">
                          &quot;{testimonial.comment}&quot;
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;


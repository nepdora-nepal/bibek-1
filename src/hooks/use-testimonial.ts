"use client";

import { testimonialsApi } from "@/src/services/testimonial";
import { useQuery } from "@tanstack/react-query";

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
  });
}
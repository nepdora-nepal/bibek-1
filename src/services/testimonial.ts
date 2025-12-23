import {  TestimonialResponse } from "@/src/types/testimonial";
import { siteConfig } from "@/src/config/site";

export const testimonialsApi = {
  // Get all testimonials
  getAll: async (): Promise<TestimonialResponse> => {
    const backendUrl = siteConfig.apiBaseUrl;
    
    if (!backendUrl) {
      throw new Error('Backend URL not configured');
    }

    const response = await fetch(`${backendUrl}/api/testimonial/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }

    return response.json();
  },

}
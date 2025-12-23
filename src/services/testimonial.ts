import {  TestimonialResponse } from "@/src/types/testimonial";

export const testimonialsApi = {
  // Get all testimonials
  getAll: async (): Promise<TestimonialResponse> => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
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
import { siteConfig } from "@/config/site";
import { BlogFilters, BlogPost, PaginatedBlogResponse } from "@/types/blog";

const API_BASE_URL=siteConfig.backendUrl

export const blogApi = {
  getBlogs: async (filters?: BlogFilters): Promise<PaginatedBlogResponse> => {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.page_size)
        queryParams.append("page_size", filters.page_size.toString());
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.is_published !== undefined)
        queryParams.append("is_published", filters.is_published.toString());
      if (filters.ordering) queryParams.append("ordering", filters.ordering);
      if (filters.author) queryParams.append("author", filters.author);
      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach(tag => queryParams.append("tags", tag));
      }
    }

    const url = `${API_BASE_URL}/api/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    return response.json();
  },

  getBlogBySlug: async (slug: string): Promise<BlogPost> => {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }

    return response.json();
  }
}
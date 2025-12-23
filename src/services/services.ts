import { siteConfig } from "@/src/config/site";
import {
  ServicesPost,
  PaginatedServicesResponse,
 ServicesFilters,
} from "@/src/types/services";

export const buildServicesFormData = (
  data: ServicesPost | Omit<ServicesPost, "id">
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return; // Skip null or undefined values
    }

    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (typeof value === "number") {
      formData.append(key, value.toString());
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  return formData;
};

export const servicesApi = {
  getServices: async (
    filters?: ServicesFilters
  ): Promise<PaginatedServicesResponse> => {
    const API_BASE_URL = siteConfig.apiBaseUrl;
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.page_size)
        queryParams.append("page_size", filters.page_size.toString());
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.ordering) queryParams.append("ordering", filters.ordering);
    }

    const url = `${API_BASE_URL}/api/service/${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
    });

    return response.json();
  },

  getServiceBySlug: async (slug: string): Promise<ServicesPost> => {
    const API_BASE_URL = siteConfig.apiBaseUrl;
    const response = await fetch(`${API_BASE_URL}/api/service/${slug}/`, {
      method: "GET",
    });

    return response.json();
  },
};

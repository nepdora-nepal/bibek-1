"use client";

import { blogApi } from "@/src/services/blog";
import {
  BlogPost,
  PaginatedBlogResponse,
  BlogFilters,
} from "@/src/types/blog";
import {
  useQuery,
  UseQueryOptions,

} from "@tanstack/react-query";

export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: BlogFilters) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
  similars: () => [...blogKeys.all, "similar"] as const,
  similar: (slug: string) => [...blogKeys.similars(), slug] as const,
};

export const useBlogs = (
  filters?: BlogFilters,
  options?: Omit<
    UseQueryOptions<PaginatedBlogResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PaginatedBlogResponse, Error>({
    queryKey: blogKeys.list(filters || {}),
    queryFn: () => blogApi.getBlogs(filters),
    ...options,
  });
};

export const useBlog = (
  slug: string,
  options?: Omit<UseQueryOptions<BlogPost, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<BlogPost, Error>({
    queryKey: ["blog", slug],
    queryFn: () => blogApi.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
    ...options,
  });
};





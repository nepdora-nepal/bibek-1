"use client";

import { servicesApi } from "@/src/services/services";
import {
  ServicesPost,
  PaginatedServicesResponse,
  ServicesFilters,
} from "@/src/types/services";
import {
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export const servicesKeys = {
  all: ["services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
  list: (filters: ServicesFilters) =>
    [...servicesKeys.lists(), filters] as const,
  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (slug: string) => [...servicesKeys.details(), slug] as const,
};

export const useServices = (
  filters?: ServicesFilters,
  options?: Omit<
    UseQueryOptions<PaginatedServicesResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PaginatedServicesResponse, Error>({
    queryKey: servicesKeys.list(filters || {}),
    queryFn: () => servicesApi.getServices(filters),
    ...options,
  });
};

export const useService = (
  slug: string,
  options?: Omit<UseQueryOptions<ServicesPost, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<ServicesPost, Error>({
    queryKey: servicesKeys.detail(slug),
    queryFn: () => servicesApi.getServiceBySlug(slug),
    enabled: !!slug,
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
    ...options,
  });
};


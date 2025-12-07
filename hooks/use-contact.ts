import { useMutation, useQuery } from "@tanstack/react-query";
import { contactAPI } from "@/services/contact";
import {
  ContactFormData,
  PaginatedContacts,
  ContactFilters,
} from "@/types/contact";
import { toast } from "sonner";

export const useGetContacts = (filters: ContactFilters = {}) => {
  return useQuery<PaginatedContacts>({
    queryKey: ["contacts", filters],
    queryFn: () => contactAPI.getContacts(filters),
  });
};

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => {
      const contactData: ContactFormData = {
        name: data.name,
        email: data.email || undefined,
        phone_number: data.phone_number || undefined,
        message: data.message,
      };

      return contactAPI.createContact(contactData);
    },
    onSuccess: () => {
      toast.success("Contact form submitted successfully");
      console.log("Contact form submitted successfully");
    },
    onError: error => {
      toast.error("Failed to submit contact form");
      console.error("Failed to submit contact form:", error);
    },
  });
};

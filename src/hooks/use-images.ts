import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchImages, uploadImage } from "@/src/services/image-service";
import { toast } from "sonner";

export function useImages() {
    return useQuery({
        queryKey: ["images"],
        queryFn: fetchImages,
    });
}

export function useUploadImage(onSuccess?: (data: any, variables: File) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadImage,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["images"] });
            toast.success("Image uploaded successfully");
            onSuccess?.(data, variables);
        },
        onError: (error) => {
            toast.error(`Upload failed: ${error.message}`);
        },
    });
}

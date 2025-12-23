import { useQuery } from "@tanstack/react-query";
import { videosAPI } from "@/src/services/videos";
import {
  Videos,
} from "@/src/types/videos";

// Get all videos
export const useVideos = () => {
  return useQuery<Videos, Error>({
    queryKey: ["videos"],
    queryFn: videosAPI.getVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

import { siteConfig } from "@/src/config/site";
import {
  Videos,
} from "@/src/types/videos";

export const videosAPI = {
  // Get all videos
  getVideos: async (): Promise<Videos> => {
    const BASE_API_URL = siteConfig.backendUrl;
    const url = new URL(`${BASE_API_URL}/api/videos/`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch  videos: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
}
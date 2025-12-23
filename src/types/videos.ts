import { VideoPlatform } from "@/src/utils/video-utils";

export interface Video {
  id: number;
  url: string;
  title?: string;
  description?: string;
  platform?: VideoPlatform;
  created_at: string;
  updated_at: string;
}

export type Videos = Video[];


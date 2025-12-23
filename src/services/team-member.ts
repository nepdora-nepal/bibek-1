// services/api/owner-sites/admin/team-member.ts

import { siteConfig } from "@/src/config/site";
import { TeamMember } from "@/src/types/team";

export const teamAPI = {
  getTeamMembers: async (): Promise<TeamMember[]> => {
    try {
      const BASE_API_URL = siteConfig.backendUrl;
      const url = new URL(`${BASE_API_URL}/api/team-member/`);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch team members");
    }
  },
};

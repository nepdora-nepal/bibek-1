import { useQuery } from "@tanstack/react-query";
import { teamAPI } from "@/src/services/team-member";
import { TeamMember } from "@/src/types/team";

export const useTeamMembers = () => {
  return useQuery<TeamMember[], Error>({
    queryKey: ["team-members"],
    queryFn: () => teamAPI.getTeamMembers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

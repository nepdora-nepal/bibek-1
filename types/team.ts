export interface TeamMember {
  id: number;
  order: number;
  name: string;
  role: string;
  photo: string;
  about: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamResponse {
  results: TeamMember[];
  count: number;
  next: string | null;
  previous: string | null;
}

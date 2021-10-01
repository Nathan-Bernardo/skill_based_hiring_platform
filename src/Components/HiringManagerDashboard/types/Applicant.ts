export type Applicant = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  skills: string[];
  favorited: boolean;
  viewed: boolean;
  blacklisted: boolean;
  resumeId?: string;
};

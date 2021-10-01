type Job = {
  id: string;
  company: string;
  postedBy: string;
  title: string;
  seniority: 'Entry' | 'Mid-Level' | 'Senior';
  applicantsTotal: number;
  applicantsNew: number;
  favorited: boolean;
  salaryFrom?: number;
  salaryTo?: number;
  location: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  recruiterDetails: string;
  posted: number;
  hyperlink: string;
};

export default Job;

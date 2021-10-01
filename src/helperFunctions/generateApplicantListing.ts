import { Job } from '../Components/HiringManagerDashboard/types';
import { Applicant } from '../Components/HiringManagerDashboard/types/Applicant';
import { calculateApplicantScore } from './calculateApplicantScore';

export interface ApplicantListing extends Applicant {
  score: number;
}

export const generateApplicantListing = (applicants: Applicant[], job: Job): ApplicantListing[] =>
  applicants.map((applicant) => ({
    ...applicant,
    score: calculateApplicantScore(job, applicant.skills),
  }));

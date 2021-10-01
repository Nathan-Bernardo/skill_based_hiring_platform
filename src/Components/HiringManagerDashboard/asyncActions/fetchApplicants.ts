import { generateRandomApplicant } from '../../../helperFunctions/generateRandomApplicant';
import { Job } from '../types';
import { Applicant } from '../types/Applicant';

export const fetchApplicants = async (job: Job): Promise<Applicant[]> =>
  new Promise((res) => {
    setTimeout(() => {
      const applicants = [];
      for (let i = 0; i < job.applicantsNew; i++) {
        applicants.push(generateRandomApplicant(false));
      }
      for (let i = 0; i < job.applicantsTotal - job.applicantsNew; i++) {
        applicants.push(generateRandomApplicant(true));
      }
      res(applicants);
    }, 1500);
  });

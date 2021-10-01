import { JobList } from '../Components/HiringManagerDashboard/types';
import { NormalizedJobLists } from './normalize';

export const hasJobs = ({ jobs, childJobLists }: JobList, jobListsById: NormalizedJobLists): boolean => {
  if (jobs.length > 0) {
    return true;
  }
  for (const childJobList of childJobLists) {
    if (hasJobs(jobListsById[childJobList], jobListsById)) {
      return true;
    }
  }
  return false;
};

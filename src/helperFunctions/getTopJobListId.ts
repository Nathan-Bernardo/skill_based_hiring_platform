import { JobList } from '../Components/HiringManagerDashboard/types';

export const getTopJobListId = (jobLists: JobList[]): string => {
  const childrenJobs = new Set();
  jobLists.forEach((jobList) => {
    jobList.childJobLists.forEach((id) => {
      childrenJobs.add(id);
    });
  });
  for (const jobList of jobLists) {
    if (!childrenJobs.has(jobList.id)) {
      return jobList.id;
    }
  }
  return '';
};

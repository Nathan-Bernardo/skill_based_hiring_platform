import { JobListApplicantCount } from '../Components/HiringManagerDashboard/components/SideBar';
import { Job, JobList } from '../Components/HiringManagerDashboard/types';
import { getTopJobListId } from './getTopJobListId';
import { createNormalizedJobList, createNormalizedJobs } from './normalize';

export type paths = {
  [id: string]: string[];
};

export const getPaths = (jobLists: JobList[]): paths => {
  const normalizedJobLists = createNormalizedJobList(jobLists);
  let paths = {};
  const populatePaths = ({ jobs, childJobLists, id }: JobList, currentPath: string[] = []): void => {
    jobs.forEach((jobId) => {
      paths = { ...paths, [jobId]: [...currentPath, id] };
    });
    childJobLists.forEach((child) => {
      populatePaths(normalizedJobLists[child], [...currentPath, id]);
    });
  };
  populatePaths(normalizedJobLists[getTopJobListId(jobLists)]);
  return paths;
};

export const populateJobListApplicantCount = (jobs: Job[], jobLists: JobList[]): JobListApplicantCount => {
  const paths = getPaths(jobLists);
  const normalizedJobs = createNormalizedJobs(jobs);
  const applicantCounts: JobListApplicantCount = {};

  Object.keys(paths).forEach((jobId) => {
    const { applicantsNew, applicantsTotal } = normalizedJobs[jobId];
    paths[jobId].forEach((path) => {
      if (applicantCounts[path] === undefined) {
        applicantCounts[path] = [applicantsNew, applicantsTotal];
      } else {
        const [newApps, totalApps] = applicantCounts[path];
        applicantCounts[path] = [applicantsNew + newApps, applicantsTotal + totalApps];
      }
    });
  });
  return applicantCounts;
};

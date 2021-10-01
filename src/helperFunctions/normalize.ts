import { Job, JobList } from '../Components/HiringManagerDashboard/types';

export type NormalizedJobLists = {
  [id: string]: JobList;
};

export type NormalizedJobs = {
  [id: string]: Job;
};

export const createNormalizedJobList = (jobLists: JobList[]): NormalizedJobLists =>
  jobLists.reduce((allJobLists, jobList) => ({ ...allJobLists, [jobList.id]: jobList }), {});

export const createNormalizedJobs = (jobs: Job[]): NormalizedJobs =>
  jobs.reduce((allJobs, job) => ({ ...allJobs, [job.id]: job }), {});

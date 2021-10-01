import { JobList } from '../Components/HiringManagerDashboard/types';
import { NormalizedJobLists } from './normalize';

type JobListJobPair = {
  jobListId: string;
  jobId: string;
};

// To use for onClick on sidebar folder
export const populateJobs = (
  jobList: JobList,
  normalizedJobList: NormalizedJobLists,
  userId: string,
): JobListJobPair[] =>
  jobList.childJobLists
    .filter((childJobList) => normalizedJobList[childJobList].permissions.view.includes(userId))
    .reduce(
      (allJobs, childJobList) => [
        ...allJobs,
        ...populateJobs(normalizedJobList[childJobList], normalizedJobList, userId),
      ],
      getJobListJobPair(jobList),
    );

const getJobListJobPair = ({ id, jobs }: JobList): JobListJobPair[] =>
  jobs.map((jobId) => ({
    jobListId: id,
    jobId,
  }));

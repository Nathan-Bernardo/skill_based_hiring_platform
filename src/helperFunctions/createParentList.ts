import { JobList, JobListParents } from '../Components/HiringManagerDashboard/types';

export const createParentList = (jobLists: JobList[]): JobListParents =>
  jobLists.reduce(
    (allJobListParents, jobList) => ({
      ...allJobListParents,
      ...jobList.childJobLists.reduce(
        (childAllJobListParents, childJobListId) => ({
          ...childAllJobListParents,
          [childJobListId]: jobList.id,
        }),
        {},
      ),
    }),
    {},
  );

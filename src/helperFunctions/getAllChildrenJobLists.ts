import { JobList } from '../Components/HiringManagerDashboard/types';
import { NormalizedJobLists } from './normalize';

type JobListParentPair = {
  jobList: JobList;
  parentJobListId: string;
};

export const getAllChildrenJobLists = (
  jobList: JobList,
  parentJobListId: string,
  normalizedJobLists: NormalizedJobLists,
): JobListParentPair[] =>
  jobList.childJobLists.reduce(
    (allJobLists, childJobList): JobListParentPair[] => [
      ...allJobLists,
      ...getAllChildrenJobLists(normalizedJobLists[childJobList], jobList.id, normalizedJobLists),
    ],
    [{ jobList, parentJobListId }],
  );

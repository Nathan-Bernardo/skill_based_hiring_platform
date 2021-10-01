import { WritableDraft } from 'immer/dist/internal';
import { SetJobListsAction } from '../Components/HiringManagerDashboard/actions/jobListActions';
import { JobListPaths } from '../Components/HiringManagerDashboard/types';
import { getTopJobListId } from './getTopJobListId';
import { createNormalizedJobList } from './normalize';

export const writePathsToDraft = (draft: WritableDraft<JobListPaths>, { jobLists }: SetJobListsAction): void => {
  const normalizedJobLists = createNormalizedJobList(jobLists);
  const writeToDraft = (jobListId: string, parentJobListId = ''): void => {
    draft[jobListId] = draft[parentJobListId] !== undefined ? [...draft[parentJobListId], parentJobListId] : [];
    normalizedJobLists[jobListId].childJobLists.forEach((childJobListId) => {
      writeToDraft(childJobListId, jobListId);
    });
  };

  writeToDraft(getTopJobListId(jobLists));
};

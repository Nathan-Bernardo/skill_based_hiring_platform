import produce from 'immer';
import { combineReducers, Reducer } from 'redux';
import { WritableDraft } from 'immer/dist/internal';

import {
  createNormalizedJobs,
  NormalizedJobLists,
  getPaths,
  getTopJobListId,
  writePathsToDraft,
} from '../../../helperFunctions';
import { ADD_JOB, DELETE_JOB, JobActionTypes, MoveJobAction, MOVE_JOB, UPDATE_JOB } from '../actions/jobActions';
import {
  AddJobListAction,
  ADD_JOBLIST,
  DELETE_JOBLIST,
  JobListActionTypes,
  SetApplicantCounts,
  SetCurrentJobListId,
  SetJobListsAction,
  SetTopJobListIdAction,
  SET_APPLICANTS_COUNT,
  SET_CURRENT_JOBLIST,
  SET_JOBLISTS,
  SET_TOP_JOBLIST_ID,
  UPDATE_JOBLIST,
} from '../actions/jobListActions';
import { JobListParents, JobListPaths } from '../types';
import { JobListApplicantCount } from '../components/SideBar';

const initialIdState: string[] = [];
const initialJobListState: NormalizedJobLists = {};
const initialParentList: JobListParents = {};
const initialApplicantCounts: JobListApplicantCount = {};
const initialJobListPaths: JobListPaths = {};

type AllActions = JobActionTypes | JobListActionTypes | SetJobListsAction | MoveJobAction | SetApplicantCounts;
const actionIsJob = (toBeDetermined: AllActions): toBeDetermined is JobActionTypes =>
  [ADD_JOB, UPDATE_JOB, DELETE_JOB].includes((toBeDetermined as JobActionTypes).type);

const actionIsJobList = (toBeDetermined: AllActions): toBeDetermined is JobListActionTypes =>
  [ADD_JOBLIST, UPDATE_JOBLIST, DELETE_JOBLIST].includes((toBeDetermined as JobListActionTypes).type);

const actionIsSetJobLists = (toBeDetermined: AllActions): toBeDetermined is SetJobListsAction =>
  (toBeDetermined as SetJobListsAction).type === SET_JOBLISTS;

const actionIsSetApplicantCount = (toBeDetermined: AllActions): toBeDetermined is SetApplicantCounts =>
  (toBeDetermined as SetApplicantCounts).type === SET_APPLICANTS_COUNT;

const actionIsMoveJob = (toBeDetermined: AllActions): toBeDetermined is MoveJobAction =>
  (toBeDetermined as MoveJobAction).type === MOVE_JOB;

const jobReducer = (draft: WritableDraft<NormalizedJobLists>, { type, job, jobListId }: JobActionTypes): void => {
  switch (type) {
    case ADD_JOB:
      draft[jobListId].jobs.push(job.id);
      break;
    case DELETE_JOB:
      draft[jobListId].jobs.splice(
        draft[jobListId].jobs.findIndex((id) => id === job.id),
        1,
      );
  }
};

const jobListEntryReducer = (
  draft: WritableDraft<NormalizedJobLists>,
  { type, jobList, parentJobListId }: JobListActionTypes,
): void => {
  switch (type) {
    case ADD_JOBLIST:
      draft[parentJobListId].childJobLists.push(jobList.id);
      draft[jobList.id] = jobList;
      break;
    case UPDATE_JOBLIST:
      draft[jobList.id] = jobList;
      break;
    case DELETE_JOBLIST:
      if (draft[parentJobListId] !== undefined) {
        draft[parentJobListId].childJobLists.splice(
          draft[parentJobListId].childJobLists.findIndex((id) => id === jobList.id),
          1,
        );
      }
      delete draft[jobList.id];
  }
};

const setJobListsReducer = (draft: WritableDraft<NormalizedJobLists>, { type, jobLists }: SetJobListsAction): void => {
  if (type === SET_JOBLISTS) {
    jobLists.forEach((jobList) => {
      draft[jobList.id] = jobList;
    });
  }
};

const singleJobListReducer = (draft: WritableDraft<string[]>, { type, jobList }: JobListActionTypes): void => {
  switch (type) {
    case ADD_JOBLIST:
      draft.push(jobList.id);
      break;
    case DELETE_JOBLIST:
      draft.splice(
        draft.findIndex((id) => id === jobList.id),
        1,
      );
  }
};

const setAllJobLists = (draft: WritableDraft<string[]>, { type, jobLists }: SetJobListsAction): void => {
  switch (type) {
    case SET_JOBLISTS:
      jobLists.forEach(({ id }) => {
        draft.push(id);
      });
  }
};

const addToParentList = (
  draft: WritableDraft<JobListParents>,
  { type, parentJobListId, jobList }: JobListActionTypes,
): void => {
  switch (type) {
    case ADD_JOBLIST:
      draft[jobList.id] = parentJobListId;
      break;
    case DELETE_JOBLIST:
      delete draft[jobList.id];
  }
};

const setParentList = (draft: WritableDraft<JobListParents>, { type, jobLists }: SetJobListsAction): void => {
  switch (type) {
    case SET_JOBLISTS:
      jobLists.forEach(({ childJobLists, id }) => {
        childJobLists.forEach((childJobListId) => {
          draft[childJobListId] = id;
        });
      });
  }
};

const setApplicantCount = (
  draft: WritableDraft<JobListApplicantCount>,
  { type, jobs, jobLists }: SetApplicantCounts,
): void => {
  const paths = getPaths(jobLists);
  const normalizedJobs = createNormalizedJobs(jobs);
  switch (type) {
    case SET_APPLICANTS_COUNT:
      jobLists.forEach(({ id }) => {
        draft[id] = [0, 0];
      });
      Object.keys(paths).forEach((jobId) => {
        const { applicantsNew, applicantsTotal } = normalizedJobs[jobId];
        paths[jobId].forEach((path) => {
          const [newApps, totalApps] = draft[path];
          draft[path] = [newApps + applicantsNew, totalApps + applicantsTotal];
        });
      });
  }
};

const allJobListsReducer: Reducer<string[], JobListActionTypes | SetJobListsAction> = produce(
  (draft: WritableDraft<string[]>, action: JobListActionTypes | SetJobListsAction): void => {
    if (actionIsJobList(action)) {
      singleJobListReducer(draft, action);
    } else if (actionIsSetJobLists(action)) {
      setAllJobLists(draft, action);
    }
  },
  initialIdState,
);

const moveJobReducer = (
  draft: WritableDraft<NormalizedJobLists>,
  { type, currentJobListId, destination, job }: MoveJobAction,
): void => {
  switch (type) {
    case MOVE_JOB:
      if (draft[currentJobListId] !== undefined && draft[destination] !== undefined) {
        draft[currentJobListId].jobs.splice(
          draft[currentJobListId].jobs.findIndex((id) => id === job.id),
          1,
        );
        draft[destination].jobs.push(job.id);
      }
  }
};

const jobListsById: Reducer<
  NormalizedJobLists,
  JobActionTypes | JobListActionTypes | SetJobListsAction | MoveJobAction
> = produce(
  (
    draft: WritableDraft<NormalizedJobLists>,
    action: JobActionTypes | JobListActionTypes | SetJobListsAction | MoveJobAction,
  ): void => {
    if (actionIsJob(action)) {
      jobReducer(draft, action);
    } else if (actionIsJobList(action)) {
      jobListEntryReducer(draft, action);
    } else if (actionIsSetJobLists(action)) {
      setJobListsReducer(draft, action);
    } else if (actionIsMoveJob(action)) {
      moveJobReducer(draft, action);
    }
  },
  initialJobListState,
);

const parentListReducer: Reducer<JobListParents, JobListActionTypes | SetJobListsAction> = produce(
  (draft: WritableDraft<JobListParents>, action: JobListActionTypes | SetJobListsAction) => {
    if (actionIsJobList(action)) {
      addToParentList(draft, action);
    } else if (actionIsSetJobLists(action)) {
      setParentList(draft, action);
    }
  },
  initialParentList,
);

const setTopJobList: Reducer<string, SetTopJobListIdAction> = (
  state = '',
  { type, jobLists }: SetTopJobListIdAction,
): string => {
  switch (type) {
    case SET_TOP_JOBLIST_ID:
      return getTopJobListId(jobLists);
    default:
      return state;
  }
};

const moveJobApplicants = (
  draft: WritableDraft<JobListApplicantCount>,
  { type, currentJobListId, destination, paths, job }: MoveJobAction,
): void => {
  switch (type) {
    case MOVE_JOB:
      if (paths !== undefined) {
        for (const path of paths[currentJobListId]) {
          draft[path][0] -= job.applicantsNew;
          draft[path][1] -= job.applicantsTotal;
        }
        draft[currentJobListId][0] -= job.applicantsNew;
        draft[currentJobListId][1] -= job.applicantsTotal;
        for (const path of paths[destination]) {
          draft[path][0] += job.applicantsNew;
          draft[path][1] += job.applicantsTotal;
        }
        draft[destination][0] += job.applicantsNew;
        draft[destination][1] += job.applicantsTotal;
      }
  }
};

const addJobListApplicants = (
  draft: WritableDraft<JobListApplicantCount>,
  { type, jobList }: AddJobListAction,
): void => {
  switch (type) {
    case ADD_JOBLIST:
      draft[jobList.id] = [0, 0];
  }
};

const applicantCountReducer: Reducer<
  JobListApplicantCount,
  SetApplicantCounts | MoveJobAction | AddJobListAction
> = produce(
  (draft: WritableDraft<JobListApplicantCount>, action: SetApplicantCounts | MoveJobAction | AddJobListAction) => {
    if (actionIsSetApplicantCount(action)) {
      setApplicantCount(draft, action);
    } else if (actionIsMoveJob(action)) {
      moveJobApplicants(draft, action);
    } else if (actionIsJobList(action)) {
      addJobListApplicants(draft, action);
    }
  },
  initialApplicantCounts,
);

const setCurrentJobList: Reducer<string, SetCurrentJobListId> = (
  state = '',
  { type, jobListId }: SetCurrentJobListId,
): string => {
  switch (type) {
    case SET_CURRENT_JOBLIST:
      return jobListId;
  }
  return state;
};

const setJobListPath = (draft: WritableDraft<JobListPaths>, action: SetJobListsAction): void => {
  switch (action.type) {
    case SET_JOBLISTS:
      writePathsToDraft(draft, action);
  }
};

const addJobListPath = (
  draft: WritableDraft<JobListPaths>,
  { type, parentJobListId, jobList }: AddJobListAction,
): void => {
  switch (type) {
    case ADD_JOBLIST:
      draft[jobList.id] = [...draft[parentJobListId], parentJobListId];
  }
};

const jobListPathsReducer: Reducer<JobListPaths, AddJobListAction | SetJobListsAction> = produce(
  (draft: WritableDraft<JobListPaths>, action: AddJobListAction | SetJobListsAction) => {
    if (actionIsSetJobLists(action)) {
      setJobListPath(draft, action);
    } else if (actionIsJobList(action)) {
      addJobListPath(draft, action);
    }
  },
  initialJobListPaths,
);

export const jobListReducer = combineReducers({
  byId: jobListsById,
  allIds: allJobListsReducer,
  parentList: parentListReducer,
  topJobListId: setTopJobList,
  applicantCounts: applicantCountReducer,
  currentJobListId: setCurrentJobList,
  paths: jobListPathsReducer,
});

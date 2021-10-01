import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { combineReducers, Reducer } from 'redux';
import { NormalizedJobs } from '../../../helperFunctions/normalize';
import {
  ADD_JOB,
  DELETE_JOB,
  JobActionTypes,
  SetCurrentJobAction,
  SetJobsAction,
  SET_CURRENT_JOB,
  SET_JOBS,
  UPDATE_JOB,
} from '../actions/jobActions';

const initialJobState: NormalizedJobs = {};
const initialIdState: string[] = [];

const actionIsJob = (toBeDetermined: JobActionTypes | SetJobsAction): toBeDetermined is JobActionTypes =>
  [ADD_JOB, UPDATE_JOB, DELETE_JOB].includes((toBeDetermined as JobActionTypes).type);

const actionIsSetJobs = (toBeDetermined: JobActionTypes | SetJobsAction): toBeDetermined is SetJobsAction =>
  (toBeDetermined as SetJobsAction).type === SET_JOBS;

const jobEntry = (draft: WritableDraft<NormalizedJobs>, { type, job }: JobActionTypes): void => {
  switch (type) {
    case ADD_JOB:
    case UPDATE_JOB:
      draft[job.id] = job;
      break;
    case DELETE_JOB:
      delete draft[job.id];
  }
};

const setJobs = (draft: WritableDraft<NormalizedJobs>, { type, jobs }: SetJobsAction): void => {
  switch (type) {
    case SET_JOBS:
      jobs.forEach((job) => {
        draft[job.id] = job;
      });
  }
};

const jobIdEntries = (draft: WritableDraft<string[]>, { type, job }: JobActionTypes): void => {
  switch (type) {
    case ADD_JOB:
      draft.push(job.id);
      break;
    case DELETE_JOB:
      draft.splice(
        draft.findIndex((id) => id === job.id),
        1,
      );
  }
};

const setJobIds = (draft: WritableDraft<string[]>, { type, jobs }: SetJobsAction): void => {
  switch (type) {
    case SET_JOBS:
      jobs.forEach(({ id }) => {
        draft.push(id);
      });
  }
};

const byIdJobsReducer: Reducer<NormalizedJobs, JobActionTypes | SetJobsAction> = produce(
  (draft: WritableDraft<NormalizedJobs>, action: JobActionTypes | SetJobsAction): void => {
    if (actionIsJob(action)) {
      jobEntry(draft, action);
    } else if (actionIsSetJobs(action)) {
      setJobs(draft, action);
    }
  },
  initialJobState,
);

const allJobsReducer: Reducer<string[], JobActionTypes | SetJobsAction> = produce(
  (draft: WritableDraft<string[]>, action: JobActionTypes | SetJobsAction): void => {
    if (actionIsJob(action)) {
      jobIdEntries(draft, action);
    } else if (actionIsSetJobs(action)) {
      setJobIds(draft, action);
    }
  },
  initialIdState,
);

const currentJobIdReducer: Reducer<string, SetCurrentJobAction> = (
  state = '',
  { type, jobId }: SetCurrentJobAction,
): string => {
  switch (type) {
    case SET_CURRENT_JOB:
      return jobId;
    default:
      return state;
  }
};

export const jobsReducer = combineReducers({
  byId: byIdJobsReducer,
  allIds: allJobsReducer,
  currentJobId: currentJobIdReducer,
});

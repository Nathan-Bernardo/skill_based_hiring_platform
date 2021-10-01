import { Job, JobListPaths } from '../types';

export const SET_JOBS = 'SET_JOBS';
export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const ADD_JOB = 'ADD_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const MOVE_JOB = 'MOVE_JOB';

export type SetJobsAction = {
  type: typeof SET_JOBS;
  jobs: Job[];
};

export type SetCurrentJobAction = {
  type: typeof SET_CURRENT_JOB;
  jobId: string;
};

export type AddJobAction = {
  type: typeof ADD_JOB;
  jobListId: string;
  job: Job;
};

export type UpdateJobAction = {
  type: typeof UPDATE_JOB;
  jobListId: string;
  job: Job;
};

export type DeleteJobAction = {
  type: typeof DELETE_JOB;
  jobListId: string;
  job: Job;
};

export type MoveJobAction = {
  type: typeof MOVE_JOB;
  currentJobListId: string;
  destination: string;
  paths?: JobListPaths;
  job: Job;
};

export type JobActionTypes = AddJobAction | UpdateJobAction | DeleteJobAction;

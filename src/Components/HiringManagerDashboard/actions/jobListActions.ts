import { Job, JobList } from '../types';

export const SET_JOBLISTS = 'SET_JOBLISTS';
export const SET_TOP_JOBLIST_ID = 'SET_TOP_JOBLIST_ID';
export const SET_APPLICANTS_COUNT = 'SET_APPLICANTS_COUNT';
export const SET_CURRENT_JOBLIST = 'SET_CURRENT_JOBLIST';
export const ADD_JOBLIST = 'ADD_JOBLIST';
export const UPDATE_JOBLIST = 'UPDATE_JOBLIST';
export const DELETE_JOBLIST = 'DELETE_JOBLIST';

export type SetJobListsAction = {
  type: typeof SET_JOBLISTS;
  jobLists: JobList[];
};

export type SetTopJobListIdAction = {
  type: typeof SET_TOP_JOBLIST_ID;
  jobLists: JobList[];
};

export type SetApplicantCounts = {
  type: typeof SET_APPLICANTS_COUNT;
  jobLists: JobList[];
  jobs: Job[];
};

export type SetCurrentJobListId = {
  type: typeof SET_CURRENT_JOBLIST;
  jobListId: string;
};

export type AddJobListAction = {
  type: typeof ADD_JOBLIST;
  parentJobListId: string;
  jobList: JobList;
};

export type UpdateJobListAction = {
  type: typeof UPDATE_JOBLIST;
  parentJobListId: string;
  jobList: JobList;
};

export type DeleteJobListAction = {
  type: typeof DELETE_JOBLIST;
  parentJobListId: string;
  jobList: JobList;
};

export type JobListActionTypes = AddJobListAction | UpdateJobListAction | DeleteJobListAction;

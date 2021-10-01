import { useSelector } from 'react-redux';
import { Job, JobList } from '../Components/HiringManagerDashboard/types';
import { AppState } from '../store/rootReducer';

export const getJobById = (jobId: string): Job =>
  useSelector((state: AppState) => state.hiringManagerDashboard.jobs.byId[jobId]);
export const getJobListById = (jobListId: string): JobList =>
  useSelector((state: AppState) => state.hiringManagerDashboard.jobLists.byId[jobListId]);

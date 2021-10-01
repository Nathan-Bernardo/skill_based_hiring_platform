import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_JOBS } from '../Components/HiringManagerDashboard/actions/jobActions';
import {
  SET_APPLICANTS_COUNT,
  SET_CURRENT_JOBLIST,
  SET_JOBLISTS,
  SET_TOP_JOBLIST_ID,
} from '../Components/HiringManagerDashboard/actions/jobListActions';
import { SetInitialAction } from '../Components/Shared/action';
import { testJobLists, testJobs } from '../constants/testData';
import { getTopJobListId } from './getTopJobListId';

export const setData = <T>(data: T[]): void => {
  const dispatch = useDispatch();
  useEffect(() => {
    data.forEach((dataDispatch) => {
      dispatch<T>(dataDispatch);
    });
  }, [dispatch]);
};

export const initialize = (): void =>
  setData<SetInitialAction>([
    {
      type: SET_JOBLISTS,
      jobLists: testJobLists,
    },
    {
      type: SET_TOP_JOBLIST_ID,
      jobLists: testJobLists,
    },
    {
      type: SET_APPLICANTS_COUNT,
      jobs: testJobs,
      jobLists: testJobLists,
    },
    {
      type: SET_CURRENT_JOBLIST,
      jobListId: getTopJobListId(testJobLists),
    },
    {
      type: SET_JOBS,
      jobs: testJobs,
    },
  ]);

// export const fetchCandidateData = <T>(data: T{}): void => {
//   const dispatch = useDispatch();
// }

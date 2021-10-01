/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { JobList } from '../types';
import { populateJobs } from '../../../helperFunctions';
import { JobPosting } from './JobPosting';
import { jobListViewContainer, listFolder } from '../styles/ListView';
import { AppState } from '../../../store/rootReducer';
import { SetCurrentJobListId, SET_CURRENT_JOBLIST } from '../actions/jobListActions';

export const ListView = (jobList: JobList): JSX.Element => {
  const { user, hiringManagerDashboard } = useSelector((state: AppState) => state);
  const { id: userId } = user;
  const { jobLists, jobs } = hiringManagerDashboard;
  const dispatch = useDispatch();
  const handleChangeJobList = (): void => {
    dispatch<SetCurrentJobListId>({
      type: SET_CURRENT_JOBLIST,
      jobListId: jobList.id,
    });
  };

  return (
    <div className="listContainer">
      <div css={listFolder(false)} onClick={handleChangeJobList}>
        {jobList.name}
      </div>
      <div css={jobListViewContainer}>
        {populateJobs(jobList, jobLists.byId, userId).map(({ jobId, jobListId }) => (
          <JobPosting key={jobId} job={jobs.byId[jobId]} jobListId={jobListId} />
        ))}
      </div>
    </div>
  );
};

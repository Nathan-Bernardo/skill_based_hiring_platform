/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import WorkIcon from '@material-ui/icons/Work';
import { Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';

import { JobPosting } from './JobPosting';
import { ListView } from './ListView';
import { SideBar } from './SideBar';
import { dashBoardContainer, iconContainer, jobContainer } from '../styles/Dashboard';
import { jobListViewContainer, listFolder } from '../styles/ListView';
import { AppState } from '../../../store/rootReducer';
import { tooltip } from '../../Shared/styles/shared';
import { SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { DirectoryBreadCrumb } from './DirectoryBreadCrumb';
import { populateJobs, initialize } from '../../../helperFunctions';
import { SetCurrentJobAction, SET_CURRENT_JOB } from '../actions/jobActions';
import { HiringManagerModals } from './HiringManagerModals';

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const { user, hiringManagerDashboard } = useSelector((state: AppState) => state);
  const { jobs, jobLists, modals } = hiringManagerDashboard;
  const { state: modalState } = modals;
  const { byId } = jobLists;
  const { id: userId } = user;
  const { byId: byJobListsId, currentJobListId } = jobLists;
  const { byId: byJobsId } = jobs;
  const currentJobList = byJobListsId[currentJobListId];
  const favoriteJobs =
    currentJobListId !== ''
      ? populateJobs(currentJobList, byJobListsId, userId).filter(({ jobId }) => byJobsId[jobId].favorited)
      : [];

  initialize(dispatch);

  const toggleJobListModal = (): void => {
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'jobListModal',
      state: !modalState.jobListModal,
    });
  };

  const toggleJobModal = (): void => {
    dispatch<SetCurrentJobAction>({
      type: SET_CURRENT_JOB,
      jobId: '',
    });

    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'jobModal',
      state: !modalState.jobModal,
    });
  };

  return (
    <div css={dashBoardContainer}>
      {jobLists.allIds.length > 0 && (
        <Fragment>
          <SideBar />
          <div css={jobContainer}>
            <DirectoryBreadCrumb {...currentJobList} />
            {favoriteJobs.length > 0 && (
              <div
                css={[
                  listFolder(true),
                  css`
                    margin-top: 1em;
                  `,
                ]}
              >
                Favorite
              </div>
            )}
            <div css={jobListViewContainer}>
              <Tooltip title={<p css={tooltip}>Create a new Job</p>}>
                <div css={iconContainer} onClick={toggleJobModal}>
                  <WorkIcon style={{ fontSize: 100 }} />
                </div>
              </Tooltip>
              <Tooltip title={<p css={tooltip}>Create a new Folder</p>}>
                <div css={iconContainer} onClick={toggleJobListModal}>
                  <CreateNewFolderIcon style={{ fontSize: 100 }} />
                </div>
              </Tooltip>
              {favoriteJobs.map(({ jobId, jobListId }) => (
                <JobPosting key={jobId} job={byJobsId[jobId]} jobListId={jobListId} />
              ))}
            </div>
            {currentJobList.jobs.length > 0 && <div css={listFolder(true)}>{currentJobList.name}</div>}
            <div css={jobListViewContainer}>
              {currentJobList.jobs.map((jobId) => (
                <JobPosting key={jobId} job={byJobsId[jobId]} jobListId={currentJobListId} />
              ))}
            </div>
            {currentJobList.childJobLists
              .filter((childJobListId) => byId[childJobListId].permissions.view.includes(userId))
              .map((childJobListId) => (
                <ListView key={childJobListId} {...byJobListsId[childJobListId]} />
              ))}
          </div>
          <HiringManagerModals />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;

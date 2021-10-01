/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FC } from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store/rootReducer';
import { hoverPointer } from '../../Shared/styles/shared';
import { JobList } from '../types';
import { SetCurrentJobListId, SET_CURRENT_JOBLIST } from '../actions/jobListActions';

export const DirectoryBreadCrumb: FC<JobList> = (jobList: JobList): JSX.Element => {
  const { paths, byId: byJobListsId } = useSelector((state: AppState) => state.hiringManagerDashboard.jobLists);
  const dispatch = useDispatch();

  const handleChangeJobList = (jobListId: string): void => {
    dispatch<SetCurrentJobListId>({
      type: SET_CURRENT_JOBLIST,
      jobListId,
    });
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {paths[jobList.id].map((path) => (
        <Link key={`lnk-${path}`} color="inherit" css={hoverPointer} onClick={(): void => handleChangeJobList(path)}>
          {byJobListsId[path].name}
        </Link>
      ))}
      <Typography color="textPrimary">{jobList.name}</Typography>
    </Breadcrumbs>
  );
};

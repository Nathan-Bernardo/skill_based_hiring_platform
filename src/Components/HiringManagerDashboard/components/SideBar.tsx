/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useSelector } from 'react-redux';

import { SidebarItem } from './SidebarItem';
import { sideBarContainer } from '../styles/SideBar';
import { AppState } from '../../../store/rootReducer';

export type JobListApplicantCount = {
  [id: string]: [number, number];
};

export const SideBar = (): JSX.Element => {
  const { topJobListId } = useSelector((state: AppState) => state.hiringManagerDashboard.jobLists);
  return (
    <div css={sideBarContainer}>
      <SidebarItem jobListId={topJobListId} />
    </div>
  );
};

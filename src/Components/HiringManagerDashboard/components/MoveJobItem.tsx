/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Add, Remove } from '@material-ui/icons';
import { FC, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '../../../store/rootReducer';
import { flexRow } from '../../Shared/styles/shared';
import { childDirectory, moveJobItemLeft, moveJobItemRight } from '../styles/MoveJobModal';
import { JobList } from '../types';

type MoveJobItemProps = {
  jobList: JobList;
  selected: string | null;
  onClick: (jobListId: string) => void;
};

export const MoveJobItem: FC<MoveJobItemProps> = ({ jobList, selected, onClick }: MoveJobItemProps): JSX.Element => {
  const [childrenOpen, setChildrenState] = useState(false);
  const { jobLists } = useSelector((state: AppState) => state.hiringManagerDashboard);
  const { id, name, childJobLists } = jobList;
  return (
    <Fragment>
      <div css={flexRow}>
        {childJobLists.length > 0 && (
          <div css={moveJobItemLeft(selected === id)} onClick={(): void => setChildrenState(!childrenOpen)}>
            {childrenOpen ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </div>
        )}
        <div
          css={moveJobItemRight(selected === id, childJobLists.length > 0)}
          onClick={(): void => {
            onClick(id);
          }}
        >
          {name}
        </div>
      </div>
      <div css={childDirectory}>
        {childrenOpen &&
          childJobLists.map((childId) => (
            <MoveJobItem key={`mv-${childId}`} jobList={jobLists.byId[childId]} selected={selected} onClick={onClick} />
          ))}
      </div>
    </Fragment>
  );
};

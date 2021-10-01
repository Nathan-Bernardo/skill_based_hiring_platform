/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store/rootReducer';
import { Button } from '../../Shared/components/Button';
import { flexColumn, flexRow } from '../../Shared/styles/shared';
import { MoveJobAction, MOVE_JOB } from '../actions/jobActions';
import { ReadyJobMove, READY_JOB_MOVE, SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { modalContainer } from '../styles/Modals';
import { itemContainer } from '../styles/MoveJobModal';
import { Job } from '../types';
import { MoveJobItem } from './MoveJobItem';

type MoveJobModalProps = {
  job: Job | null;
  jobListId: string | null;
};

export const MoveJobModal: FC<MoveJobModalProps> = ({ job, jobListId }: MoveJobModalProps): JSX.Element => {
  const { byId: byJobListId, topJobListId, paths } = useSelector(
    (state: AppState) => state.hiringManagerDashboard.jobLists,
  );
  const topJobList = byJobListId[topJobListId];
  const [selectedJobList, setSelectedJobList] = useState<null | string>(null);
  const dispatch = useDispatch();

  const closeModal = (): void => {
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'moveJobModal',
      state: false,
    });
  };

  const handleClick = (destination: string): void => {
    if (selectedJobList === destination) {
      if (job !== null && jobListId !== null) {
        dispatch<MoveJobAction>({
          type: MOVE_JOB,
          currentJobListId: jobListId,
          paths,
          destination,
          job,
        });

        dispatch<ReadyJobMove>({
          type: READY_JOB_MOVE,
          job: null,
          jobListId: null,
        });
      }
      closeModal();
    } else {
      setSelectedJobList(destination);
    }
  };

  return (
    <div css={[modalContainer, flexColumn]}>
      <Typography>Where would you like to move the job to?</Typography>
      <div css={itemContainer}>
        <MoveJobItem jobList={topJobList} selected={selectedJobList} onClick={handleClick} />
      </div>
      <div css={flexRow}>
        <Button
          disabled={selectedJobList === null}
          onClick={(): void => {
            if (selectedJobList !== null) {
              handleClick(selectedJobList);
            }
          }}
        >
          Move
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
};

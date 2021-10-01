import { FC, Fragment } from 'react';
import { Modal } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { JobListModal } from './JobListModal';
import { JobModal } from './JobModal';
import { MoveJobModal } from './MoveJobModal';
import { AppState } from '../../../store/rootReducer';
import { SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { SetCurrentJobAction, SET_CURRENT_JOB } from '../actions/jobActions';

export const HiringManagerModals: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { modals, jobLists, jobs } = useSelector((state: AppState) => state.hiringManagerDashboard);
  const { byId: byJobsId, currentJobId } = jobs;
  const { currentJobListId } = jobLists;
  const { state: modalState, data: modalData } = modals;

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

  const toggleMoveJobModal = (): void => {
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'moveJobModal',
      state: !modalState.moveJobModal,
    });
  };

  return (
    <Fragment>
      <Modal open={modalState.jobListModal} onClose={toggleJobListModal}>
        <JobListModal jobListId={currentJobListId} />
      </Modal>
      <Modal open={modalState.jobModal} onClose={toggleJobModal}>
        <JobModal jobListId={currentJobListId} job={byJobsId[currentJobId]} />
      </Modal>
      <Modal open={modalState.moveJobModal} onClose={toggleMoveJobModal}>
        <MoveJobModal job={modalData.job} jobListId={modalData.jobListId} />
      </Modal>
    </Fragment>
  );
};

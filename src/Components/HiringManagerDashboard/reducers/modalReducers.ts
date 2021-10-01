import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { Reducer } from 'redux';

import { ReadyJobMove, READY_JOB_MOVE, SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { ModalState } from '../types';
import { ReadyJobState } from '../types/ModalState';

const initialModalState: ModalState = {
  jobListModal: false,
  jobModal: false,
  moveJobModal: false,
};

const initialReadyJobState: ReadyJobState = {
  job: null,
  jobListId: null,
};

export const modalStateReducer: Reducer<ModalState, SetModalState> = produce(
  (draft: WritableDraft<ModalState>, { type, modal, state }: SetModalState) => {
    switch (type) {
      case SET_MODAL_STATE:
        draft[modal] = state;
    }
  },
  initialModalState,
);

export const readyJobMoveReducer: Reducer<ReadyJobState, ReadyJobMove> = produce(
  (draft: WritableDraft<ReadyJobState>, { type, job, jobListId }: ReadyJobMove): void => {
    switch (type) {
      case READY_JOB_MOVE:
        draft.job = job;
        draft.jobListId = jobListId;
    }
  },
  initialReadyJobState,
);

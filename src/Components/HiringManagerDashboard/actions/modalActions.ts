import { Job, ModalType } from '../types';

export const SET_MODAL_STATE = 'SET_MODAL_STATE';
export const READY_JOB_MOVE = 'READY_JOB_MOVE';

export type SetModalState = {
  type: typeof SET_MODAL_STATE;
  modal: ModalType;
  state: boolean;
};

export type ReadyJobMove = {
  type: typeof READY_JOB_MOVE;
  job: Job | null;
  jobListId: string | null;
};

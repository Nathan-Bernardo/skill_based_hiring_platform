import Job from './Job';

export type ModalState = {
  jobListModal: boolean;
  jobModal: boolean;
  moveJobModal: boolean;
};

export type ReadyJobState = {
  job: Job | null;
  jobListId: string | null;
};

export type ModalType = 'jobListModal' | 'jobModal' | 'moveJobModal';

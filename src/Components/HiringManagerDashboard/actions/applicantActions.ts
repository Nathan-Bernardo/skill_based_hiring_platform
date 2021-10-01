import { Applicant } from '../types/Applicant';

export const SET_APPLICANTS = 'SET_APPLICANTS';
export const UNSET_APPLICANTS = 'UNSET_APPLICANTS';
export const SET_CURRENT_APPLICANT = 'SET_CURRENT_APPLICANT';
export const UPDATE_APPLICANT = 'UPDATE_APPLICANT';

export type SetApplicantsAction = {
  type: typeof SET_APPLICANTS;
  applicants: Applicant[];
};

export type UnsetApplicantsAction = {
  type: typeof UNSET_APPLICANTS;
};

export type SetCurrentApplicantAction = {
  type: typeof SET_CURRENT_APPLICANT;
  applicantId: string;
};

export type UpdateApplicantAction = {
  type: typeof UPDATE_APPLICANT;
  applicant: Applicant;
};

export type AllApplicantActions = SetApplicantsAction | SetCurrentApplicantAction | UpdateApplicantAction;

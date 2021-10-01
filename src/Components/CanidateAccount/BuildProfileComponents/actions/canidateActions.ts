import { Candidate } from '../types';

export const CHANGE_CONTACT_DETAILS = 'CHANGE_CONTACT_DETAILS';

export type changeContactDetails = {
  type: typeof CHANGE_CONTACT_DETAILS;
  candidate: Candidate;
};

import { User } from '../../HiringManagerDashboard/types';

export const SET_USER_STATE = 'SET_USER_STATE';

export type SetUserState = {
  type: typeof SET_USER_STATE;
  user: User;
};

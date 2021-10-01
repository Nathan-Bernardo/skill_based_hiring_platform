import { Reducer } from 'redux';

import { generateInitialUser } from '../../../constants/initialStates';
import { User } from '../../HiringManagerDashboard/types';
import { SetUserState, SET_USER_STATE } from '../actions/userActions';

export const userReducer: Reducer<User, SetUserState> = (
  state = generateInitialUser(),
  { type, user }: SetUserState,
): User => {
  switch (type) {
    case SET_USER_STATE:
      return { ...state, ...user };
    default:
      return state;
  }
};

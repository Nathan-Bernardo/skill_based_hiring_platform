import { experiencesReducer } from './../Components/CanidateAccount/BuildProfileComponents/reducers/candidateReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux';
import { jobListReducer } from '../Components/HiringManagerDashboard/reducers/jobListReducers';
import { jobsReducer } from '../Components/HiringManagerDashboard/reducers/jobReducers';
import { modalStateReducer, readyJobMoveReducer } from '../Components/HiringManagerDashboard/reducers/modalReducers';
import { userReducer } from '../Components/HiringManagerLogin/reducers/loginReducer';
import {
  contactReducer,
  skillsReducer,
} from '../Components/CanidateAccount/BuildProfileComponents/reducers/candidateReducer';

export const rootReducer = combineReducers({
  hiringManagerDashboard: combineReducers({
    jobLists: jobListReducer,
    jobs: jobsReducer,
    modals: combineReducers({
      state: modalStateReducer,
      data: readyJobMoveReducer,
    }),
  }),
  candidateDetails: combineReducers({
    contact: contactReducer,
    skillState: skillsReducer,
    experienceState: experiencesReducer,
  }),
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});

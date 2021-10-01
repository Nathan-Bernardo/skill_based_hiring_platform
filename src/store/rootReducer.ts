import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { applicantsReducer } from '../Components/HiringManagerDashboard/reducers/applicantReducers';
import { jobListReducer } from '../Components/HiringManagerDashboard/reducers/jobListReducers';
import { jobsReducer } from '../Components/HiringManagerDashboard/reducers/jobReducers';
import { modalStateReducer, readyJobMoveReducer } from '../Components/HiringManagerDashboard/reducers/modalReducers';
import { userReducer } from '../Components/HiringManagerLogin/reducers/loginReducer';

export const rootReducer = combineReducers({
  hiringManagerDashboard: combineReducers({
    jobLists: jobListReducer,
    jobs: jobsReducer,
    modals: combineReducers({
      state: modalStateReducer,
      data: readyJobMoveReducer,
    }),
    applicants: applicantsReducer,
  }),
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

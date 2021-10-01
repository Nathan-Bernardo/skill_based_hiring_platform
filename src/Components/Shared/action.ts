import { SetJobsAction } from '../HiringManagerDashboard/actions/jobActions';
import {
  SetApplicantCounts,
  SetCurrentJobListId,
  SetJobListsAction,
  SetTopJobListIdAction,
} from '../HiringManagerDashboard/actions/jobListActions';

export type SetInitialAction =
  | SetJobListsAction
  | SetTopJobListIdAction
  | SetApplicantCounts
  | SetCurrentJobListId
  | SetJobsAction;

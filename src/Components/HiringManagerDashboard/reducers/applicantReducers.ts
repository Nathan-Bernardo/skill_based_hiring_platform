import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { combineReducers, Reducer } from 'redux';
import {
  AllApplicantActions,
  SetApplicantsAction,
  SetCurrentApplicantAction,
  SET_APPLICANTS,
  SET_CURRENT_APPLICANT,
  UnsetApplicantsAction,
  UNSET_APPLICANTS,
  UpdateApplicantAction,
  UPDATE_APPLICANT,
} from '../actions/applicantActions';
import { Applicant } from '../types/Applicant';

type ApplicantsById = { [id: string]: Applicant };
const initialApplicants: ApplicantsById = {};

const actionIsSetApplicants = (toBeDetermined: AllApplicantActions): toBeDetermined is SetApplicantsAction =>
  (toBeDetermined as SetApplicantsAction).type === SET_APPLICANTS;
const actionIsUpdateApplicants = (toBeDetermined: AllApplicantActions): toBeDetermined is UpdateApplicantAction =>
  (toBeDetermined as UpdateApplicantAction).type === UPDATE_APPLICANT;

const applicantsByIdReducer: Reducer<
  ApplicantsById,
  SetApplicantsAction | UpdateApplicantAction | UnsetApplicantsAction
> = produce(
  (
    draft: WritableDraft<ApplicantsById>,
    action: SetApplicantsAction | UpdateApplicantAction | UnsetApplicantsAction,
  ) => {
    switch (action.type) {
      case SET_APPLICANTS:
        if (actionIsSetApplicants(action)) {
          action.applicants.forEach((applicant) => {
            draft[applicant.id] = applicant;
          });
        }
        break;
      case UNSET_APPLICANTS:
        return { initialApplicants };
      case UPDATE_APPLICANT:
        if (actionIsUpdateApplicants(action)) {
          draft[action.applicant.id] = action.applicant;
        }
    }
  },
  initialApplicants,
);

const currentApplicantReducer: Reducer<string, SetCurrentApplicantAction | UnsetApplicantsAction> = (
  state = '',
  action: SetCurrentApplicantAction | UnsetApplicantsAction,
): string => {
  switch (action.type) {
    case SET_CURRENT_APPLICANT:
      return action.applicantId;
    case UNSET_APPLICANTS:
      return '';
    default:
      return state;
  }
};

export const applicantsReducer = combineReducers({
  byId: applicantsByIdReducer,
  currentApplicantId: currentApplicantReducer,
});

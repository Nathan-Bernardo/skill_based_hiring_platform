import { SetSkills, SET_SKILLS } from './../actions/skillsAction';
import { changeContactDetails, CHANGE_CONTACT_DETAILS } from './../actions/canidateActions';
import { Candidate } from './../types/candidate';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';
import { Reducer } from 'redux';
import { AddSkill, ADD_SKILL, DeleteSkill, DELETE_SKILL } from '../actions/skillsAction';
import { AddExperience, ADD_EXPERIENCE, DeleteExperience, DELETE_EXPERIENCE } from '../actions/experiencesAction';
import { Experience } from '../types/experience';
import { v4 as uuidv4 } from 'uuid';

// const initialSkillState: string[] = [];

type SkillState = {
  skills: string[];
  status: 'idle' | 'loading' | 'failed';
};

type ExperienceState = {
  experiences: Experience[];
  status: 'idle' | 'loading' | 'failed';
};

const initialSkillState: SkillState = {
  skills: [],
  status: 'idle',
};

const initialExperienceState: ExperienceState = {
  experiences: [],
  status: 'idle',
};

const initialContactState: Candidate = {
  id: '',
  name: '',
  email: '',
  phone: '',
  skills: [],
};

const actionIsSetSkills = (toBeDetermined: AddSkill | DeleteSkill | SetSkills): toBeDetermined is SetSkills =>
  (toBeDetermined as SetSkills).type === SET_SKILLS;

export const skillsReducer: Reducer<SkillState, AddSkill | DeleteSkill | SetSkills> = produce(
  (draft: WritableDraft<SkillState>, action: AddSkill | DeleteSkill | SetSkills): void => {
    switch (action.type) {
      case ADD_SKILL:
        draft.skills.push(action.skill);
        break;

      case DELETE_SKILL:
        draft.skills.splice(
          draft.skills.findIndex((skill) => skill === action.skill),
          1,
        );
        break;

      case SET_SKILLS:
        if (actionIsSetSkills(action)) {
          draft.skills = action.skills;
        }
    }
  },
  initialSkillState,
);

const generateNewExperience = (): Experience => ({
  id: uuidv4(),
  title: '',
  company: '',
  start: +Date.now(),
  end: +Date.now(),
  details: '',
});

export const experiencesReducer: Reducer<ExperienceState, AddExperience | DeleteExperience> = produce(
  (draft: WritableDraft<ExperienceState>, action: AddExperience | DeleteExperience): void => {
    switch (action.type) {
      case ADD_EXPERIENCE:
        draft.experiences.push(generateNewExperience());
        break;

      case DELETE_EXPERIENCE:
        draft.experiences.splice(
          draft.experiences.findIndex((experience) => experience.id === action.id),
          1,
        );
        break;
    }
  },
  initialExperienceState,
);

export const contactReducer: Reducer<Candidate, changeContactDetails> = (
  state = initialContactState,
  { type, candidate }: changeContactDetails,
): Candidate => {
  switch (type) {
    case CHANGE_CONTACT_DETAILS:
      return { ...state, ...candidate };
    default:
      return state;
  }
};

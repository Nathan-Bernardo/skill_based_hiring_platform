export const ADD_SKILL = 'ADD_SKILL';
export const DELETE_SKILL = 'DELETE_SKILL';
export const SET_SKILLS = 'SET_SKILLS';

export type AddSkill = {
  type: typeof ADD_SKILL;
  skill: string;
};

export type DeleteSkill = {
  type: typeof DELETE_SKILL;
  skill: string;
};

export type SetSkills = {
  type: typeof SET_SKILLS;
  skills: string[];
};

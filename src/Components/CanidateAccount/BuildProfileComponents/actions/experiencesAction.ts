export const ADD_EXPERIENCE = 'ADD_EXPERIENCE';
export const DELETE_EXPERIENCE = 'DELETE_EXPERIENCE';
export const EDIT_EXPERIENCE = 'EDIT_EXPERIENCE';

export type AddExperience = {
  type: typeof ADD_EXPERIENCE;
};

export type EditExperience = {
  type: typeof EDIT_EXPERIENCE;
  id: string;
  title: string;
  company: string;
  start: number;
  end?: number;
  details: string;
};

export type DeleteExperience = {
  type: typeof DELETE_EXPERIENCE;
  id: string;
};

import { v4 as uuidv4 } from 'uuid';

import { Applicant } from '../Components/HiringManagerDashboard/types/Applicant';
import { firstNames } from '../constants/firstNames';
import { lastNames } from '../constants/lastNames';
import { skillList } from '../constants/skills';

const getRandomElement = <T>(array: T[]): T => array[~~(Math.random() * array.length)];
const generateRandomDigit = (): string => (~~(Math.random() * 10)).toString();
const generateRandomDigits = (n: number): string => {
  let result = '';

  for (let i = 0; i < n; i++) {
    result += generateRandomDigit();
  }

  return result;
};

const generatePhoneNumber = (): string =>
  `(${generateRandomDigits(3)})${generateRandomDigits(3)}-${generateRandomDigits(4)}`;

const generateSkills = (skillList: string[], numSkills: number): string[] => {
  const skills = [];
  for (let i = 0; i < numSkills; i++) {
    skills.push(getRandomElement(skillList));
  }
  return Array.from(new Set(skills));
};

export const generateRandomApplicant = (viewed: boolean): Applicant => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const email = `${firstName}${lastName}@gmail.com`.toLowerCase();

  return {
    id: `app-${uuidv4()}`,
    name: `${firstName} ${lastName}`,
    phone: generatePhoneNumber(),
    skills: generateSkills(skillList, ~~(Math.random() * 20)),
    favorited: !~~(Math.random() * 10),
    blacklisted: false,
    email,
    viewed,
  };
};

import { v4 as uuidv4 } from 'uuid';
import { Job } from '../Components/HiringManagerDashboard/types';

export const generateJob = (
  job: Job = {
    id: '',
    company: '',
    postedBy: '',
    title: '',
    seniority: 'Entry',
    applicantsTotal: 0,
    applicantsNew: 0,
    favorited: false,
    salaryFrom: 0,
    salaryTo: 0,
    location: '',
    requiredSkills: [],
    preferredSkills: [],
    description: '',
    recruiterDetails: '',
    posted: 0,
    hyperlink: '',
  },
): Job => {
  const id = uuidv4();
  return {
    ...job,
    id: `jb-${id}`,
    favorited: false,
    applicantsNew: 0,
    applicantsTotal: 0,
    posted: +new Date(),
    hyperlink: `jobs.listee.net/${id}`,
  };
};

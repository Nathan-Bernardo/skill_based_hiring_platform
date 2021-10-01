import { v4 as uuidv4 } from 'uuid';
import { Job, JobList } from '../Components/HiringManagerDashboard/types';

export const generateDummyJob = (): Job => ({
  id: uuidv4(),
  title: 'Placeholder Job',
  company: 'Placeholder Company',
  seniority: 'Entry',
  postedBy: 'Test User',
  applicantsTotal: 1,
  applicantsNew: 1,
  favorited: false,
  location: 'Placeholder Location',
  requiredSkills: [],
  preferredSkills: [],
  description: 'Placeholder Description',
  recruiterDetails: 'Placeholder Details',
  posted: +new Date(),
  hyperlink: 'place.holder.link',
});

export const generateDummyJobList = (userId: string): JobList => ({
  id: uuidv4(),
  name: 'Placeholder JobList',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [],
  childJobLists: [],
});

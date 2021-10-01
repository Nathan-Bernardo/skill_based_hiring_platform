import { Job, JobList, User } from '../Components/HiringManagerDashboard/types';
import { v4 as uuidv4 } from 'uuid';

const userId = uuidv4();

export const dummyUser: User = {
  id: userId,
  userName: 'Test',
  email: 'test@listee.net',
  password: 'Test123#',
  company: 'Listee',
  phone: '4154563431',
};

const topJob: Job = {
  id: uuidv4(),
  title: 'topJob',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 20,
  applicantsNew: 5,
  favorited: false,
  salaryFrom: 120000,
  location: 'Remote',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const financeJob: Job = {
  id: uuidv4(),
  title: 'Finance Job',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 15,
  applicantsNew: 0,
  favorited: false,
  salaryFrom: 120000,
  location: 'Remote',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const salesJob: Job = {
  id: uuidv4(),
  title: 'Sales Job',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 132,
  applicantsNew: 10,
  favorited: true,
  salaryFrom: 90000,
  location: 'Remote',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const reactJob1: Job = {
  id: uuidv4(),
  title: 'React Job',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 432,
  applicantsNew: 3,
  favorited: true,
  salaryFrom: 135000,
  location: 'Remote',
  requiredSkills: ['React', 'CSS', 'HTML'],
  preferredSkills: ['Emotion'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const reactJob2: Job = {
  id: uuidv4(),
  title: 'React Job 2',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 200,
  applicantsNew: 100,
  favorited: false,
  salaryFrom: 135000,
  location: 'San Francisco',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const angularJob: Job = {
  id: uuidv4(),
  title: 'Angular Job',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Entry',
  applicantsTotal: 15,
  applicantsNew: 0,
  favorited: false,
  salaryFrom: 134999,
  location: 'Remote',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const backendJob: Job = {
  id: uuidv4(),
  title: 'Backend Job',
  company: 'listee',
  postedBy: 'Test User',
  recruiterDetails: 'These are details',
  seniority: 'Senior',
  applicantsTotal: 200,
  applicantsNew: 15,
  favorited: true,
  salaryFrom: 230000,
  location: 'Remote',
  requiredSkills: ['Nothing'],
  preferredSkills: ['Nothing'],
  description: 'Test Backend Job',
  posted: +new Date(),
  hyperlink: 'hire.listee.com',
};

const reactJobList: JobList = {
  id: uuidv4(),
  name: 'React',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [reactJob1.id, reactJob2.id],
  childJobLists: [],
};

const angularJobList: JobList = {
  id: uuidv4(),
  name: 'Angular',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [angularJob.id],
  childJobLists: [],
};

const financeJobList: JobList = {
  id: uuidv4(),
  name: 'Finance',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [financeJob.id],
  childJobLists: [],
};

const frontendJobList: JobList = {
  id: uuidv4(),
  name: 'Frontend',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [],
  childJobLists: [reactJobList.id, angularJobList.id],
};

const backEndJobList: JobList = {
  id: uuidv4(),
  name: 'Backend',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [backendJob.id],
  childJobLists: [],
};

const engineeringJobList: JobList = {
  id: uuidv4(),
  name: 'Engineering',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [],
  childJobLists: [frontendJobList.id, backEndJobList.id],
};

const salesJobList: JobList = {
  id: uuidv4(),
  name: 'Sales',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [salesJob.id],
  childJobLists: [],
};

export const dummyJobList: JobList = {
  id: uuidv4(),
  name: 'All',
  permissions: {
    view: [userId],
    edit: [userId],
  },
  jobs: [topJob.id],
  childJobLists: [financeJobList.id, engineeringJobList.id, salesJobList.id],
};

export const testJobs = [topJob, financeJob, salesJob, reactJob1, reactJob2, angularJob, backendJob];
export const testJobLists = [
  reactJobList,
  angularJobList,
  financeJobList,
  frontendJobList,
  backEndJobList,
  engineeringJobList,
  salesJobList,
  dummyJobList,
];

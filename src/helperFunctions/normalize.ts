import { Job, JobList } from '../Components/HiringManagerDashboard/types';
import { normalize, schema } from 'normalizr';

export type NormalizedJobLists = {
  [id: string]: JobList;
};

export type NormalizedJobs = {
  [id: string]: Job;
};

export const createNormalizedJobList = (jobLists: JobList[]): NormalizedJobLists =>
  jobLists.reduce((allJobLists, jobList) => ({ ...allJobLists, [jobList.id]: jobList }), {});

export const createNormalizedJobs = (jobs: Job[]): NormalizedJobs =>
  jobs.reduce((allJobs, job) => ({ ...allJobs, [job.id]: job }), {});

// List of experiences without normalizing
const ExperienceLists = [
  {
    userId: '1',
    experiences: [
      {
        id: 'experience1',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
      {
        id: 'experience2',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
      {
        id: 'experience3',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
    ],
  },
  {
    userId: '2',
    experiences: [
      {
        id: 'experience4',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
      {
        id: 'experience5',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
      {
        id: 'experience6',
        comapny: '',
        start: '',
        end: '',
        experience: '....',
      },
    ],
  },
];

// List of experiences after normalizing
// const user = new schema.Entity('users');
// const experiences = new schema.Entity('experiences', {
//   company:
//   start:
//   end:
//   experience:
// });
// const experienceLists = new schema.Entity('')
//

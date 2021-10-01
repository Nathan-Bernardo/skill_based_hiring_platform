import { ApplicantListing } from './generateApplicantListing';

export type ApplicantOrder = 'viewed' | 'score' | 'favorited';

export const isApplicantOrder = (applicantOrder: string): applicantOrder is ApplicantOrder =>
  ['viewed', 'score', 'favorited'].includes(applicantOrder as ApplicantOrder);

export const sortApplicants = (applicants: ApplicantListing[], key: ApplicantOrder): ApplicantListing[] =>
  [...applicants].sort((a, b): number => {
    const applicantA = a[key];
    const applicantB = b[key];

    if (typeof applicantA === 'number' && typeof applicantB === 'number') {
      return applicantB - applicantA;
    }

    if (typeof applicantA === 'string' && typeof applicantB === 'string') {
      return applicantA <= applicantB ? 1 : -1;
    }

    if (typeof applicantA === 'boolean' && typeof applicantB === 'boolean') {
      if (!applicantA && applicantB) {
        return 1;
      } else if (applicantA && !applicantB) {
        return -1;
      }
      return 0;
    }

    return 0;
  });

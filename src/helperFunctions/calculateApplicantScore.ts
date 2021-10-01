import { Job } from '../Components/HiringManagerDashboard/types';

export const calculateApplicantScore = (
  { requiredSkills, preferredSkills }: Job,
  applicantSkills: string[],
): number => {
  if (requiredSkills.length + preferredSkills.length === 0) {
    return -1;
  }
  const requiredSet = new Set(requiredSkills);
  const preferredSet = new Set(preferredSkills);
  const maxScore = requiredSkills.length * 2 + preferredSkills.length;
  const currentScore = applicantSkills.reduce((score, skill) => {
    if (requiredSet.has(skill)) {
      return score + 2;
    }
    if (preferredSet.has(skill)) {
      return score + 1;
    }
    return score;
  }, 0);
  const percentageScore = currentScore / maxScore;
  return Math.round(percentageScore * 1000) / 10;
};

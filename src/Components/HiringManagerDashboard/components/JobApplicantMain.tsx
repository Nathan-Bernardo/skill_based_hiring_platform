/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Chip, Typography } from '@material-ui/core';
import { FC } from 'react';

import { flexColumn, flexRow } from '../../Shared/styles/shared';
import { Job } from '../types';
import { Applicant } from '../types/Applicant';

type JobApplicantMainProps = {
  applicant: Applicant;
  job: Job;
};

export const JobApplicantMain: FC<JobApplicantMainProps> = ({ applicant, job }: JobApplicantMainProps): JSX.Element => {
  const { name, phone, email, skills } = applicant;
  const { requiredSkills, preferredSkills } = job;
  const requiredMatchedSkills = requiredSkills.filter((skill) => skills.includes(skill));
  const preferrredMatchedSkills = preferredSkills.filter((skill) => skills.includes(skill));
  const missingSkills = [
    ...requiredSkills.filter((skill) => !skills.includes(skill)),
    ...preferredSkills.filter((skill) => !skills.includes(skill)),
  ];

  return (
    <div
      css={[
        flexColumn,
        css`
          padding: 1em;
        `,
      ]}
    >
      <Typography variant="h4">{name}</Typography>
      {phone !== undefined && <div>{phone}</div>}
      {email !== undefined && <div>{email}</div>}
      {requiredMatchedSkills.length > 0 && (
        <div css={flexColumn}>
          <div>Matched Required Skills</div>
          <div css={flexRow}>
            {requiredMatchedSkills.map((skill) => (
              <Chip key={`chp-${skill}`} color="primary" clickable size="small" label={skill} />
            ))}
          </div>
        </div>
      )}
      {preferrredMatchedSkills.length > 0 && (
        <div css={flexColumn}>
          <div>Matched Preferred Skills</div>
          <div css={flexRow}>
            {preferrredMatchedSkills.map((skill) => (
              <Chip key={`chp-${skill}`} color="primary" clickable size="small" label={skill} />
            ))}
          </div>
        </div>
      )}
      {missingSkills.length > 0 && (
        <div css={flexColumn}>
          <div>Missing Skills</div>
          <div css={flexRow}>
            {missingSkills.map((skill) => (
              <Chip key={`chp-${skill}`} color="secondary" clickable size="small" label={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { flexColumn, flexRow, spaceBetween } from '../../Shared/styles/shared';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { MoreVert, Star, StarBorder } from '@material-ui/icons';

import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/rootReducer';

type jobApplicantParams = {
  jobId: string;
};

const JobApplicants = (): JSX.Element => {
  const { jobId } = useParams<jobApplicantParams>();
  console.log(jobId);
  const job = useSelector((state: AppState) => state.hiringManagerDashboard.jobs.byId)[jobId];

  return (
    <div css={flexColumn}>
      {job !== undefined && (
        <div css={[flexRow, spaceBetween]}>
          <Button variant="text" color="default">
            Back
          </Button>
          <div
            css={[
              flexRow,
              spaceBetween,
              css`
                padding: 0 2em;
              `,
            ]}
          >
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              Applicants
            </div>
            <div>{`${job.applicantsTotal} (${job.applicantsNew})`}</div>
          </div>
          <div>Opened</div>
          <div css={flexRow}>
            {job.favorited ? <Star /> : <StarBorder />}
            <MoreVert />
          </div>
        </div>
      )}
      {job === undefined && (
        <Typography variant="h1" color="initial">
          Job Not Found
        </Typography>
      )}
    </div>
  );
};

export default JobApplicants;

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Button as MuiButton, Typography } from '@material-ui/core/';
import { MoreVert, Star, StarBorder } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../store/rootReducer';
import {
  SetApplicantsAction,
  SetCurrentApplicantAction,
  SET_APPLICANTS,
  SET_CURRENT_APPLICANT,
  UnsetApplicantsAction,
  UNSET_APPLICANTS,
} from '../actions/applicantActions';
import { fetchApplicants } from '../asyncActions/fetchApplicants';
import {
  ApplicantListing,
  generateApplicantListing,
  ApplicantOrder,
  isApplicantOrder,
  sortApplicants,
} from '../../../helperFunctions/';
import { LIGHTEST_GRAY } from '../../../constants/colors';
import { Loading } from '../../Shared/components/Loading';
import { JobApplicantSideBar } from './JobApplicantSideBar';
import { flexColumn, flexRow, spaceBetween } from '../../Shared/styles/shared';
import { JobApplicantMain } from './JobApplicantMain';

type JobApplicantParams = {
  jobId: string;
};

const JobApplicants = (): JSX.Element => {
  const { jobId } = useParams<JobApplicantParams>();
  const { byId: byApplicantId, currentApplicantId } = useSelector(
    (state: AppState) => state.hiringManagerDashboard.applicants,
  );
  const dispatch = useDispatch();
  const { jobs } = useSelector((state: AppState) => state.hiringManagerDashboard);
  const job = jobs.byId[jobId];
  const [sortingOrder, setSortingOrder] = useState<ApplicantOrder>('score');
  const [orderedApplicantListing, setOrderedApplicantListing] = useState<ApplicantListing[]>([]);
  const [isLoading, setLoadState] = useState(true);

  useEffect(() => {
    if (job !== undefined) {
      setLoadState(true);
      fetchApplicants(job).then((applicants) => {
        dispatch<SetApplicantsAction>({
          type: SET_APPLICANTS,
          applicants,
        });

        dispatch<SetCurrentApplicantAction>({
          type: SET_CURRENT_APPLICANT,
          applicantId: applicants[0].id,
        });

        const applicantOrder = localStorage.getItem('applicantOrder');
        setOrderedApplicantListing(
          sortApplicants(
            generateApplicantListing(applicants, job),
            applicantOrder !== null && isApplicantOrder(applicantOrder) ? applicantOrder : 'score',
          ),
        );
        setLoadState(false);
      });

      return (): void => {
        dispatch<SetCurrentApplicantAction>({
          type: SET_CURRENT_APPLICANT,
          applicantId: '',
        });
        dispatch<UnsetApplicantsAction>({ type: UNSET_APPLICANTS });
      };
    }
  }, []);

  useEffect(() => {
    setOrderedApplicantListing(sortApplicants(orderedApplicantListing, sortingOrder));

    return (): void => {
      localStorage.setItem('applicantOrder', sortingOrder);
    };
  }, [sortingOrder]);

  return (
    <div css={flexColumn}>
      <div>
        {job === undefined && (
          <Typography variant="h1" color="initial">
            Job Not Found
          </Typography>
        )}
        {job !== undefined && (
          <div
            css={[
              flexRow,
              spaceBetween,
              css`
                background-color: ${LIGHTEST_GRAY};
              `,
            ]}
          >
            <MuiButton variant="text" color="default">
              Back
            </MuiButton>
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
      </div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div css={flexRow}>
          <JobApplicantSideBar applicants={orderedApplicantListing} setOrder={setSortingOrder} />
          <JobApplicantMain applicant={byApplicantId[currentApplicantId]} job={job} />
        </div>
      )}
    </div>
  );
};

export default JobApplicants;

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Badge } from '@material-ui/core';
import { Star, StarBorder } from '@material-ui/icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { LIGHTEST_GRAY } from '../../../constants/colors';
import { ApplicantOrder, ApplicantListing } from '../../../helperFunctions/';
import { Button } from '../../Shared/components/Button';
import { flexRow, flexColumn, spaceBetween } from '../../Shared/styles/shared';
import {
  SetCurrentApplicantAction,
  SET_CURRENT_APPLICANT,
  UpdateApplicantAction,
  UPDATE_APPLICANT,
} from '../actions/applicantActions';
import { jobApplicant } from '../styles/JobApplicant';
import { favorite } from '../styles/JobPosting';
import { Applicant } from '../types/Applicant';

type JobApplicantSideBarProps = {
  applicants: ApplicantListing[];
  setOrder: Dispatch<SetStateAction<ApplicantOrder>>;
};
export const JobApplicantSideBar: FC<JobApplicantSideBarProps> = ({
  applicants,
  setOrder,
}: JobApplicantSideBarProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleFavorite = (applicant: Applicant): void => {
    dispatch<UpdateApplicantAction>({
      type: UPDATE_APPLICANT,
      applicant: { ...applicant, favorited: !applicant.favorited },
    });
  };

  return (
    <div
      css={[
        flexColumn,
        css`
          background-color: ${LIGHTEST_GRAY};
        `,
      ]}
    >
      <div css={flexRow}>
        <Button
          onClick={(): void => {
            setOrder('viewed');
          }}
        >
          Unviewed
        </Button>
        <Button
          onClick={(): void => {
            setOrder('favorited');
          }}
        >
          Favorite
        </Button>
        <Button
          onClick={(): void => {
            setOrder('score');
          }}
        >
          Score
        </Button>
      </div>
      <div
        css={[
          flexColumn,
          css`
            max-height: 100%;
            overflow-y: auto;
          `,
        ]}
      >
        {applicants.map((applicant) => {
          const { id, name, favorited, score, viewed } = applicant;
          return (
            <div
              key={`app-${id}`}
              css={jobApplicant}
              onClick={(): void => {
                dispatch<SetCurrentApplicantAction>({
                  type: SET_CURRENT_APPLICANT,
                  applicantId: id,
                });
              }}
            >
              <div css={[flexRow, spaceBetween]}>
                <div>{name}</div>
                <div
                  css={favorite}
                  onClick={(e): void => {
                    e.stopPropagation();
                    handleFavorite({ ...applicant });
                  }}
                >
                  <Badge color="primary" variant="dot" badgeContent={viewed ? 0 : 1}>
                    {favorited ? <Star /> : <StarBorder />}
                  </Badge>
                </div>
              </div>
              <div>{`Match Score: ${score}%`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

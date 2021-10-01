/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { MoreVert, Star, StarBorder } from '@material-ui/icons';
import { Badge, Tooltip } from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch } from 'react-redux';
import { Fragment, MouseEvent, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { Job } from '../types/index';
import { favorite, jobPostingContainer, jobTitle, menu, titleRow } from '../styles/JobPosting';
import { description, flexRow, tooltip } from '../../Shared/styles/shared';
import {
  AddJobAction,
  ADD_JOB,
  SetCurrentJobAction,
  SET_CURRENT_JOB,
  UpdateJobAction,
  UPDATE_JOB,
} from '../actions/jobActions';
import { ReadyJobMove, READY_JOB_MOVE, SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { DropDownMenu } from '../../Shared/components/DropDownMenu';
import { generateJob } from '../../../helperFunctions';

export const JobPosting = ({ job, jobListId }: { job: Job; jobListId: string }): JSX.Element => {
  const { id, title, company, location, applicantsTotal, applicantsNew, posted, favorited, recruiterDetails } = job;
  const [menuState, setMenuState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const anchorRef = useRef<HTMLDivElement>(null);
  dayjs.extend(relativeTime);

  const handleFavorite = (e: MouseEvent<HTMLDivElement>): void => {
    // TODO: set Favorite locally and UPDATE in database
    e.stopPropagation();
    dispatch<UpdateJobAction>({
      type: UPDATE_JOB,
      jobListId: '',
      job: { ...job, favorited: !favorited },
    });
  };

  const handleOpenUpdateJob = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    dispatch<SetCurrentJobAction>({
      type: SET_CURRENT_JOB,
      jobId: id,
    });
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'jobModal',
      state: true,
    });
    setMenuState(false);
  };

  const handleCloseMenu = (e: MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    setMenuState(false);
  };

  const handleClone = (): void => {
    dispatch<AddJobAction>({
      type: ADD_JOB,
      job: generateJob(job),
      jobListId,
    });
    setMenuState(false);
  };

  const handleMove = (): void => {
    dispatch<ReadyJobMove>({
      type: READY_JOB_MOVE,
      job,
      jobListId,
    });

    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'moveJobModal',
      state: true,
    });

    setMenuState(false);
  };

  return (
    <Fragment>
      <Tooltip title={<p css={tooltip}>{recruiterDetails}</p>}>
        <div
          css={jobPostingContainer}
          onClick={(): void => {
            history.push(`/job/${id}`);
          }}
        >
          <Badge badgeContent={applicantsNew} color="primary" />
          <div css={titleRow}>
            <div css={jobTitle}>{title}</div>
            <div css={flexRow}>
              <div css={favorite} onClick={handleFavorite}>
                {favorited ? <Star /> : <StarBorder />}
              </div>
              <div
                css={menu}
                ref={anchorRef}
                onClick={(e: MouseEvent<HTMLDivElement>): void => {
                  e.stopPropagation();
                  setMenuState(!menuState);
                }}
              >
                <MoreVert />
              </div>
            </div>
          </div>
          <div css={description}>{company}</div>
          <div css={description}>{location}</div>
          <div css={description}>Posted: {dayjs(posted).fromNow()}</div>
          <div className="jobApplicants">Applicants: {applicantsTotal}</div>
        </div>
      </Tooltip>
      <DropDownMenu
        open={menuState}
        placement="bottom-start"
        anchorRef={anchorRef}
        handleClose={(): void => {
          setMenuState(false);
        }}
        menuItems={[
          { label: 'Job Description', onClick: handleOpenUpdateJob },
          { label: 'Clone Job', onClick: handleClone },
          { label: 'Move Job', onClick: handleMove },
          { label: 'Hired', onClick: handleCloseMenu },
          { label: 'Close Job', onClick: handleCloseMenu },
        ]}
      />
    </Fragment>
  );
};

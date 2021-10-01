/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FC, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import { MoreVert, StarBorder } from '@material-ui/icons';
import ChipInput from 'material-ui-chip-input';

import {
  AddJobAction,
  ADD_JOB,
  SetCurrentJobAction,
  SET_CURRENT_JOB,
  UpdateJobAction,
  UPDATE_JOB,
} from '../actions/jobActions';
import { SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { modalContainer } from '../styles/Modals';
import { flexColumn, flexRow, spaceBetween, description as eDescription } from '../../Shared/styles/shared';
import { Job } from '../types';
import { favorite, jobPostingContainer, jobTitle, menu, titleRow } from '../styles/JobPosting';
import { Button } from '../../Shared/components/Button';
import { useForm } from '../../../hooks';
import { generateJob } from '../../../helperFunctions';
import { skillList } from '../../../constants/skills';

interface JobModalProps {
  jobListId: string;
  job: Job;
}

export const JobModal: FC<JobModalProps> = ({ jobListId, job }: { jobListId: string; job?: Job }): JSX.Element => {
  const [currentJob, handleChange, resetForm, manualSet] = useForm(job || generateJob());
  const {
    company,
    title,
    salaryFrom,
    salaryTo,
    location,
    description,
    recruiterDetails,
    requiredSkills,
    preferredSkills,
  } = currentJob;
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'jobModal',
      state: false,
    });
  };

  const handleSubmit = (): void => {
    if (job !== undefined) {
      dispatch<UpdateJobAction>({
        jobListId,
        type: UPDATE_JOB,
        job: { ...currentJob },
      });
      dispatch<SetCurrentJobAction>({
        type: SET_CURRENT_JOB,
        jobId: '',
      });
    } else {
      dispatch<AddJobAction>({
        jobListId,
        type: ADD_JOB,
        job: generateJob(currentJob),
      });
    }
    resetForm();
    handleClose();
  };

  return (
    <div
      css={[
        modalContainer,
        flexRow,
        spaceBetween,
        css`
          align-items: flex-start;
          width: auto;
        `,
      ]}
    >
      <form
        css={flexColumn}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField autoFocus name="title" id="standard-basic" label="Job Title" value={title} onChange={handleChange} />
        <div css={flexRow}>
          <TextField
            name="salaryFrom"
            id="standard-basic"
            type="number"
            label="Minimum Salary"
            value={salaryFrom}
            onChange={handleChange}
          />
          <TextField
            name="salaryTo"
            id="standard-basic"
            type="number"
            label="Maximum Salary"
            value={salaryTo}
            onChange={handleChange}
          />
        </div>
        <ChipInput
          alwaysShowPlaceholder
          allowDuplicates={false}
          onBeforeAdd={(chip: string): boolean => !requiredSkills.includes(chip) && skillList.includes(chip)}
          dataSource={skillList}
          defaultValue={requiredSkills}
          onChange={(chips: string[]): void => {
            manualSet('requiredSkills', chips);
          }}
          label="Required Skills"
        />
        <ChipInput
          alwaysShowPlaceholder
          allowDuplicates={false}
          onBeforeAdd={(chip: string): boolean => !preferredSkills.includes(chip) && skillList.includes(chip)}
          dataSource={skillList}
          defaultValue={preferredSkills}
          onChange={(chips: string[]): void => {
            manualSet('preferredSkills', chips);
          }}
          label="Preferred Skills"
        />
        <TextField name="location" id="standard-basic" label="Location" value={location} onChange={handleChange} />
        <TextField
          name="description"
          id="standard-basic"
          label="Description"
          multiline
          value={description}
          onChange={handleChange}
        />
        <TextField
          name="recruiterDetails"
          id="standard-basic"
          label="details"
          multiline
          value={recruiterDetails}
          onChange={handleChange}
        />
        <div css={flexRow}>
          <Button onClick={handleSubmit}>{`${job !== undefined ? 'Update' : 'Create'} Job`}</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </form>
      <div
        css={[
          jobPostingContainer,
          css`
            max-height: auto;
          `,
        ]}
      >
        <div css={titleRow}>
          <div css={jobTitle}>{title}</div>
          <div css={favorite}>
            <StarBorder />
          </div>
          <div css={menu}>
            <MoreVert />
          </div>
        </div>
        <div css={eDescription}>{company}</div>
        <div css={eDescription}>{location}</div>
        <div css={eDescription}>Posted: a few seconds ago</div>
        <div>Applicants: 0</div>
      </div>
    </div>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from '@material-ui/core/';

import { useForm } from '../../../hooks';
import { flexColumn, flexRow } from '../../Shared/styles/shared';
import { AddJobListAction, ADD_JOBLIST } from '../actions/jobListActions';
import { SetModalState, SET_MODAL_STATE } from '../actions/modalActions';
import { modalContainer } from '../styles/Modals';
import { AppState } from '../../../store/rootReducer';
import { Button } from '../../Shared/components/Button';

interface JobListModalProps {
  jobListId: string;
}

export const JobListModal: FC<JobListModalProps> = ({ jobListId }: { jobListId: string }): JSX.Element => {
  const [{ jobListName }, handleChange] = useForm({ jobListName: '' });
  const { id: userId } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();

  const handleClose = (): void => {
    dispatch<SetModalState>({
      type: SET_MODAL_STATE,
      modal: 'jobListModal',
      state: false,
    });
  };

  const handleSubmit = (): void => {
    if (jobListName.length === 0) {
      return;
    }
    dispatch<AddJobListAction>({
      type: ADD_JOBLIST,
      parentJobListId: jobListId,
      jobList: {
        id: `jbl-${uuidv4()}`,
        permissions: {
          edit: [userId],
          view: [userId],
        },
        name: jobListName,
        jobs: [],
        childJobLists: [],
      },
    });
    handleClose();
  };

  return (
    <div css={[modalContainer, flexColumn]}>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          autoFocus
          id="standard-basic"
          name="jobListName"
          label="Job List Name"
          value={jobListName}
          onChange={handleChange}
        />
        <div css={flexRow}>
          <Button onClick={handleSubmit}>Create Job List</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

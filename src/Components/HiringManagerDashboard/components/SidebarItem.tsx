/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ChangeEvent, FocusEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

import { childContainer, expand, jobListTitle, renameInputBox, sideBarItem } from '../styles/SideBarItem';
import { getJobListById, hasJobs, getAllChildrenJobLists } from '../../../helperFunctions';
import {
  DeleteJobListAction,
  DELETE_JOBLIST,
  SetCurrentJobListId,
  SET_CURRENT_JOBLIST,
  UpdateJobListAction,
  UPDATE_JOBLIST,
} from '../actions/jobListActions';
import { AppState } from '../../../store/rootReducer';
import { useFocus } from '../../../hooks';

type MouseState = {
  mouseX: null | number;
  mouseY: null | number;
};

const mouseInitialState: MouseState = {
  mouseX: null,
  mouseY: null,
};

export const SidebarItem = ({ jobListId }: { jobListId: string }): JSX.Element => {
  const [childrenVisible, setChildrenVisible] = useState(false);
  const [mouseState, setMouseState] = useState<MouseState>(mouseInitialState);
  const [renameInputState, setRenameInputState] = useState(false);
  const [newJobListName, setNewJobListName] = useState('');
  const { user, hiringManagerDashboard } = useSelector((state: AppState) => state);
  const { id: userId } = user;
  const { applicantCounts, currentJobListId, topJobListId, byId, parentList } = hiringManagerDashboard.jobLists;
  const dispatch = useDispatch();
  const [inputRef, setInputRef] = useFocus();
  const [newApplicants] = applicantCounts[jobListId] !== undefined ? applicantCounts[jobListId] : [0, 0];
  const jobList = getJobListById(jobListId);
  const { childJobLists, name, id } = jobList;
  const isCurrentJobList = currentJobListId === jobListId;
  const { mouseX, mouseY } = mouseState;

  useEffect(() => {
    if (childJobLists.length === 0) {
      setChildrenVisible(false);
    }
  }, [childJobLists.length]);

  useEffect(() => {
    setInputRef();
  }, [renameInputState]);

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setMouseState({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };

  const handleClose = (): void => {
    setMouseState(mouseInitialState);
  };

  const handleChangeJobList = (): void => {
    dispatch<SetCurrentJobListId>({
      type: SET_CURRENT_JOBLIST,
      jobListId: jobListId,
    });
    setMouseState(mouseInitialState);
  };

  const handleClickRename = (): void => {
    setMouseState(mouseInitialState);
    setRenameInputState(true);
  };

  const handleSubmitRename = (e: FormEvent<HTMLFormElement> | FocusEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (!['', name].includes(newJobListName.trim())) {
      dispatch<UpdateJobListAction>({
        type: UPDATE_JOBLIST,
        parentJobListId: '',
        jobList: { ...jobList, name: newJobListName },
      });
    }
    setNewJobListName('');
    setRenameInputState(false);
  };

  const handleDelete = (): void => {
    setMouseState(mouseInitialState);
    if (!hasJobs(jobList, byId)) {
      const allJobListsToDelete = getAllChildrenJobLists(jobList, parentList[jobListId], byId);
      allJobListsToDelete.forEach((pair) => {
        if (currentJobListId === pair.jobList.id) {
          dispatch<SetCurrentJobListId>({
            type: SET_CURRENT_JOBLIST,
            jobListId: topJobListId,
          });
        }
        dispatch<DeleteJobListAction>({
          type: DELETE_JOBLIST,
          ...pair,
        });
      });
    }
  };

  return (
    <div>
      <div
        css={[
          sideBarItem(isCurrentJobList),
          css`
            cursor: context-menu;
          `,
        ]}
        onContextMenu={handleClick}
      >
        {childJobLists.length > 0 && (
          <div css={expand} onClick={(): void => setChildrenVisible(!childrenVisible)}>
            {childrenVisible ? <Remove fontSize="small" /> : <Add fontSize="small" />}
          </div>
        )}
        {childJobLists.length === 0 && <div css={expand} />}
        <div css={jobListTitle} onClick={handleChangeJobList}>
          {renameInputState === false && <span>{name}</span>}
          {renameInputState === true && (
            <form onSubmit={handleSubmitRename}>
              <input
                css={renameInputBox(isCurrentJobList)}
                name="name"
                ref={inputRef}
                onBlur={handleSubmitRename}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setNewJobListName(e.target.value)}
                value={newJobListName}
                placeholder={name}
              />
            </form>
          )}
          <span>{newApplicants}</span>
        </div>
      </div>
      <div css={childContainer}>
        {childrenVisible &&
          childJobLists
            .filter((childId) => byId[childId].permissions.view.includes(userId))
            .map((childId) => <SidebarItem key={childId} jobListId={childId} />)}
      </div>
      <Menu
        keepMounted
        open={mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={mouseY !== null && mouseX !== null ? { top: mouseY, left: mouseX } : undefined}
      >
        <MenuItem onClick={handleChangeJobList}>Open</MenuItem>
        <MenuItem
          onClick={handleClickRename}
          disabled={topJobListId === id || !byId[jobListId].permissions.edit.includes(userId)}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          disabled={topJobListId === id || !byId[jobListId].permissions.edit.includes(userId)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

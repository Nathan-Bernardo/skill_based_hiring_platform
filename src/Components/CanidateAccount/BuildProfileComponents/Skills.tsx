import { Typography, Chip } from '@material-ui/core';
import { useChipStyles } from '../../../constants/profileStyles';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../Shared/components/Loading';
import { Candidate } from './types/candidate';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddSkill, ADD_SKILL, DeleteSkill, DELETE_SKILL, SetSkills, SET_SKILLS } from './actions/skillsAction';
import { AppState } from '../../../store/rootReducer';
import { Button } from '../../Shared/components/Button';
import axios from 'axios';

const initialCandidate: Candidate = {
  id: '',
  name: '',
  email: '',
  phone: '',
  skills: [],
};

type Skills = {
  skills: string[];
};

export function Skills(): JSX.Element {
  const classes = useChipStyles();
  const dispatch = useDispatch();
  const { skillState } = useSelector((state: AppState) => state.candidateDetails);
  // const [candidate, setCandidate] = useState<Candidate>(initialCandidate);

  const handleDelete = (skill: string): void => {
    dispatch<DeleteSkill>({
      type: DELETE_SKILL,
      skill,
    });
    console.info(`You clicked the delete button for ${skill}`);
  };

  const handleAdd = (skill: string): void => {
    dispatch<AddSkill>({
      type: ADD_SKILL,
      skill,
    });
  };

  const [isLoading, setLoadState] = useState(true);

  const fetchCandidate = async (): Promise<void> => {
    await fetch('http://0.0.0.0:8000/candidate/candidate-information')
      .then((res) => res.json())
      .then((data) => {
        const skills: string[] = data[0].skills;
        dispatch<SetSkills>({
          type: SET_SKILLS,
          skills,
        });
      });
    setLoadState(false);
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.root}>
          <Button
            onClick={(): void => {
              handleAdd('Dancing');
            }}
          >
            Add skill
          </Button>
          {skillState.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onDelete={(): void => {
                handleDelete(skill);
              }}
              color="primary"
            />
          ))}
        </div>
      )}
    </div>
  );
}

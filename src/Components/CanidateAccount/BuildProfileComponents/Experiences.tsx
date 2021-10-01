import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@material-ui/core';
import { Fragment } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { Button } from '../../Shared/components/Button';
import { AddExperience, ADD_EXPERIENCE, EditExperience, EDIT_EXPERIENCE } from './actions/experiencesAction';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { Experience } from './types';
import { useForm } from '../../../hooks/useForm';

const NewExperience = ({ experience }: { experience: Experience }): JSX.Element => {
  const dispatch = useDispatch();
  const [{ title, company, start, end, details }, handleChange] = useForm(experience);

  const onExperienceEdit = (): void => {
    dispatch<EditExperience>({
      type: EDIT_EXPERIENCE,
      ...experience,
      title,
      company,
      start,
      end,
      details,
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3}>
          <TextField name="title" onChange={handleChange} required label="Title" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={4} sm={3}>
          <TextField onChange={handleChange} required name="company" label="Company" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={4} sm={3}>
          <TextField
            onChange={handleChange}
            required
            name="start"
            label="Start"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <TextField
            onChange={handleChange}
            name="end"
            label="end"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={handleChange}
          name="details"
          placeholder="Description"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
    </>
  );
};

export const Experiences = (): JSX.Element => {
  const now = dayjs();
  const dispatch = useDispatch();
  const { experiences } = useSelector((state: AppState) => state.candidateDetails.experienceState);
  const handleAddExperience = (): void => {
    dispatch<AddExperience>({
      type: ADD_EXPERIENCE,
    });
  };

  return (
    <>
      <Button
        onClick={(): void => {
          handleAddExperience();
        }}
      >
        Add Experience
      </Button>
      <div className="experiences-text">Experiences</div>
      {experiences.map((experience, index) => (
        <div key={`${experience.id}-${index}`}>
          <NewExperience experience={experience} />
        </div>
      ))}
    </>
  );
};

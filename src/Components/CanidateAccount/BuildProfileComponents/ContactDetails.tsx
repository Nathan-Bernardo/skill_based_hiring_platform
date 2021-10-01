import React, { useEffect, useState } from 'react';
import { TextField, Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from '../../../constants/profileStyles';
import { Experiences } from './Experiences';
import { Skills } from './Skills';
import { Loading } from '../../Shared/components/Loading';

type Candidate = {
  name: string;
  email: string;
  phone: string;
};

const initialCandidate = {
  name: '',
  email: '',
  phone: '',
};

export function ContactDetails(): JSX.Element {
  const classes = useStyles();
  const [candidate, setCandidate] = useState<Candidate>(initialCandidate);
  const [isLoading, setLoadState] = useState(true);
  const fetchCandidate = async (): Promise<void> => {
    const data = await fetch('http://0.0.0.0:8000/candidate/candidate-information')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data[0]);
        return data;
      });
    setCandidate(data[0]);
    setLoadState(false);
  };
  useEffect(() => {
    fetchCandidate();
  }, []);
  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.layout}>
          <div className="profile-container">
            <div className="build-text">Build your profile</div>
            <div className="contact-details-container">
              <div className="contact-details-text">Contact Details</div>
              <input className="name-field" type="text" value={candidate['name']} required placeholder="Name..." />
              <input className="email-field" type="text" value={candidate['email']} required placeholder="Email..." />
              <input
                className="phone-field"
                type="text"
                value={candidate['phone']}
                required
                placeholder="Phone number..."
              />
            </div>
            <Experiences />
            <div className="skills-text">Skills</div>
            <Skills />
          </div>
        </div>
      )}
    </div>
  );
}

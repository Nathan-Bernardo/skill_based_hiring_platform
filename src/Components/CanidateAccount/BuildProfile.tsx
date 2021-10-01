import React from 'react';
import { SignUp } from './BuildProfileComponents/SignUpPage';
import { Step, Stepper, StepLabel, Button, Typography } from '@material-ui/core';
import { ContactDetails } from './BuildProfileComponents/ContactDetails';
import { Summary } from './BuildProfileComponents/Summary';
import { useStyles } from '../../constants/profileStyles';
import './signup.css';

const steps: string[] = ['Upload Resume or Login', 'Build your profile', 'Profile summary'];

const getStepContent = (step: number): JSX.Element => {
  switch (step) {
    case 0:
      return <SignUp />;
    case 1:
      return <ContactDetails />;
    case 2:
      return <Summary />;
    default:
      throw new Error('Uknown step');
  }
};

const BuildProfile = (): JSX.Element => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0); // [current_state, function() to add some local state to it]

  const handleNext = (): void => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep(activeStep - 1);
  };

  const submitCandidateInfo = (): void => {
    console.log('Hello World');
  };

  console.log(steps.length);

  return (
    <main className={classes.layout}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={`${index}-${label}`}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h5" gutterBottom>
              Summary
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
              </Button>
              <Button variant="contained" color="primary" onClick={submitCandidateInfo} className={classes.button}>
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BuildProfile;

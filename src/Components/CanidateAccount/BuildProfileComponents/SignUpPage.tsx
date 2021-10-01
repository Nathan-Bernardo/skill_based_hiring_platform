import React, { ChangeEvent } from 'react';
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useStyles } from '../../../constants/profileStyles';
import axios from 'axios';

export const SignUp = (): JSX.Element => {
  const classes = useStyles();

  const input = document.getElementById('raised-button-file');

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const resumes = event.target.files !== null ? event.target.files[0] : null;
    console.log(event.target.files);

    if (resumes !== null) {
      const formData = new FormData();

      formData.append('file', resumes);
      console.log(formData);
      console.log(resumes);
      axios.post('http://127.0.0.1:8000/resume/', formData).catch((error) => {
        console.log('Error response:', error.response);
      });
      console.log('Form Data:', formData);
    }
  };

  return (
    <div className="signup-container">
      {/* <div className="signup-text"> Create An Account</div>
      <div className="signup-upload-button"> Upload Resume</div>
      <div className="or-text"> OR </div>
      <div className="signup-login-button">Login</div> */}
      <Grid container spacing={3} alignItems="center" justify="center" direction="column">
        <Grid item xs={6}>
          <form encType="multipart/form-data">
            <input style={{ display: 'none' }} id="raised-button-file" multiple type="file" onChange={onFileChange} />
          </form>
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />}>
              Upload resume
            </Button>
          </label>
        </Grid>
      </Grid>
    </div>
  );
};

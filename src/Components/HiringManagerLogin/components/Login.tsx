/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { dummyUser } from '../../../constants/testData';
import { SetUserState, SET_USER_STATE } from '../actions/userActions';
import { LoginPageContainer, inputbox, container, button_container, error_message } from '../styles/loginPage';
import { col_75 } from '../../Shared/styles/shared';
import { useForm } from '../../../hooks';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const [{ username, password }, handleChange] = useForm({
    username: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      dispatch<SetUserState>({
        type: SET_USER_STATE,
        user: dummyUser,
      });
      localStorage.setItem('user', username);
      history.push('/');
    }
  };

  const validate = (): boolean => {
    setErrorMessage('');
    if (username === '' || password === '') {
      setErrorMessage('username or password required');
      return false;
    }
    if (username !== dummyUser.userName && username !== dummyUser.email) {
      setErrorMessage('username or password is incorrect');
      return false;
    }
    if (password !== dummyUser.password) {
      setErrorMessage('username or password is incorrect');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      history.push('/');
    }
  }, []);

  return (
    <div css={LoginPageContainer}>
      <h2> Hiring Manager Login </h2>
      <form onSubmit={handleSubmit}>
        <div css={container}>
          <div css={col_75}>
            <TextField
              css={inputbox}
              name="username"
              label="Your email / username"
              value={username}
              variant="outlined"
              onChange={handleChange}
            />
          </div>
        </div>
        <div css={container}>
          <div css={col_75}>
            <TextField
              css={inputbox}
              value={password}
              id="standard-password-input"
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              helperText={
                <div className="error" css={error_message}>
                  {errorMessage}
                </div>
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div css={[container]}>
          <input css={button_container} type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;

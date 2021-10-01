/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useSelector } from 'react-redux';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { TextField, Button as MuiButton } from '@material-ui/core';

import { AppState } from '../../../store/rootReducer';
import { SetUserState, SET_USER_STATE } from '../../HiringManagerLogin/actions/userActions';
import { useForm } from '../../../hooks';
import { ProfilePageContainer, headingstyle, buttoncontainer, formcontainer } from '../styles/profilePage';
import { Button } from '../../Shared/components/Button';

const Profile = (): JSX.Element => {
  const { user } = useSelector((state: AppState) => state);
  const [{ userName, phone, email, company }, handleChange] = useForm(user);
  const dispatch = useDispatch();
  const [detailsDisabled, setDetailsDisabled] = useState({
    UserNameDisabled: true,
    EmailDisabled: true,
    PhoneDisabled: true,
    CompanyDisabled: true,
  });
  const enableUserNameHandler = (): void => {
    setDetailsDisabled({ ...detailsDisabled, UserNameDisabled: false });
  };
  const enableEmailHandler = (): void => {
    setDetailsDisabled({ ...detailsDisabled, EmailDisabled: false });
  };
  const enablePhoneHandler = (): void => {
    setDetailsDisabled({ ...detailsDisabled, PhoneDisabled: false });
  };
  const enableCompanyHandler = (): void => {
    setDetailsDisabled({ ...detailsDisabled, CompanyDisabled: false });
  };
  const submitHandler = (): void => {
    setDetailsDisabled({
      ...detailsDisabled,
      UserNameDisabled: true,
      EmailDisabled: true,
      PhoneDisabled: true,
      CompanyDisabled: true,
    });
    dispatch<SetUserState>({
      type: SET_USER_STATE,
      user: { ...user, userName, email, phone, company },
    });
  };

  return (
    <div css={ProfilePageContainer}>
      <form
        css={formcontainer}
        onSubmit={(e: FormEvent<HTMLFormElement>): void => {
          e.preventDefault();
        }}
      >
        <div css={headingstyle}>
          <p>Account</p>
        </div>
        <div>
          <TextField
            name="userName"
            id="standard-basic"
            label="User Name"
            disabled={detailsDisabled.UserNameDisabled}
            value={userName}
            onChange={handleChange}
          />
          <MuiButton type="button" onClick={enableUserNameHandler}>
            <span>
              <Edit />
            </span>
          </MuiButton>
        </div>
        <div>
          <TextField
            name="email"
            id="standard-basic"
            label="email"
            disabled={detailsDisabled.EmailDisabled}
            value={email}
            onChange={handleChange}
          />
          <MuiButton type="button" onClick={enableEmailHandler}>
            <span>
              <Edit />
            </span>
          </MuiButton>
        </div>
        <div>
          <TextField
            name="phone"
            id="standard-basic"
            label="phone"
            disabled={detailsDisabled.PhoneDisabled}
            value={phone}
            onChange={handleChange}
          />
          <MuiButton type="button" onClick={enablePhoneHandler}>
            <span>
              <Edit />
            </span>
          </MuiButton>
        </div>
        <div css={headingstyle}>
          <p>Company</p>
        </div>
        <div>
          <TextField
            name="company"
            id="standard-basic"
            label="Company Name"
            disabled={detailsDisabled.CompanyDisabled}
            value={company}
            onChange={handleChange}
          />
          <MuiButton type="button" onClick={enableCompanyHandler}>
            <span>
              <Edit />
            </span>
          </MuiButton>
        </div>
        <div css={buttoncontainer}>
          <Button
            onClick={(): void => {
              submitHandler();
            }}
          >
            save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SetUserState, SET_USER_STATE } from './Components/HiringManagerLogin/actions/userActions';
import { dummyUser } from './constants/testData';

import MainRoute from './router/MainRoute';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');

    // TODO: Check to see if user exists in database THEN dispatch THAT user to redux
    if (user !== null) {
      dispatch<SetUserState>({
        type: SET_USER_STATE,
        user: dummyUser,
      });
    }
  }, []);

  return (
    <div
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      <MainRoute />
    </div>
  );
};

export default App;

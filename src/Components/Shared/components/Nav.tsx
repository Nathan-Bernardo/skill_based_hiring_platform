/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@material-ui/icons';
import { useRef, useState } from 'react';

import { SetUserState, SET_USER_STATE } from '../../HiringManagerLogin/actions/userActions';
import { navContainer, navHeader } from '../styles/Nav';
import { DropDownMenu } from './DropDownMenu';
import { hoverPointer } from '../styles/shared';
import { AppState } from '../../../store/rootReducer';
import { generateInitialUser } from '../../../constants/initialStates';

export const Nav = (): JSX.Element => {
  const { userName } = useSelector((state: AppState) => state.user);
  const [menuState, setMenuState] = useState(false);
  const user = localStorage.getItem('user');
  const anchorRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (): void => {
    dispatch<SetUserState>({
      type: SET_USER_STATE,
      user: generateInitialUser(),
    });
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <div css={navContainer} ref={anchorRef}>
      <Link to="/" css={navHeader}>
        <div css={navHeader}>Listee</div>
      </Link>
      {user !== null && (
        <div
          css={hoverPointer}
          onClick={(): void => {
            setMenuState(!menuState);
          }}
        >
          <Menu fontSize="large" />
        </div>
      )}
      {user === null && <div />}
      <DropDownMenu
        open={menuState}
        placement="bottom-end"
        handleClose={(): void => {
          setMenuState(false);
        }}
        anchorRef={anchorRef}
        menuItems={[
          {
            label: userName,
            onClick: (): void => {
              return;
            },
          },
          {
            label: 'Profile',
            onClick: (): void => {
              history.push('/profile');
            },
          },
          {
            label: 'Sign Out',
            onClick: handleLogout,
          },
        ]}
      />
    </div>
  );
};

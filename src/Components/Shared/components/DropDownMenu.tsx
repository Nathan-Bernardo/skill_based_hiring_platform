/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ClickAwayListener, Grow, MenuList, Paper, Popper, MenuItem, PopperPlacementType } from '@material-ui/core';
import { FC, KeyboardEvent, MouseEvent, RefObject, useEffect, useRef } from 'react';

type DropDownMenuItem = {
  label: string;
  onClick: (e: MouseEvent<HTMLElement>) => void;
};

type DropDownMenu = {
  open: boolean;
  placement: PopperPlacementType;
  handleClose: () => void;
  menuItems: DropDownMenuItem[];
  anchorRef: RefObject<HTMLDivElement>;
};

export const DropDownMenu: FC<DropDownMenu> = ({
  open = false,
  placement = 'bottom',
  handleClose,
  menuItems = [],
  anchorRef,
}: DropDownMenu): JSX.Element => {
  const handleCloseMenu = (e: MouseEvent<EventTarget>): void => {
    if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
      return;
    }
    handleClose();
  };

  const handleListKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleClose();
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false && anchorRef.current) {
      anchorRef.current.focus();
    }
  });

  return (
    <Popper
      css={css`
        z-index: 3000;
      `}
      open={open}
      placement={placement}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }): JSX.Element => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center bottom' : 'center top' }}>
          <Paper>
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                {menuItems.map(({ label, onClick }, index) => (
                  <MenuItem key={`${label}-${index}`} onClick={onClick}>
                    {label}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

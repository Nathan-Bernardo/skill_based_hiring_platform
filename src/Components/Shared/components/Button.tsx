/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Interpolation, Theme } from '@emotion/react';
import { MouseEventHandler } from 'react';
import { FC, ReactNode } from 'react';

import { button } from '../styles/Button';

type ButtonProps = {
  css?: Interpolation<Theme>;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
  children: ReactNode;
};

export const Button: FC<ButtonProps> = ({ css, disabled, onClick, children }: ButtonProps): JSX.Element => {
  return (
    <div
      css={[button(disabled !== undefined ? disabled : false), css]}
      onClick={
        disabled || onClick === undefined
          ? (): void => {
              return;
            }
          : onClick
      }
    >
      {children}
    </div>
  );
};

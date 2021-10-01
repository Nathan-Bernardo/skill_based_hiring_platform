import { css, SerializedStyles } from '@emotion/react';
import { BLUE, LIGHTEST_BLUE, LIGHT_BLUE, LIGHT_GRAY, WHITE } from '../../../constants/colors';
import { disableSelect } from './shared';

export const button = (disabled: boolean): SerializedStyles =>
  css([
    disableSelect,
    css`
      background-color: ${disabled ? LIGHT_GRAY : LIGHT_BLUE};
      border-radius: 20px;
      color: ${WHITE};
      font-weight: 600;
      justify-content: center;
      margin: 0.2em;
      min-width: 3em;
      padding: 0.4em 0.8em;
      text-align: center;
      transition: 0.4s;
      &:hover {
        background-color: ${disabled ? LIGHT_GRAY : LIGHTEST_BLUE};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
      }
      &:active {
        background-color: ${disabled ? LIGHT_GRAY : BLUE};
      }
    `,
  ]);

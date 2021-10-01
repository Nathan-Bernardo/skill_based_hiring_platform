import { css } from '@emotion/react';
import { LIGHT_BLUE, WHITE } from '../../../constants/colors';
import { flexRow, hoverPointer, spaceBetween, xxLargeFontSize } from './shared';

export const navContainer = css([
  flexRow,
  spaceBetween,
  css`
    background-color: ${WHITE};
    color: ${LIGHT_BLUE};
    padding: 0.2em;
  `,
]);

export const navHeader = css([
  xxLargeFontSize,
  hoverPointer,
  css`
    color: ${LIGHT_BLUE};
    text-decoration: none;
  `,
]);

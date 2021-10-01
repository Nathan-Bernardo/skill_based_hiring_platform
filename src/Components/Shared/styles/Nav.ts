import { css } from '@emotion/react';
import { LIGHT_BLUE, WHITE } from '../../../constants/colors';
import { flexRow, hoverPointer, spaceBetween, xxLargeFontSize } from './shared';

export const navContainer = css([
  flexRow,
  spaceBetween,
  css`
    background-color: ${LIGHT_BLUE};
    color: ${WHITE};
    min-height: 3em;
    padding: 1em;
  `,
]);

export const navHeader = css([
  xxLargeFontSize,
  hoverPointer,
  css`
    color: ${WHITE};
    text-decoration: none;
  `,
]);

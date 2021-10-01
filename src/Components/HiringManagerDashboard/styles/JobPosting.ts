import { css } from '@emotion/react';
import { DARK_GRAY, LIGHTER_GRAY, LIGHT_BLUE, WHITE } from '../../../constants/colors';
import {
  boldFont,
  boxShadow,
  flexColumn,
  flexRow,
  hoverPointer,
  hoverShadow,
  spaceBetween,
} from '../../Shared/styles/shared';

export const jobPostingContainer = css([
  flexColumn,
  boxShadow,
  hoverShadow,
  hoverPointer,
  css`
    background-color: ${WHITE};
    border-radius: 10px;
    margin: 1em;
    padding: 0.5em 1em;
    transition: 0.4s;
  `,
]);

export const titleRow = css([flexRow, spaceBetween]);

export const jobTitle = css([boldFont, hoverPointer]);

export const favorite = css([
  hoverPointer,
  css`
    border-radius: 20px;
    color: ${LIGHT_BLUE};
    transition: 0.4s;
    &:hover {
      background-color: ${LIGHTER_GRAY};
    }
  `,
]);

export const menu = css([
  hoverPointer,
  css`
    border-radius: 20px;
    color: ${DARK_GRAY};
    transition: 0.4s;
    &:hover {
      background-color: ${LIGHTER_GRAY};
    }
  `,
]);

import { css, SerializedStyles } from '@emotion/react';
import { LIGHTEST_BLUE, LIGHT_BLUE } from '../../../constants/colors';
import {
  boldFont,
  deselected,
  flexRow,
  hoverPointer,
  rightText,
  selected,
  spaceBetween,
} from '../../Shared/styles/shared';

export const childContainer = css`
  margin: 1px 0 1px 1.5em;
`;

export const sideBarItem = (isSelected: boolean): SerializedStyles =>
  css([
    flexRow,
    hoverPointer,
    spaceBetween,
    isSelected ? selected : deselected,
    css`
      border-radius: 0 20px 20px 0;
      font-weight: 600;
      min-width: 18em;
      transition: 0.4s;
      width: 100%;
      &:hover {
        background-color: ${isSelected ? LIGHT_BLUE : LIGHTEST_BLUE};
      }
    `,
  ]);

export const expand = css`
  padding: 0.25em 1em;
  width: 2em;
`;

export const jobListTitle = css([
  flexRow,
  spaceBetween,
  rightText,
  css`
    padding: 0.25em 1em;
    width: 100%;
  `,
]);

export const renameInputBox = (isSelected: boolean): SerializedStyles =>
  css([
    isSelected ? selected : deselected,
    boldFont,
    css`
      border: 0;
      outline: 0;
    `,
  ]);

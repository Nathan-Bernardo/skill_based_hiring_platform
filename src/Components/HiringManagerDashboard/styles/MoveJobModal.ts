import { css, SerializedStyles } from '@emotion/react';
import { BLUE, LIGHTER_GRAY, LIGHT_BLUE, MEDIUM_GRAY, WHITE } from '../../../constants/colors';
import { deselected, disableSelect, hoverPointer, selected } from '../../Shared/styles/shared';

export const itemContainer = css`
  background-color: ${WHITE};
  border: 1px solid ${MEDIUM_GRAY};
  border-radius: 20px;
  float: left;
  margin: 16px 0;
  min-height: 16em;
  padding: 0.5em;
`;

export const moveJobItem = (isCurrent: boolean): SerializedStyles =>
  css([
    disableSelect,
    hoverPointer,
    isCurrent ? selected : deselected,
    css`
      border: 1px solid ${LIGHT_BLUE};
      border-radius: 20px 0 0 20px;
      padding: 0.25em 0.5em;
      text-align: center;
      transition: 0.4s;
      &:hover {
        background-color: ${isCurrent ? LIGHT_BLUE : LIGHTER_GRAY};
      }
      &:active {
        background-color: ${BLUE};
        color: ${WHITE};
      }
    `,
  ]);

export const moveJobItemLeft = (isCurrent: boolean): SerializedStyles =>
  css([
    moveJobItem(isCurrent),
    css`
      border-radius: 20px 0 0 20px;
    `,
  ]);

export const moveJobItemRight = (isCurrent: boolean, hasLeft: boolean): SerializedStyles =>
  css([
    moveJobItem(isCurrent),
    css`
      border-radius: ${hasLeft ? '0 20px 20px 0' : '20px'};
      border-left: ${hasLeft ? `1px solid ${BLUE}` : ''};
      font-weight: 600;
      min-width: ${hasLeft ? '8em' : '10.25em'};
    `,
  ]);

export const childDirectory = css`
  margin: 2px 0 2px 1.5em;
`;

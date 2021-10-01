import { css, SerializedStyles } from '@emotion/react';
import { LIGHTEST_BLUE, LIGHT_BLUE, WHITE } from '../../../constants/colors';
import { boxShadow, flexRow, flexWrap, hoverPointer, hoverShadow } from '../../Shared/styles/shared';

export const jobListViewContainer = css([
  flexRow,
  flexWrap,
  css`
    margin: 1em;
  `,
]);

export const listFolder = (isCurrent: boolean): SerializedStyles =>
  css([
    hoverPointer,
    boxShadow,
    hoverShadow,
    css`
      background-color: ${isCurrent ? LIGHT_BLUE : WHITE};
      border-radius: 20px;
      color: ${isCurrent ? WHITE : LIGHT_BLUE};
      font-weight: 600;
      max-width: 15em;
      padding: 0.25em;
      text-align: center;
      transition: 0.4s;
      &:hover {
        background-color: ${isCurrent ? LIGHT_BLUE : LIGHTEST_BLUE};
      }
    `,
  ]);

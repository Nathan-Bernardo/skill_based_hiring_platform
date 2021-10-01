import { css } from '@emotion/react';
import { LIGHTER_GRAY } from '../../../constants/colors';
import { disableSelect } from '../../Shared/styles/shared';

export const sideBarContainer = css([
  disableSelect,
  css`
    background-color: ${LIGHTER_GRAY};
    min-height: 100%;
    overflow: auto;
    padding: 1em;
  `,
]);

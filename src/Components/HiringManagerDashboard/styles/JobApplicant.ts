import { css } from '@emotion/react';
import { LIGHTEST_GRAY, LIGHT_GRAY } from '../../../constants/colors';
import { disableSelect, flexColumn, hoverPointer } from '../../Shared/styles/shared';

export const jobApplicant = css([
  disableSelect,
  flexColumn,
  hoverPointer,
  css`
    background-color: ${LIGHTEST_GRAY};
    border: 1px solid ${LIGHT_GRAY};
    padding: 0 1em;
  `,
]);

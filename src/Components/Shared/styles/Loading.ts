import { css } from '@emotion/react';
import { LIGHTEST_GRAY } from '../../../constants/colors';
import { alignCenterItems, coverViewport } from './shared';

export const loadingIndicator = css([
  coverViewport,
  alignCenterItems,
  css`
    background-color: ${LIGHTEST_GRAY};
    display: flex;
    justify-content: center;
  `,
]);

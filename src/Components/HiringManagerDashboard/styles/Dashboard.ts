import { css } from '@emotion/react';
import { BLUE, LIGHTEST_GRAY } from '../../../constants/colors';
import { alignCenterItems, flexColumn, flexRow, hoverPointer, largeFontSize } from '../../Shared/styles/shared';
import { jobPostingContainer } from './JobPosting';

export const dashBoardContainer = css([
  flexRow,
  css`
    background-color: ${LIGHTEST_GRAY};
    flex: 0 1 auto;
    min-height: 100%;
    overflow: auto;
  `,
]);

export const jobContainer = css([
  flexColumn,
  css`
    padding: 1.5em;
  `,
]);

export const iconContainer = css([
  jobPostingContainer,
  alignCenterItems,
  css`
    color: ${BLUE};
  `,
]);

export const listTitle = css([largeFontSize, hoverPointer]);

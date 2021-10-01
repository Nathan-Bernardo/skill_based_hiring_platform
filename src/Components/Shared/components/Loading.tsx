/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { CircularProgress } from '@material-ui/core';

import { loadingIndicator } from '../styles/Loading';

export const Loading = (): JSX.Element => (
  <div css={loadingIndicator}>
    <CircularProgress />
  </div>
);

import { css } from '@emotion/react';
import { centeredText, stretchHeight, stretchWidth } from '../../Shared/styles/shared';

export const buttoncontainer = css([
  css`
    font-size: 0.5em;
    display: inline-flex;
    justify-content: center;
  `,
]);

export const formcontainer = css([
  centeredText,
  css`
    display: inline-block;
    padding: 20px;
  `,
]);

export const headingstyle = css([
  css`
    font-size: 1em;
    font-weight: 500;
  `,
]);

export const ProfilePageContainer = css([
  centeredText,
  stretchHeight,
  stretchWidth,
  css`
    box-sizing: border-box;
    font-size: 2.3em;
  `,
]);

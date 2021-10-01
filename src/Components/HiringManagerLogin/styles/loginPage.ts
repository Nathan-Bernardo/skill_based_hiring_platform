import { css } from '@emotion/react';
import { LIGHTEST_GRAY, LIGHT_GRAY, WHITE, DARK_RED } from '../../../constants/colors';
import {
  alignCenterItems,
  centeredText,
  contentCenter,
  marginAuto,
  stretchHeight,
  stretchWidth,
} from '../../Shared/styles/shared';

export const button_container = css([
  marginAuto,
  css`
    align-items: center;
    background-color: ${LIGHT_GRAY};
    border-radius: 5px;
    height: 20%;
    justify-content: center;
    padding: 15px;
    width: 68%;
  `,
]);

export const container = css([
  alignCenterItems,
  contentCenter,
  marginAuto,
  css`
    background-color: ${LIGHTEST_GRAY};
    border-radius: 5px;
    display: flex;
    font-size: 20px;
    height: 50%;
    padding: 15px;
    width: 40%;
  `,
]);

export const error_message = css([
  marginAuto,
  css`
    color: ${DARK_RED};
    font-size: 15px;
    height: 50%;
    width: 100%;
  `,
]);

export const inputbox = css`
  box-sizing: border-box;
  margin: 8px 0;
  padding: 10px 15px;
  width: 90%;
  &::after {
    content: '\\00a0';
  }
`;

export const label = css`
  display: inline-block;
  padding: 12px 12px 12px 0;
`;

export const LoginPageContainer = css([
  centeredText,
  stretchHeight,
  stretchWidth,
  css`
    background-color: ${WHITE};
    box-sizing: border-box;
    font-size: 2em;
    &::before {
      content: '\\00a0 ';
    }
  `,
]);

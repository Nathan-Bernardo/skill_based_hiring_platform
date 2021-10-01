import { css } from '@emotion/react';
import { DESCRIPTION_TEXT_COLOR, LIGHTER_GRAY, LIGHT_BLUE, WHITE } from '../../../constants/colors';

export const col_75 = css`
  float: left;
  margin-top: 6px;
  width: 75%;
`;

export const contentCenter = css`
  justify-content: center;
`;

export const pill = css`
  border: 1px solid blue;
  border-radius: 10px;
  color: #0000d6;
  padding: 10px;
`;

export const selected = css`
  background-color: ${LIGHT_BLUE};
  color: ${WHITE};
`;

export const deselected = css`
  background-color: ${WHITE};
  color: ${LIGHT_BLUE};
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexWrap = css`
  flex-wrap: wrap;
`;

export const marginAuto = css`
  margin-left: auto;
  margin-right: auto;
`;

export const spaceBetween = css`
  justify-content: space-between;
`;

export const solidBorder = css`
  border: 1px solid black;
`;

export const solidBorderRounded = css`
  border: 1px solid black;
  border-radius: 10px;
`;

export const xxLargeFontSize = css`
  font-size: xx-large;
`;

export const largeFontSize = css`
  font-size: large;
`;

export const boldFont = css`
  font-weight: bold;
`;

export const description = css`
  color: ${DESCRIPTION_TEXT_COLOR};
`;

export const hoverPointer = css`
  &:hover {
    cursor: pointer;
  }
`;

export const leftText = css`
  text-align: left;
`;

export const centeredText = css`
  text-align: center;
`;

export const rightText = css`
  text-align: right;
`;

export const alignCenterItems = css`
  align-items: center;
`;

export const boxShadow = css`
  box-shadow: 2px 4px 6px ${LIGHTER_GRAY};
`;

export const hoverShadow = css`
  &:hover {
    box-shadow: 6px 8px 12px ${LIGHTER_GRAY};
  }
`;

export const disableSelect = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const stretchHeight = css`
  height: 100%;
`;

export const stretchWidth = css`
  width: 100%;
`;

export const coverViewport = css`
  height: 100vh;
  width: 100vw;
`;

export const tooltip = css([largeFontSize, centeredText]);

import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const whiteboardContainer = style({
  height: '400px',
  minHeight: '400px',
  overflow: 'hidden',
  padding: 0,
});


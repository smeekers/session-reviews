import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const whiteboardContainer = style({
  height: '37.5rem',
  minHeight: '37.5rem',
  overflow: 'hidden',
  padding: 0,
});

export { root, whiteboardContainer };

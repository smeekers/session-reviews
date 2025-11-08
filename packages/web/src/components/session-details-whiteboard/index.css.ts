import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const whiteboardContainer = style({
  height: '400px',
  minHeight: '400px',
  overflow: 'hidden',
  padding: 0,
});

export { root, whiteboardContainer };

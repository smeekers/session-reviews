import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  height: '100vh',
  position: 'relative',
  width: '100%',
});

const whiteboard = style({
  flex: 1,
  height: '100%',
  width: '100%',
});

export { container, whiteboard };


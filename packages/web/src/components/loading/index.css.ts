import { style } from '@vanilla-extract/css';

const container = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
});

const containerInline = style({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

export { container, containerInline };


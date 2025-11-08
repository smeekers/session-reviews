import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const componentHeading = style({
  fontWeight: 600,
  marginBottom: '0.5rem',
});

export { componentHeading, root };

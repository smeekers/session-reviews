import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const componentHeading = style({
  fontWeight: 700,
  marginBottom: '0.75rem',
  marginTop: '0.5rem',
});

const componentContent = style({
  whiteSpace: 'pre-line',
});

export { componentContent, componentHeading, root };

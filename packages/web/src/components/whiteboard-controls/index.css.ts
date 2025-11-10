import { style } from '@vanilla-extract/css';

const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const shareButton = style({
  borderRadius: '0.5rem',
});

const recordButton = style({
  borderRadius: '0.5rem',
});

export { container, recordButton, shareButton };


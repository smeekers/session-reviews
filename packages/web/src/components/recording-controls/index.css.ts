import { style } from '@vanilla-extract/css';

const root = style({
  bottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  left: '50%',
  position: 'fixed',
  transform: 'translateX(-50%)',
  zIndex: 1001,
});

export { root };


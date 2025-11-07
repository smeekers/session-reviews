import { style } from '@vanilla-extract/css';

export const root = style({
  minHeight: '10rem',
  width: '100%',
  selectors: {
    '&&': {
      // Increase specificity to override MUI's default border radius
      borderRadius: '1rem',
    },
  },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: '8rem',
  padding: '1.5rem',
});


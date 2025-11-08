import { style } from '@vanilla-extract/css';

const root = style({
  minHeight: '10rem',
  width: '100%',
  selectors: {
    '&&': {
      borderRadius: '1rem',
    },
  },
});

const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minHeight: '8rem',
  padding: '1.5rem',
});

export { content, root };

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

const accentPurple = style({
  backgroundColor: '#f3e5f5',
  border: '1px solid #ba68c8',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentOrange = style({
  backgroundColor: '#fff3e0',
  border: '1px solid #ff9800',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentBlue = style({
  backgroundColor: '#e3f2fd',
  border: '1px solid #42a5f5',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentGreen = style({
  backgroundColor: '#e8f5e9',
  border: '1px solid #4caf50',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentRed = style({
  backgroundColor: '#ffebee',
  border: '1px solid #ef5350',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

export { accentBlue, accentGreen, accentOrange, accentPurple, accentRed, content, root };

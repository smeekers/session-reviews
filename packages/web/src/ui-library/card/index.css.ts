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
  backgroundColor: 'rgba(156, 39, 176, 0.08)',
  border: '1px solid var(--theme-secondary-main)',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentOrange = style({
  backgroundColor: 'rgba(237, 108, 2, 0.08)',
  border: '1px solid var(--theme-warning-main)',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentBlue = style({
  backgroundColor: 'rgba(2, 136, 209, 0.08)',
  border: '1px solid var(--theme-info-main)',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentGreen = style({
  backgroundColor: 'rgba(46, 125, 50, 0.08)',
  border: '1px solid var(--theme-success-main)',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

const accentRed = style({
  backgroundColor: 'rgba(211, 47, 47, 0.08)',
  border: '1px solid var(--theme-error-main)',
  minHeight: 'auto',
  selectors: {
    '&&': {
      borderRadius: '0.75rem',
    },
  },
});

export { accentBlue, accentGreen, accentOrange, accentPurple, accentRed, content, root };

import { style } from '@vanilla-extract/css';

const newSessionButton = style({
  backgroundColor: 'var(--theme-primary-main)',
  color: 'var(--theme-primary-contrast)',
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--theme-primary-dark)',
    },
  },
});

export { newSessionButton };


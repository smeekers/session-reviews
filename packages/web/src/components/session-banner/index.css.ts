import { style } from '@vanilla-extract/css';

export const banner = style({
  marginBottom: '1rem',
  selectors: {
    '& .MuiAlert-action': {
      paddingLeft: '1rem',
      paddingRight: '0.5rem',
    },
  },
});


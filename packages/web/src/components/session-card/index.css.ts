import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
});

export const content = style({
  padding: '1.5rem', // 24px
});

export const header = style({
  marginBottom: '1rem', // 16px
});

export const details = style({
  marginBottom: '1rem', // 16px
});

export const detailItem = style({
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem', // 8px
  selectors: {
    '& svg': {
      fontSize: '1rem', // 16px
    },
  },
});

export const icon = style({
  fontSize: '1rem', // 16px
});

export const summary = style({
  marginTop: '0.5rem', // 8px
});


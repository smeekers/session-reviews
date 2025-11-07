import { style } from '@vanilla-extract/css';

export const section = style({
  borderRadius: '0.5rem',
  overflow: 'hidden',
});

export const header = style({
  alignItems: 'center',
  backgroundColor: 'var(--theme-active-dark)',
  borderRadius: '0.5rem 0.5rem 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
});

export const titleContainer = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
});

export const title = style({
  color: 'var(--theme-active-contrast)',
  fontSize: '1.125rem',
  fontWeight: 700,
});

export const newSessionButton = style({
  backgroundColor: 'var(--theme-primary-main)',
  color: 'var(--theme-primary-contrast)',
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--theme-primary-dark)',
    },
  },
});

export const expandButton = style({
  // Color handled via IconButton props
});

export const content = style({
  backgroundColor: 'var(--theme-active-light)',
  borderRadius: '0 0 0.5rem 0.5rem',
  padding: '1.5rem',
});


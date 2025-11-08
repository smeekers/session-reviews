import { style } from '@vanilla-extract/css';

const section = style({
  borderRadius: '0.5rem',
  overflow: 'hidden',
});

const header = style({
  alignItems: 'center',
  backgroundColor: 'var(--theme-active-dark)',
  borderRadius: '0.5rem 0.5rem 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
});

const titleContainer = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
});

const title = style({
  color: 'var(--theme-active-contrast)',
  fontSize: '1.125rem',
  fontWeight: 700,
});

const newSessionButton = style({
  backgroundColor: 'var(--theme-primary-main)',
  color: 'var(--theme-primary-contrast)',
  selectors: {
    '&:hover': {
      backgroundColor: 'var(--theme-primary-dark)',
    },
  },
});

const expandButton = style({
  color: 'var(--theme-active-contrast)',
});

const content = style({
  backgroundColor: 'var(--theme-active-light)',
  borderRadius: '0 0 0.5rem 0.5rem',
  padding: '1.5rem',
});

export { content, expandButton, header, newSessionButton, section, title, titleContainer };

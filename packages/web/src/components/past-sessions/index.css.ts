import { style } from '@vanilla-extract/css';

const section = style({
  borderRadius: '0.5rem',
  overflow: 'hidden',
});

const header = style({
  alignItems: 'center',
  backgroundColor: 'var(--theme-past-dark)',
  borderRadius: '0.5rem 0.5rem 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
});

const title = style({
  color: 'var(--theme-past-contrast)',
  fontSize: '1.125rem',
  fontWeight: 700,
});

const expandButton = style({
  color: 'var(--theme-past-contrast)',
});

const content = style({
  backgroundColor: 'var(--theme-past-light)',
  borderRadius: '0 0 0.5rem 0.5rem',
  padding: '1.5rem',
});

export { content, expandButton, header, section, title };

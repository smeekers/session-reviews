import { style } from '@vanilla-extract/css';

export const root = style({
  alignItems: 'center',
  cursor: 'text',
  display: 'inline-flex',
  gap: '0.5rem',
});

export const title = style({
  display: 'inline-block',
});

export const placeholder = style({
  display: 'inline-block',
  fontStyle: 'italic',
});

export const input = style({
  minWidth: '20rem',
});

export const icon = style({
  flexShrink: 0,
});


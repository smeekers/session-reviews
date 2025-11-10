import { style } from '@vanilla-extract/css';

const root = style({
  alignItems: 'center',
  cursor: 'text',
  display: 'inline-flex',
  gap: '0.5rem',
});

const title = style({
  display: 'inline-block',
});

const placeholder = style({
  display: 'inline-block',
  fontStyle: 'italic',
});

const input = style({
  minWidth: '20rem',
});

const icon = style({
  flexShrink: 0,
});

export { icon, input, placeholder, root, title };

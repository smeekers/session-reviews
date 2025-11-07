import { style } from '@vanilla-extract/css';

export const root = style({
  width: '100%',
});

export const header = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

export const title = style({
  fontWeight: 600,
});

export const details = style({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
});

export const detailItem = style({
  alignItems: 'center',
  display: 'flex',
});

export const icon = style({
  fontSize: '1rem',
  height: '1rem',
  width: '1rem',
});

export const summarySection = style({
  flex: 1,
  minHeight: '3rem',
});

export const summary = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordBreak: 'break-word',
});

export const summaryPlaceholder = style({
  minHeight: '3rem',
});

export const actionText = style({
  fontWeight: 500,
});


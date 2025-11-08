import { style } from '@vanilla-extract/css';

const root = style({
  width: '100%',
});

const header = style({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
});

const title = style({
  fontWeight: 600,
});

const details = style({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
});

const detailItem = style({
  alignItems: 'center',
  display: 'flex',
});

const icon = style({
  fontSize: '1rem',
  height: '1rem',
  width: '1rem',
});

const summarySection = style({
  flex: 1,
  minHeight: '3rem',
});

const summary = style({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordBreak: 'break-word',
});

const summaryPlaceholder = style({
  minHeight: '3rem',
});

const actionText = style({
  fontWeight: 500,
});

export {
  actionText,
  detailItem,
  details,
  header,
  icon,
  root,
  summary,
  summaryPlaceholder,
  summarySection,
  title,
};

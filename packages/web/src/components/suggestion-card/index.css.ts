import { style } from '@vanilla-extract/css';

const card = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'auto',
  width: '16.5rem',
});

const completedCard = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'auto',
  opacity: 0.7,
  width: '16.5rem',
});

const cardContent = style({
  alignItems: 'flex-start',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: '0.75rem',
  minHeight: 'auto',
  selectors: {
    '&&': {
      padding: '1.375rem',
    },
  },
});

const contentStack = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
});

const chipContainer = style({
  alignSelf: 'flex-start',
  display: 'inline-flex',
});

const cardActions = style({
  justifyContent: 'flex-start',
  padding: '0.5rem 1.375rem 1.375rem',
});

const completedText = style({
  opacity: 0.6,
  textDecoration: 'line-through',
});

export { card, cardActions, cardContent, chipContainer, completedCard, completedText, contentStack };


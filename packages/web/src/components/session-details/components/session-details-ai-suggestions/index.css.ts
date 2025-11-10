import { style } from '@vanilla-extract/css';

const suggestionsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const cardsGrid = style({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(16.5rem, 1fr))',
  width: '100%',
});

export { cardsGrid, suggestionsContainer };

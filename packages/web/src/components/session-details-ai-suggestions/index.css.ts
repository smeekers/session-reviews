import { style } from '@vanilla-extract/css';

const suggestionsContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

const baseSuggestionCard = style({
  borderRadius: '0.75rem',
  padding: '1.25rem',
});

const suggestionCard = style([
  baseSuggestionCard,
  {
    backgroundColor: 'var(--theme-info-light)',
  },
]);

const completedSuggestionCard = style([
  baseSuggestionCard,
  {
    backgroundColor: 'var(--theme-background-paper)',
  },
]);

const completedText = style({
  opacity: 0.6,
  textDecoration: 'line-through',
});

export { completedSuggestionCard, completedText, suggestionCard, suggestionsContainer };

import { style } from '@vanilla-extract/css';

const whiteboardContainer = style({
  display: 'flex',
  height: '100%',
  minHeight: '400px',
  position: 'relative',
  width: '100%',
});

const loadingContainer = style({
  alignItems: 'center',
  display: 'flex',
  height: '400px',
  justifyContent: 'center',
  width: '100%',
});

const loadingText = style({
  color: 'var(--theme-text-secondary)',
});

export { loadingContainer, loadingText, whiteboardContainer };


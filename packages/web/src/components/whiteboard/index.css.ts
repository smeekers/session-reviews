import { style } from '@vanilla-extract/css';

export const whiteboardContainer = style({
  height: '100%',
  minHeight: '400px',
  position: 'relative',
  width: '100%',
});

export const loadingContainer = style({
  alignItems: 'center',
  display: 'flex',
  height: '400px',
  justifyContent: 'center',
  width: '100%',
});

export const loadingText = style({
  color: 'var(--theme-text-secondary)',
});


import { style } from '@vanilla-extract/css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
});

export const videoContainer = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  padding: '1rem',
  '@media': {
    [`(max-width: 768px)`]: {
      flexDirection: 'column',
    },
  },
});

export const videoWrapper = style({
  flex: 1,
  minHeight: '400px',
  position: 'relative',
  width: '100%',
});

export const videoPlayer = style({
  height: '100%',
  width: '100%',
});

export const bookmarksSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minWidth: '300px',
  width: '300px',
  '@media': {
    [`(max-width: 768px)`]: {
      width: '100%',
    },
  },
});

export const bookmarksHeader = style({
  alignItems: 'center',
});

export const bookmarkItem = style({
  background: 'none',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  padding: '0.5rem',
  textAlign: 'left',
  transition: 'background-color 0.2s',
  width: '100%',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});


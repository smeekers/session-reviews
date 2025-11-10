import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const videoContainer = style({
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  overflow: 'hidden',
  padding: '1rem',
  '@media': {
    [`(max-width: 768px)`]: {
      flexDirection: 'column',
    },
  },
});

const videoWrapper = style({
  flex: 1,
  minHeight: '400px',
  position: 'relative',
  width: '100%',
});

const videoPlayer = style({
  height: '100%',
  width: '100%',
});

export { root, videoContainer, videoPlayer, videoWrapper };

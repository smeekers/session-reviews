import { style } from '@vanilla-extract/css';

const root = style({
  bottom: '1rem',
  display: 'flex',
  flexDirection: 'column',
  height: '20rem',
  minWidth: '20rem',
  padding: '1rem',
  position: 'fixed',
  right: '1rem',
  width: '20rem',
  zIndex: 1000,
});

const header = style({
  alignItems: 'center',
  marginBottom: '0.5rem',
});

const videoContainer = style({
  backgroundColor: '#000',
  borderRadius: '0.5rem',
  flex: 1,
  overflow: 'hidden',
  position: 'relative',
});

const video = style({
  height: '100%',
  objectFit: 'cover',
  width: '100%',
});

const errorContainer = style({
  height: '100%',
  minHeight: '10rem',
});

const bookmarkButtonContainer = style({
  padding: '0.5rem 1rem 0.5rem',
});

export { bookmarkButtonContainer, errorContainer, header, root, video, videoContainer };


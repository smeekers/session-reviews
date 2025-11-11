import { globalStyle, style } from '@vanilla-extract/css';

const whiteboardWrapper = style({
  display: 'flex',
  height: '100%',
  width: '100%',
});

const loadingWrapper = style({
  height: '100%',
  width: '100%',
});

const whiteboardContainer = style({
  display: 'flex',
  height: '100%',
  minHeight: '400px',
  position: 'relative',
  width: '100%',
});

// Hide Excalidraw library sidebar trigger to give more room for top-right UI
globalStyle(`${whiteboardContainer} .sidebar-trigger__label-element`, {
  display: 'none',
});

globalStyle(`${whiteboardContainer} .UserList__wrapper`, {
  width: 'unset',
});

export { loadingWrapper, whiteboardContainer, whiteboardWrapper };


import { style } from '@vanilla-extract/css';

const root = style({
  display: 'flex',
  flexDirection: 'column',
});

const headerContainer = style({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
});

const whiteboardContainer = style({
  height: '37.5rem',
  minHeight: '37.5rem',
  overflow: 'hidden',
  padding: 0,
});

const viewButton = style({
  borderRadius: '0.5rem',
});

export { headerContainer, root, viewButton, whiteboardContainer };

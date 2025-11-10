import { globalStyle, style } from '@vanilla-extract/css';

const banner = style({
  marginBottom: '1rem',
});

const actionContainer = style({
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem',
});

const closeButton = style({
  minWidth: 'auto',
  padding: '0.25rem 0.5rem',
});

globalStyle(`${banner} .MuiAlert-action`, {
  paddingLeft: '1rem',
  paddingRight: '0.5rem',
});

export { actionContainer, banner, closeButton };

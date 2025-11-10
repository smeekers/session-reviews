import { globalStyle, style } from '@vanilla-extract/css';

const banner = style({
  marginBottom: '1rem',
});

globalStyle(`${banner} .MuiAlert-action`, {
  paddingLeft: '1rem',
  paddingRight: '0.5rem',
});

export { banner };

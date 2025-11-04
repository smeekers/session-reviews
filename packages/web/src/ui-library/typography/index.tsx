import type { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

import Typography from '@mui/material/Typography';

export interface TypographyProps extends MuiTypographyProps {}

function UiTypography(props: TypographyProps) {
  return <Typography {...props} />;
}

export default UiTypography;


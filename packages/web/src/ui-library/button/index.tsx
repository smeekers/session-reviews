import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import Button from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {}

function UiButton(props: ButtonProps) {
  return <Button {...props} />;
}

export default UiButton;


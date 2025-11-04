import type { InputLabelProps as MuiInputLabelProps } from '@mui/material/InputLabel';

import InputLabel from '@mui/material/InputLabel';

export interface InputLabelProps extends MuiInputLabelProps {}

function UiInputLabel(props: InputLabelProps) {
  return <InputLabel {...props} />;
}

export default UiInputLabel;


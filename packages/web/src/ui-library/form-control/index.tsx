import type { FormControlProps as MuiFormControlProps } from '@mui/material/FormControl';

import FormControl from '@mui/material/FormControl';

export interface FormControlProps extends MuiFormControlProps {}

function UiFormControl(props: FormControlProps) {
  return <FormControl {...props} />;
}

export default UiFormControl;


import type { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

import Checkbox from '@mui/material/Checkbox';

export interface CheckboxProps extends MuiCheckboxProps {}

function UiCheckbox(props: CheckboxProps) {
  return <Checkbox {...props} />;
}

export default UiCheckbox;


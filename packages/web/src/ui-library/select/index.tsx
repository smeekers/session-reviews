import type { SelectProps as MuiSelectProps } from '@mui/material/Select';

import Select from '@mui/material/Select';

export interface SelectProps extends MuiSelectProps {}

function UiSelect(props: SelectProps) {
  return <Select {...props} />;
}

export default UiSelect;


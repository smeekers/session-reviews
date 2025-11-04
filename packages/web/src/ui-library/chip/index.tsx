import type { ChipProps as MuiChipProps } from '@mui/material/Chip';

import Chip from '@mui/material/Chip';

export interface ChipProps extends MuiChipProps {}

function UiChip(props: ChipProps) {
  return <Chip {...props} />;
}

export default UiChip;


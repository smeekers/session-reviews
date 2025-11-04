import type { StackProps as MuiStackProps } from '@mui/material/Stack';

import Stack from '@mui/material/Stack';

export interface StackProps extends MuiStackProps {}

function UiStack(props: StackProps) {
  return <Stack {...props} />;
}

export default UiStack;


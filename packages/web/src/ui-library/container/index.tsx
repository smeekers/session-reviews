import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';

import Container from '@mui/material/Container';

export interface ContainerProps extends MuiContainerProps {}

function UiContainer(props: ContainerProps) {
  return <Container {...props} />;
}

export default UiContainer;


import type { MenuProps as MuiMenuProps } from '@mui/material/Menu';

import Menu from '@mui/material/Menu';

export interface MenuProps extends MuiMenuProps {}

function UiMenu(props: MenuProps) {
  return <Menu {...props} />;
}

export default UiMenu;


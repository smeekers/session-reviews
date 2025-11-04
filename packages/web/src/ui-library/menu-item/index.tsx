import type { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';

import MenuItem from '@mui/material/MenuItem';

export interface MenuItemProps extends MuiMenuItemProps {}

function UiMenuItem(props: MenuItemProps) {
  return <MenuItem {...props} />;
}

export default UiMenuItem;


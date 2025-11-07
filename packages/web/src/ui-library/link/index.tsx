import type { LinkProps as MuiLinkProps } from '@mui/material/Link';

import Link from '@mui/material/Link';

export interface LinkProps extends MuiLinkProps {}

function UiLink(props: LinkProps) {
  return <Link {...props} />;
}

export default UiLink;


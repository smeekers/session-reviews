import type { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs';

import Breadcrumbs from '@mui/material/Breadcrumbs';

export interface BreadcrumbsProps extends MuiBreadcrumbsProps {}

function UiBreadcrumbs(props: BreadcrumbsProps) {
  return <Breadcrumbs {...props} />;
}

export default UiBreadcrumbs;


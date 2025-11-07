import type { PaperProps as MuiPaperProps } from '@mui/material/Paper';

import Paper from '@mui/material/Paper';

export interface PaperProps extends MuiPaperProps {}

function UiPaper(props: PaperProps) {
  return <Paper {...props} />;
}

export default UiPaper;


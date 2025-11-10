import { CircularProgress, Dialog, DialogContent, DialogTitle, Stack, Typography } from '../../ui-library';

interface ProcessingDialogProps {
  open: boolean;
  step?: string | null;
}

function ProcessingDialog({ open, step }: ProcessingDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>Processing Session</DialogTitle>
      <DialogContent>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          {step && <Typography variant="body2">{step}</Typography>}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ProcessingDialog;


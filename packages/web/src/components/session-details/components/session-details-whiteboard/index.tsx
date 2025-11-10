import { OpenInNew } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '../../../../ui-library';
import { ROUTES } from '../../../../constants';
import Whiteboard from '../../../../components/whiteboard';
import * as styles from './index.css';

interface SessionDetailsWhiteboardProps {
  sessionUid: string;
}

function SessionDetailsWhiteboard({ sessionUid }: SessionDetailsWhiteboardProps) {
  function handleViewWhiteboard() {
    const whiteboardUrl = `${window.location.origin}${ROUTES.WHITEBOARD(sessionUid)}`;
    window.open(whiteboardUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <Stack className={styles.root} spacing={2}>
      <Stack spacing={1}>
        <div className={styles.headerContainer}>
          <Typography variant="h5">Whiteboard</Typography>
          <Button
            className={styles.viewButton}
            endIcon={<OpenInNew />}
            onClick={handleViewWhiteboard}
            size="small"
            variant="contained"
          >
            View full whiteboard
          </Button>
        </div>
        <Typography color="text.secondary" variant="body2">
          View the collaborative whiteboard from this session.
        </Typography>
      </Stack>

      <Paper className={styles.whiteboardContainer}>
        <Whiteboard roomId={sessionUid} />
      </Paper>
    </Stack>
  );
}

export default SessionDetailsWhiteboard;


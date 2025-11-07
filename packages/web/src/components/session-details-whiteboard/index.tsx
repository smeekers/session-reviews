import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Button, Paper } from '../../ui-library';
import { ROUTES } from '../../constants';
import Whiteboard from '../whiteboard';
import * as styles from './index.css';

interface SessionDetailsWhiteboardProps {
  sessionUid: string;
}

function SessionDetailsWhiteboard({ sessionUid }: SessionDetailsWhiteboardProps) {
  const navigate = useNavigate();

  function handleViewWhiteboard() {
    navigate(ROUTES.WHITEBOARD(sessionUid));
  }

  return (
    <Stack className={styles.root} spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">Whiteboard</Typography>
        <Typography color="text.secondary" variant="body2">
          View the collaborative whiteboard from this session.
        </Typography>
      </Stack>

      <Paper className={styles.whiteboardContainer}>
        <Whiteboard roomId={sessionUid} />
      </Paper>

      <Button onClick={handleViewWhiteboard} variant="outlined">
        View Whiteboard
      </Button>
    </Stack>
  );
}

export default SessionDetailsWhiteboard;


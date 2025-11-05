import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Button, Stack, Typography } from '../../ui-library';
import SessionList from '../session-list';
import type { Session } from '../../types';
import * as styles from './index.css';

interface ActiveSessionsProps {
  sessions: Session[];
}

function ActiveSessions({ sessions }: ActiveSessionsProps) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  function handleNewSession() {
    // TODO: Create new session and navigate to live-session
    const newUid = `session_${Date.now()}`;
    navigate(ROUTES.LIVE_SESSION(newUid));
  }

  return (
    <Stack spacing={2}>
      <Stack className={styles.header} direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h5">Active Sessions</Typography>
          <Button onClick={() => setExpanded(!expanded)} size="small" variant="outlined">
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Stack>
        <Button onClick={handleNewSession} variant="contained">
          New Session
        </Button>
      </Stack>

      {expanded && <SessionList sessions={sessions} />}
    </Stack>
  );
}

export default ActiveSessions;


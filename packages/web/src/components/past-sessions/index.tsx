import { useState } from 'react';
import { Button, Stack, Typography } from '../../ui-library';
import SessionList from '../session-list';
import type { Session } from '../../types';
import * as styles from './index.css';

interface PastSessionsProps {
  sessions: Session[];
}

function PastSessions({ sessions }: PastSessionsProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Stack spacing={2}>
      <Stack className={styles.header} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Past Sessions</Typography>
        <Button onClick={() => setExpanded(!expanded)} size="small" variant="outlined">
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </Stack>

      {expanded && <SessionList sessions={sessions} />}
    </Stack>
  );
}

export default PastSessions;


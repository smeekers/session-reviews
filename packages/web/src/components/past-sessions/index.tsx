import { useState } from 'react';
import { Add, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '../../ui-library';
import SessionList from '../session-list';
import type { Session } from '../../types';
import * as styles from './index.css';

interface PastSessionsProps {
  sessions: Session[];
}

function PastSessions({ sessions }: PastSessionsProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.section}>
      <Stack className={styles.header} direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={styles.title} variant="h5">
          Past Sessions
        </Typography>
        <IconButton
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className={styles.expandButton}
          onClick={() => setExpanded(!expanded)}
          size="small"
          style={{ color: 'var(--theme-past-contrast)' }}
        >
          {expanded ? <Remove /> : <Add />}
        </IconButton>
      </Stack>

      {expanded && (
        <div className={styles.content}>
          <SessionList sessions={sessions} />
        </div>
      )}
    </div>
  );
}

export default PastSessions;


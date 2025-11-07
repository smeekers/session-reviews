import { useState } from 'react';
import { useAtom } from 'jotai';
import { Add, Remove } from '@mui/icons-material';
import { bannerAtom } from '../../atoms/banner';
import { Button, IconButton, Stack, Typography } from '../../ui-library';
import NewSessionDialog from '../new-session-dialog';
import SessionList from '../session-list';
import type { Session } from '../../types';
import * as styles from './index.css';

interface ActiveSessionsProps {
  sessions: Session[];
}

function ActiveSessions({ sessions }: ActiveSessionsProps) {
  const [expanded, setExpanded] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [, setBannerState] = useAtom(bannerAtom);

  function handleNewSession() {
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  function handleSessionCreated(sessionUid: string, sessionName?: string) {
    setBannerState({
      type: 'ready',
      sessionUid,
      sessionName,
    });
  }

  return (
    <>
      <div className={styles.section}>
        <Stack className={styles.header} direction="row" justifyContent="space-between" alignItems="center">
          <Stack className={styles.titleContainer} direction="row" spacing={2} alignItems="center">
            <Typography className={styles.title} variant="h5">
              Active Sessions
            </Typography>
            <Button
              className={styles.newSessionButton}
              onClick={handleNewSession}
              startIcon={<Add />}
              variant="contained"
            >
              New Session
            </Button>
          </Stack>
          <IconButton
            aria-label={expanded ? 'Collapse' : 'Expand'}
            className={styles.expandButton}
            onClick={() => setExpanded(!expanded)}
            size="small"
            style={{ color: 'var(--theme-active-contrast)' }}
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
      <NewSessionDialog
        onClose={handleDialogClose}
        onSessionCreated={handleSessionCreated}
        open={dialogOpen}
      />
    </>
  );
}

export default ActiveSessions;


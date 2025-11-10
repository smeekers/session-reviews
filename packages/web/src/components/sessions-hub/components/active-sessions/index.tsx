import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { Add } from '@mui/icons-material';
import { SESSION_STRINGS } from '../../../../constants';
import { bannerAtom } from '../../../../atoms/banner';
import { Button } from '../../../../ui-library';
import NewSessionDialog from '../../../new-session-dialog';
import SessionList from '../../../session-list';
import SessionSection from '../../../session-section';
import type { Session } from '../../../../types';
import * as styles from './index.css';

interface ActiveSessionsProps {
  sessions: Session[];
}

function ActiveSessions({ sessions }: ActiveSessionsProps) {
  const [expanded, setExpanded] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const setBannerState = useSetAtom(bannerAtom);

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

  function handleToggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <>
      <SessionSection
        expanded={expanded}
        headerActions={
          <Button
            aria-label={SESSION_STRINGS.NEW_SESSION}
            className={styles.newSessionButton}
            onClick={handleNewSession}
            startIcon={<Add />}
            variant="contained"
          >
            {SESSION_STRINGS.NEW_SESSION}
          </Button>
        }
        onToggle={handleToggle}
        title={SESSION_STRINGS.ACTIVE_SESSIONS}
        variant="active"
      >
        <SessionList sessions={sessions} />
      </SessionSection>
      <NewSessionDialog
        onClose={handleDialogClose}
        onSessionCreated={handleSessionCreated}
        open={dialogOpen}
      />
    </>
  );
}

export default ActiveSessions;


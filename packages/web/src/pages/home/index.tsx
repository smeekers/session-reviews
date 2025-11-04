import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '../../ui-library';
import SessionFilters from '../../components/session-filters';
import SessionList from '../../components/session-list';
import type { SessionStatus } from '../../types';
import * as styles from './index.css';

function Home() {
  const [statusFilter, setStatusFilter] = useState<SessionStatus | 'all'>('all');
  const navigate = useNavigate();

  function handleNewSession() {
    // TODO: Create new session and navigate to live-session
    const newUid = `session_${Date.now()}`;
    navigate(`/live-session/${newUid}`);
  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Stack spacing={3}>
        <Stack className={styles.header} direction="row" justifyContent="space-between">
          <Typography variant="h4">Session Reviews</Typography>
          <Button onClick={handleNewSession} variant="contained">
            New Session
          </Button>
        </Stack>

        <SessionFilters statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />

        <SessionList statusFilter={statusFilter} />
      </Stack>
    </Container>
  );
}

export default Home;

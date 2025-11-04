import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Stack, Typography } from '../../ui-library';
import SessionCard from '../../components/session-card';
import SessionFilters from '../../components/session-filters';
import { useSessions } from '../../hooks';
import type { SessionStatus } from '../../types';
import * as styles from './index.css';

function Home() {
  const { sessions, loading, error } = useSessions();
  const [statusFilter, setStatusFilter] = useState<SessionStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredSessions = useMemo(() => {
    if (statusFilter === 'all') {
      return sessions;
    }
    return sessions.filter((session) => session.status === statusFilter);
  }, [sessions, statusFilter]);

  function handleNewSession() {
    // TODO: Create new session and navigate to live-session
    const newUid = `session_${Date.now()}`;
    navigate(`/live-session/${newUid}`);
  }

  if (loading) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography>Loading sessions...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="error">Error loading sessions: {error.message}</Typography>
      </Container>
    );
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

        {filteredSessions.length === 0 ? (
          <Typography color="text.secondary">No sessions found.</Typography>
        ) : (
          <Stack spacing={2}>
            {filteredSessions.map((session) => (
              <SessionCard key={session.uid} session={session} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default Home;

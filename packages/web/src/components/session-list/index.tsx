import { useMemo } from 'react';
import { Container, Stack, Typography } from '../../ui-library';
import SessionCard from '../session-card';
import { useSessions } from '../../hooks';
import type { SessionStatus } from '../../types';
import * as styles from './index.css';

interface SessionListProps {
  statusFilter: SessionStatus | 'all';
}

function SessionList({ statusFilter }: SessionListProps) {
  const { sessions, loading, error } = useSessions();

  const filteredSessions = useMemo(() => {
    if (statusFilter === 'all') {
      return sessions;
    }
    return sessions.filter((session) => session.status === statusFilter);
  }, [sessions, statusFilter]);

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

  if (filteredSessions.length === 0) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="text.secondary">No sessions found.</Typography>
      </Container>
    );
  }

  return (
    <Stack spacing={2}>
      {filteredSessions.map((session) => (
        <SessionCard key={session.uid} session={session} />
      ))}
    </Stack>
  );
}

export default SessionList;


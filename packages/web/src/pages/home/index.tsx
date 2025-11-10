import { useMemo } from 'react';
import { Container, Stack, Typography } from '../../ui-library';
import ActiveSessions from '../../components/active-sessions';
import PastSessions from '../../components/past-sessions';
import SessionBanner from '../../components/session-banner';
import SessionFilters from '../../components/session-filters';
import Loading from '../../components/loading';
import { useSessions } from '../../hooks';
import * as styles from './index.css';

function Home() {
  const { sessions, loading, error } = useSessions();

  const { activeSessions, pastSessions } = useMemo(() => {
    const active: typeof sessions = [];
    const past: typeof sessions = [];

    sessions.forEach((session) => {
      if (session.status === 'ready' || session.status === 'in-progress') {
        active.push(session);
      } else {
        past.push(session);
      }
    });

    return { activeSessions: active, pastSessions: past };
  }, [sessions]);

  if (loading) {
    return <Loading message="Loading sessions..." />;
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
        <Typography variant="h4">Session Reviews</Typography>

        <SessionBanner />

        <SessionFilters />

        <ActiveSessions sessions={activeSessions} />
        <PastSessions sessions={pastSessions} />
      </Stack>
    </Container>
  );
}

export default Home;

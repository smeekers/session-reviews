import { Container, Stack, Typography } from '../../ui-library';
import Loading from '../../components/loading';
import SessionsHub from '../../components/sessions-hub';
import { useSessions } from '../../hooks';
import * as styles from './index.css';

function Home() {
  const { sessions, loading, error } = useSessions();

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
        <SessionsHub sessions={sessions} />
      </Stack>
    </Container>
  );
}

export default Home;

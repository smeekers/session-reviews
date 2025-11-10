import { COMMON_STRINGS } from '../../constants';
import { Container, Stack, Typography } from '../../ui-library';
import Loading from '../../components/loading';
import SessionsHub from '../../components/sessions-hub';
import { useSessions } from '../../hooks';
import * as styles from './index.css';

function Home() {
  const { sessions, isLoading, error } = useSessions();

  if (isLoading) {
    return <Loading message={COMMON_STRINGS.LOADING_SESSIONS} />;
  }

  if (error) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="error">{COMMON_STRINGS.ERROR_LOADING_SESSIONS}: {error.message}</Typography>
      </Container>
    );
  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Stack spacing={3}>
        <Typography variant="h4">{COMMON_STRINGS.SESSION_REVIEWS}</Typography>
        <SessionsHub sessions={sessions} />
      </Stack>
    </Container>
  );
}

export default Home;

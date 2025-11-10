import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { Container, Stack, Typography, Breadcrumbs, Link } from '../../ui-library';
import Loading from '../../components/loading';
import SessionDetails from '../../components/session-details';
import { ROUTES } from '../../constants';
import { useSession } from '../../hooks';
import * as styles from './index.css';

function SessionDetailsPage() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const navigate = useNavigate();
  const { session, loading, error } = useSession(sessionUid || '');

  function handleBackClick() {
    navigate(ROUTES.HOME);
  }

  if (loading) {
    return <Loading message="Loading session..." />;
  }

  if (error || !session) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="error">
          {error ? `Error loading session: ${error.message}` : 'Session not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Stack spacing={4}>
        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight fontSize="small" />}>
          <Link
            component="button"
            onClick={handleBackClick}
            underline="hover"
            variant="body2"
          >
            Sessions
          </Link>
          <Typography color="text.primary" variant="body2">
            Session Details
          </Typography>
        </Breadcrumbs>

        <SessionDetails session={session} />
      </Stack>
    </Container>
  );
}

export default SessionDetailsPage;

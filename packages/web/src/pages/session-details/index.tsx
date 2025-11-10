import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';
import { COMMON_STRINGS, ROUTES } from '../../constants';
import { Container, Stack, Typography, Breadcrumbs, Link } from '../../ui-library';
import Loading from '../../components/loading';
import SessionDetails from '../../components/session-details';
import { useSession } from '../../hooks';
import * as styles from './index.css';

function SessionDetailsPage() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const navigate = useNavigate();
  const { session, isLoading, error } = useSession(sessionUid || '');

  function handleBackClick() {
    navigate(ROUTES.HOME);
  }

  if (isLoading) {
    return <Loading message={COMMON_STRINGS.LOADING_SESSION} />;
  }

  if (error || !session) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="error">
          {error ? `${COMMON_STRINGS.ERROR_LOADING_SESSION}: ${error.message}` : COMMON_STRINGS.SESSION_NOT_FOUND}
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
            {COMMON_STRINGS.SESSIONS}
          </Link>
          <Typography color="text.primary" variant="body2">
            {COMMON_STRINGS.SESSION_DETAILS}
          </Typography>
        </Breadcrumbs>

        <SessionDetails session={session} />
      </Stack>
    </Container>
  );
}

export default SessionDetailsPage;

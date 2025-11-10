import { COMMON_STRINGS } from '../../constants';
import { useParams } from 'react-router-dom';
import { Typography } from '../../ui-library';
import Loading from '../../components/loading';
import LiveSession from '../../components/live-session';
import { useSession } from '../../hooks';
import * as styles from './index.css';

function LiveSessionPage() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const { session, isLoading, error } = useSession(sessionUid || '');

  if (isLoading) {
    return <Loading message={COMMON_STRINGS.LOADING_SESSION} />;
  }

  if (error || !session) {
    return (
      <div className={styles.container}>
        <Typography color="error">
          {error ? `${COMMON_STRINGS.ERROR_LOADING_SESSION}: ${error.message}` : COMMON_STRINGS.SESSION_NOT_FOUND}
        </Typography>
      </div>
    );
  }

  return <LiveSession sessionUid={sessionUid || ''} />;
}

export default LiveSessionPage;

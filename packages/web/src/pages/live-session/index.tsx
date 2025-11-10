import { useParams } from 'react-router-dom';
import { Typography } from '../../ui-library';
import Loading from '../../components/loading';
import LiveSession from '../../components/live-session';
import { useSession } from '../../hooks';
import * as styles from './index.css';

function LiveSessionPage() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const { session, loading, error } = useSession(sessionUid || '');

  if (loading) {
    return <Loading message="Loading session..." />;
  }

  if (error || !session) {
    return (
      <div className={styles.container}>
        <Typography color="error">
          {error ? `Error loading session: ${error.message}` : 'Session not found'}
        </Typography>
      </div>
    );
  }

  return <LiveSession sessionUid={sessionUid || ''} />;
}

export default LiveSessionPage;

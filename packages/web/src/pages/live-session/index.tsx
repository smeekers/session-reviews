import { Typography } from '../../ui-library';
import Whiteboard from '../../components/whiteboard';
import WebcamPanel from '../../components/webcam-panel';
import RecordingControls from '../../components/recording-controls';
import Loading from '../../components/loading';
import { useSession } from '../../hooks';
import useLiveSession from '../../hooks/use-live-session';
import { useParams } from 'react-router-dom';
import * as styles from './index.css';

function LiveSession() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const { session, loading } = useSession(sessionUid || '');
  const {
    isRecording,
    recordingError,
    handleStartRecording,
    handleEndSession,
    handleStreamReady,
  } = useLiveSession({ sessionUid: sessionUid || '' });

  if (loading) {
    return <Loading message="Loading session..." />;
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <Typography color="error">Session not found</Typography>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Whiteboard className={styles.whiteboard} roomId={sessionUid || ''} />

      <WebcamPanel onStreamReady={handleStreamReady} />

      <RecordingControls
        error={recordingError}
        isRecording={isRecording}
        onEndSession={handleEndSession}
        onStartRecording={handleStartRecording}
      />
    </div>
  );
}

export default LiveSession;

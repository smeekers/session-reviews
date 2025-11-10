import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const streamReadyRef = useRef(handleStreamReady);

  // Update ref when handleStreamReady changes
  useEffect(() => {
    streamReadyRef.current = handleStreamReady;
  }, [handleStreamReady]);

  // Memoize the callback to prevent re-renders
  const onStreamReady = useCallback((stream: MediaStream | null) => {
    streamReadyRef.current(stream);
  }, []);

  // Track recording start time
  useEffect(() => {
    if (isRecording && !recordingStartTime) {
      setRecordingStartTime(Date.now());
    } else if (!isRecording) {
      setRecordingStartTime(null);
    }
  }, [isRecording, recordingStartTime]);

  function getCurrentRecordingTime(): number {
    if (!recordingStartTime) {
      return 0;
    }
    return Math.floor((Date.now() - recordingStartTime) / 1000);
  }

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

      <WebcamPanel
        getCurrentTime={getCurrentRecordingTime}
        isRecording={isRecording}
        onStreamReady={onStreamReady}
        sessionUid={sessionUid || ''}
      />

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

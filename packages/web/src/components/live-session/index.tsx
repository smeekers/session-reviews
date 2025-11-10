import { useCallback, useEffect, useRef, useState } from 'react';
import Whiteboard from '../whiteboard';
import WhiteboardControls from '../whiteboard-controls';
import WebcamPanel from '../webcam-panel';
import { ROUTES } from '../../constants';
import useLiveSession from '../../hooks/use-live-session';
import * as styles from './index.css';

interface LiveSessionProps {
  sessionUid: string;
}

function LiveSession({ sessionUid }: LiveSessionProps) {
  const {
    isRecording,
    recordingError,
    handleStartRecording,
    handleEndSession,
    handleStreamReady,
  } = useLiveSession({ sessionUid });
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [shareButtonText, setShareButtonText] = useState('Share Session');
  const streamReadyRef = useRef(handleStreamReady);

  useEffect(() => {
    streamReadyRef.current = handleStreamReady;
  }, [handleStreamReady]);

  const onStreamReady = useCallback((stream: MediaStream | null) => {
    streamReadyRef.current(stream);
  }, []);

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

  async function handleShareSession() {
    const whiteboardUrl = `${window.location.origin}${ROUTES.WHITEBOARD(sessionUid)}`;

    try {
      await navigator.clipboard.writeText(whiteboardUrl);
      setShareButtonText('Link copied to clipboard');
      setTimeout(() => {
        setShareButtonText('Share Session');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link to clipboard:', err);
    }
  }

  function renderTopRightUI(_isMobile: boolean, _appState: unknown) {
    return (
      <WhiteboardControls
        error={recordingError}
        isRecording={isRecording}
        onEndSession={handleEndSession}
        onShareSession={handleShareSession}
        onStartRecording={handleStartRecording}
        shareButtonText={shareButtonText}
      />
    );
  }

  return (
    <div className={styles.container}>
      <Whiteboard
        className={styles.whiteboard}
        renderTopRightUI={renderTopRightUI}
        roomId={sessionUid}
      />

      <WebcamPanel
        getCurrentTime={getCurrentRecordingTime}
        isRecording={isRecording}
        onStreamReady={onStreamReady}
        sessionUid={sessionUid}
      />
    </div>
  );
}

export default LiveSession;


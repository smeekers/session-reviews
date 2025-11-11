import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Whiteboard from '../whiteboard';
import WhiteboardControls from '../whiteboard-controls';
import WebcamPanel from '../webcam-panel';
import { ROUTES, WHITEBOARD_STRINGS, MILLISECONDS_PER_SECOND, SHARE_BUTTON_RESET_DELAY_MS } from '../../constants';
import useLiveSession from '../../hooks/use-live-session';
import * as styles from './index.css';

interface LiveSessionProps {
  sessionUid: string;
}

function LiveSession({ sessionUid }: LiveSessionProps) {
  const {
    isRecording,
    error,
    startRecording,
    stopRecording,
    onStreamReady,
  } = useLiveSession({ sessionUid });
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [shareButtonText, setShareButtonText] = useState<string>(WHITEBOARD_STRINGS.SHARE_SESSION);
  const streamReadyRef = useRef(onStreamReady);

  function getCurrentRecordingTime(): number {
    if (!recordingStartTime) {
      return 0;
    }
    return Math.floor((Date.now() - recordingStartTime) / MILLISECONDS_PER_SECOND);
  }

  const whiteboardUrl = useMemo(
    () => `${window.location.origin}${ROUTES.WHITEBOARD(sessionUid)}`,
    [sessionUid]
  );

  const handleShareSession = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(whiteboardUrl);
      setShareButtonText(WHITEBOARD_STRINGS.LINK_COPIED);
      setTimeout(() => {
        setShareButtonText(WHITEBOARD_STRINGS.SHARE_SESSION);
      }, SHARE_BUTTON_RESET_DELAY_MS);
    } catch (err) {
      console.error('Failed to copy link to clipboard:', err);
    }
  }, [whiteboardUrl]);

  const renderTopRightUI = useCallback(
    (_isMobile: boolean, _appState: unknown) => {
    return (
      <WhiteboardControls
          error={error}
        isRecording={isRecording}
          onEndSession={stopRecording}
        onShareSession={handleShareSession}
          onStartRecording={startRecording}
        shareButtonText={shareButtonText}
      />
    );
    },
    [error, isRecording, stopRecording, handleShareSession, startRecording, shareButtonText]
  );

  function handleStreamReady(stream: MediaStream | null) {
    streamReadyRef.current(stream);
  }

  useEffect(() => {
    streamReadyRef.current = onStreamReady;
  }, [onStreamReady]);

  useEffect(() => {
    if (isRecording && !recordingStartTime) {
      setRecordingStartTime(Date.now());
    } else if (!isRecording) {
      setRecordingStartTime(null);
    }
  }, [isRecording, recordingStartTime]);

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
        onStreamReady={handleStreamReady}
        sessionUid={sessionUid}
      />
    </div>
  );
}

export default LiveSession;


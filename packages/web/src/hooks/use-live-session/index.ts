import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { bannerAtom } from '../../atoms/banner';
import useSession from '../use-session';
import useUpdateSession from '../use-update-session';
import useMockedRecording from '../use-mocked-recording';
import useEndSession from '../use-end-session';

interface UseLiveSessionOptions {
  sessionUid: string;
}

function useLiveSession({ sessionUid }: UseLiveSessionOptions) {
  const navigate = useNavigate();
  const setBannerState = useSetAtom(bannerAtom);
  const { session } = useSession(sessionUid);
  const { updateSession } = useUpdateSession(sessionUid);
  const { endSession } = useEndSession(sessionUid);
  const streamRef = useRef<MediaStream | null>(null);
  const { isRecording, startRecording, stopRecording, error: recordingError } = useMockedRecording({
    onError: handleRecordingError,
    onStart: handleRecordingStart,
    onStop: handleRecordingStop,
  });

  async function handleRecordingStart() {
    await updateSession({
      status: 'in-progress',
      startTime: new Date().toISOString(),
    });
  }

  async function handleRecordingStop(blob: Blob | null) {
    if (!blob) {
      return;
    }

    setBannerState({
      type: 'processing',
      sessionUid,
      sessionName: session?.name,
    });

    navigate(ROUTES.HOME);

    try {
      await endSession(blob);

      // TODO: I either need to add polling or more ideally an event listener as the real process would make this time out
      setBannerState({
        type: 'completed',
        sessionUid,
        sessionName: session?.name,
      });
    } catch (err) {
      console.error('Failed to end session:', err);
      setBannerState({ type: 'hidden' });
    }
  }

  function handleRecordingError(err: Error) {
    console.error('Recording error:', err);
  }

  function handleStreamReady(stream: MediaStream | null) {
    streamRef.current = stream;
  }

  async function handleStartRecording() {
    if (isRecording) {
      return;
    }
    try {
      await startRecording();
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }

  async function handleEndSession() {
    if (!isRecording) {
      return;
    }
    try {
      await stopRecording();
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  }

  useEffect(() => {
    function handleBeforeUnload() {
      if (isRecording && sessionUid) {
        stopRecording();
        updateSession({
          status: 'processing',
          endTime: new Date().toISOString(),
        });
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRecording, sessionUid, stopRecording, updateSession]);

  return {
    isRecording,
    recordingError,
    handleStartRecording,
    handleEndSession,
    handleStreamReady,
  };
}

export default useLiveSession;


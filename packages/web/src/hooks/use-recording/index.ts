import { useCallback, useEffect, useRef, useState } from 'react';
import { MEDIA_RECORDER_TIMESLICE_MS } from '../../constants/timing';

interface UseRecordingOptions {
  onStart?: () => void;
  onStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

interface UseRecordingResult {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  error: Error | null;
}

function useRecording({ onStart, onStop, onError }: UseRecordingOptions = {}): UseRecordingResult {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const isIntentionalStopRef = useRef(false);

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
        resolve(null);
        return;
      }

      const recorder = mediaRecorderRef.current;
      isIntentionalStopRef.current = true;

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        setIsRecording(false);
        onStop?.(blob);
        resolve(blob);
      };

      recorder.stop();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      mediaRecorderRef.current = null;
    });
  }, [onStop]);

  const startRecording = useCallback(async () => {
    if (isRecording || mediaRecorderRef.current) {
      return;
    }

    try {
      setError(null);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();

      if (videoTracks.length === 0 && audioTracks.length === 0) {
        throw new Error('No media tracks available');
      }

      const hasActiveTracks = [...videoTracks, ...audioTracks].some((track) => track.readyState === 'live');
      if (!hasActiveTracks) {
        throw new Error('No active media tracks');
      }

      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : MediaRecorder.isTypeSupported('video/mp4')
            ? 'video/mp4'
            : '';

      if (!mimeType) {
        throw new Error('No supported mime type for MediaRecorder');
      }

      const recorder = new MediaRecorder(stream, {
        mimeType,
      });

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        const error = new Error('Recording error occurred');
        setError(error);
        setIsRecording(false);
        onError?.(error);
      };

      isIntentionalStopRef.current = false;
      recorder.onstop = () => {
        if (!isIntentionalStopRef.current) {
          const error = new Error('Recording stopped unexpectedly');
          setError(error);
          setIsRecording(false);
          onError?.(error);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(MEDIA_RECORDER_TIMESLICE_MS);
      setIsRecording(true);
      onStart?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start recording');
      setError(error);
      setIsRecording(false);
      onError?.(error);
      throw error;
    }
  }, [isRecording, onStart, onError]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    error,
  };
}

export default useRecording;

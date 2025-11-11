import { useCallback, useEffect, useRef, useState } from 'react';
import { MEDIA_RECORDER_TIMESLICE_MS } from '../../constants/timing';

interface UseScreenRecordingOptions {
  onStart?: () => void;
  onStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  /**
   * Whether to include system audio in the recording
   * Note: Browser support varies, and user must grant permission
   */
  includeSystemAudio?: boolean;
}

interface UseScreenRecordingResult {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  error: Error | null;
}

/**
 * Hook for recording the screen/window using getDisplayMedia API
 * 
 * This allows users to record:
 * - Entire screen
 * - Specific window
 * - Browser tab
 * 
 * The user will be prompted to select what they want to share.
 */
function useScreenRecording({
  onStart,
  onStop,
  onError,
  includeSystemAudio = false,
}: UseScreenRecordingOptions = {}): UseScreenRecordingResult {
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
      chunksRef.current = [];
    });
  }, [onStop]);

  const startRecording = useCallback(async () => {
    if (isRecording || mediaRecorderRef.current) {
      return;
    }

    try {
      setError(null);

      // Request screen/window capture
      // The user will see a browser dialog to select what to share
      // selfBrowserSurface: "include" makes the current tab appear in the selection dialog
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          selfBrowserSurface: 'include', // Include current tab in the selection dialog
        } as MediaTrackConstraints,
        audio: includeSystemAudio, // System audio capture (varies by browser)
      });

      // Check if we got a video track
      const videoTracks = displayStream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error('No video track available from screen capture');
      }

      // Optional: Add microphone audio to the recording
      // This combines screen capture with user's microphone
      const combinedStream = displayStream;
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        
        // Combine video from screen with audio from microphone
        const audioTracks = audioStream.getAudioTracks();
        audioTracks.forEach((track) => {
          combinedStream.addTrack(track);
        });
      } catch (audioError) {
        // If microphone access fails, continue with screen-only recording
        console.warn('Could not access microphone, recording screen only:', audioError);
      }

      streamRef.current = combinedStream;

      // Determine best mime type
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

      const recorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: 2500000, // 2.5 Mbps for good quality
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

      // Handle user stopping the screen share from the browser UI
      displayStream.getVideoTracks()[0].addEventListener('ended', () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          isIntentionalStopRef.current = true;
          mediaRecorderRef.current.stop();
        }
      });

      mediaRecorderRef.current = recorder;
      recorder.start(MEDIA_RECORDER_TIMESLICE_MS);
      setIsRecording(true);
      onStart?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start screen recording');
      setError(error);
      setIsRecording(false);
      onError?.(error);
      throw error;
    }
  }, [isRecording, onStart, onError, includeSystemAudio, stopRecording]);

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

export default useScreenRecording;


import { useCallback, useState } from 'react';

interface UseMockedRecordingOptions {
  onStart?: () => void;
  onStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

interface UseMockedRecordingResult {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  error: Error | null;
}

function useMockedRecording({
  onStart,
  onStop,
  onError,
}: UseMockedRecordingOptions = {}): UseMockedRecordingResult {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startRecording = useCallback(async () => {
    if (isRecording) {
      return;
    }

    try {
      setError(null);
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

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    if (!isRecording) {
      return null;
    }

    try {
      setIsRecording(false);

      // Create a mock blob (empty blob for now)
      const mockBlob = new Blob([], { type: 'video/webm' });
      onStop?.(mockBlob);

      return mockBlob;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to stop recording');
      setError(error);
      setIsRecording(false);
      onError?.(error);
      return null;
    }
  }, [isRecording, onStop, onError]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    error,
  };
}

export default useMockedRecording;


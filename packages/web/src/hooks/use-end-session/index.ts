import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetchFormData } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Session } from '../../types';

async function endSession(sessionUid: string, recordingBlob: Blob | null): Promise<Session> {
  const formData = new FormData();
  // Send the blob (even if empty) - backend will handle it and use mock URL if needed
  if (recordingBlob) {
    formData.append('recording', recordingBlob, 'recording.webm');
  }

  return apiFetchFormData<Session>(`/api/sessions/${sessionUid}/end`, formData);
}

function useEndSession(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (recordingBlob: Blob | null) => endSession(sessionUid, recordingBlob),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  return {
    endSession: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useEndSession;


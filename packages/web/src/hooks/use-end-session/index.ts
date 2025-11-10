import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetchFormData } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Session } from '../../types';

async function endSession(sessionUid: string, recordingBlob: Blob): Promise<Session> {
  const formData = new FormData();
  formData.append('recording', recordingBlob, 'recording.webm');

  return apiFetchFormData<Session>(`/api/sessions/${sessionUid}/end`, formData);
}

function useEndSession(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (recordingBlob: Blob) => endSession(sessionUid, recordingBlob),
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


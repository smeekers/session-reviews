import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Session } from '../../types';
import type { UpdateSessionRequest } from '../../types/api';

async function updateSession(sessionUid: string, data: UpdateSessionRequest): Promise<Session> {
  return apiFetch<Session>(`/api/sessions/${sessionUid}`, {
    method: 'PUT',
    body: data,
  });
}

function useUpdateSession(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateSessionRequest) => updateSession(sessionUid, data),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  return {
    updateSession: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useUpdateSession;


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Session } from '../../types';
import type { CreateSessionRequest } from '../../types/api';

async function createSession(data: CreateSessionRequest): Promise<Session> {
  return apiFetch<Session>('/api/sessions', {
    method: 'POST',
    body: {
      name: data.name,
    },
  });
}

function useCreateSession() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      invalidateSessionQueries(queryClient);
    },
  });

  return {
    createSession: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useCreateSession;


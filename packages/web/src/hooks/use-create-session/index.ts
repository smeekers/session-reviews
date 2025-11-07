import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Session } from '../../types';

interface CreateSessionRequest {
  name?: string;
}

async function createSession(data: CreateSessionRequest): Promise<Session> {
  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create session: ${response.statusText}`);
  }

  return response.json();
}

function useCreateSession() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      // Invalidate and refetch sessions list
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  return {
    createSession: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useCreateSession;


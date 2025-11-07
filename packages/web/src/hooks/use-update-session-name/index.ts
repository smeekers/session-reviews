import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Session } from '../../types';

async function updateSessionName(sessionUid: string, name: string | undefined): Promise<Session> {
  const response = await fetch(`/api/sessions/${sessionUid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: name || undefined }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update session name: ${response.statusText}`);
  }

  return response.json();
}

function useUpdateSessionName(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (name: string | undefined) => updateSessionName(sessionUid, name),
    onSuccess: () => {
      // Invalidate both the single session and the sessions list
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  return {
    updateSessionName: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useUpdateSessionName;


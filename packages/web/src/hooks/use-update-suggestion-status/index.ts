import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AISuggestion, AISuggestionStatus } from '../../types';

interface UpdateSuggestionStatusRequest {
  status: AISuggestionStatus;
}

async function updateSuggestionStatus(
  sessionUid: string,
  suggestionId: string,
  data: UpdateSuggestionStatusRequest
): Promise<AISuggestion> {
  const response = await fetch(`/api/sessions/${sessionUid}/ai-suggestions/${suggestionId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update suggestion status: ${response.statusText}`);
  }

  return response.json();
}

function useUpdateSuggestionStatus(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ suggestionId, status }: { suggestionId: string; status: AISuggestionStatus }) =>
      updateSuggestionStatus(sessionUid, suggestionId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  return {
    updateSuggestionStatus: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useUpdateSuggestionStatus;


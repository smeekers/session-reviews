import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { AISuggestion, AISuggestionStatus } from '../../types';
import type { UpdateSuggestionStatusRequest } from '../../types/api';

async function updateSuggestionStatus(
  sessionUid: string,
  suggestionId: string,
  data: UpdateSuggestionStatusRequest
): Promise<AISuggestion> {
  return apiFetch<AISuggestion>(`/api/sessions/${sessionUid}/ai-suggestions/${suggestionId}/status`, {
    method: 'PUT',
    body: data,
  });
}

function useUpdateSuggestionStatus(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ suggestionId, status }: { suggestionId: string; status: AISuggestionStatus }) =>
      updateSuggestionStatus(sessionUid, suggestionId, { status }),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  return {
    updateSuggestionStatus: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useUpdateSuggestionStatus;


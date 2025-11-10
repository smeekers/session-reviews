import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Session } from '../../types';

interface UpdateAIFeedbackRequest {
  feedback: 0 | 1;
}

async function updateSummaryFeedback(sessionUid: string, data: UpdateAIFeedbackRequest): Promise<Session> {
  return apiFetch<Session>(`/api/sessions/${sessionUid}/ai-summary-feedback`, {
    method: 'PUT',
    body: data,
  });
}

async function updateSuggestionsFeedback(sessionUid: string, data: UpdateAIFeedbackRequest): Promise<Session> {
  return apiFetch<Session>(`/api/sessions/${sessionUid}/ai-suggestions-feedback`, {
    method: 'PUT',
    body: data,
  });
}

function useUpdateAIFeedback(sessionUid: string) {
  const queryClient = useQueryClient();

  const summaryMutation = useMutation({
    mutationFn: (feedback: 0 | 1) => updateSummaryFeedback(sessionUid, { feedback }),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  const suggestionsMutation = useMutation({
    mutationFn: (feedback: 0 | 1) => updateSuggestionsFeedback(sessionUid, { feedback }),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  return {
    updateSummaryFeedback: summaryMutation.mutateAsync,
    updateSuggestionsFeedback: suggestionsMutation.mutateAsync,
    isLoading: summaryMutation.isPending || suggestionsMutation.isPending,
    error: summaryMutation.error instanceof Error ? summaryMutation.error : suggestionsMutation.error instanceof Error ? suggestionsMutation.error : null,
  };
}

export default useUpdateAIFeedback;

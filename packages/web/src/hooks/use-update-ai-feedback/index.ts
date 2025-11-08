import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Session } from '../../types';

interface UpdateAIFeedbackRequest {
  feedback: 0 | 1;
}

async function updateSummaryFeedback(sessionUid: string, data: UpdateAIFeedbackRequest): Promise<Session> {
  const response = await fetch(`/api/sessions/${sessionUid}/ai-summary-feedback`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update summary feedback: ${response.statusText}`);
  }

  return response.json();
}

async function updateSuggestionsFeedback(sessionUid: string, data: UpdateAIFeedbackRequest): Promise<Session> {
  const response = await fetch(`/api/sessions/${sessionUid}/ai-suggestions-feedback`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update suggestions feedback: ${response.statusText}`);
  }

  return response.json();
}

function useUpdateAIFeedback(sessionUid: string) {
  const queryClient = useQueryClient();

  const summaryMutation = useMutation({
    mutationFn: (feedback: 0 | 1) => updateSummaryFeedback(sessionUid, { feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const suggestionsMutation = useMutation({
    mutationFn: (feedback: 0 | 1) => updateSuggestionsFeedback(sessionUid, { feedback }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Session } from '../../types';

async function updateAISummaryFeedback(
  sessionUid: string,
  feedback: 0 | 1
): Promise<Session> {
  const response = await fetch(`/api/sessions/${sessionUid}/ai-summary-feedback`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ feedback }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update AI summary feedback: ${response.statusText}`);
  }

  return response.json();
}

async function updateAISuggestionFeedback(
  sessionUid: string,
  suggestionId: string,
  feedback: 0 | 1
): Promise<Session> {
  const response = await fetch(
    `/api/sessions/${sessionUid}/ai-suggestions/${suggestionId}/feedback`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update AI suggestion feedback: ${response.statusText}`);
  }

  return response.json();
}

function useUpdateAIFeedback(sessionUid: string) {
  const queryClient = useQueryClient();

  const summaryMutation = useMutation({
    mutationFn: (feedback: 0 | 1) => updateAISummaryFeedback(sessionUid, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
    },
  });

  const suggestionMutation = useMutation({
    mutationFn: ({ suggestionId, feedback }: { suggestionId: string; feedback: 0 | 1 }) =>
      updateAISuggestionFeedback(sessionUid, suggestionId, feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
    },
  });

  return {
    updateSummaryFeedback: summaryMutation.mutateAsync,
    updateSuggestionFeedback: suggestionMutation.mutateAsync,
    isLoading: summaryMutation.isPending || suggestionMutation.isPending,
    error:
      summaryMutation.error instanceof Error
        ? summaryMutation.error
        : suggestionMutation.error instanceof Error
          ? suggestionMutation.error
          : null,
  };
}

export default useUpdateAIFeedback;


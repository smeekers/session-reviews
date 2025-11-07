import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Bookmark } from '../../types';

interface AddBookmarkRequest {
  timestamp: number;
  note?: string;
}

async function addBookmark(sessionUid: string, data: AddBookmarkRequest): Promise<Bookmark> {
  const response = await fetch(`/api/sessions/${sessionUid}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp: data.timestamp,
      note: data.note,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add bookmark: ${response.statusText}`);
  }

  return response.json();
}

function useAddBookmark(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddBookmarkRequest) => addBookmark(sessionUid, data),
    onSuccess: () => {
      // Invalidate and refetch session
      queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
    },
  });

  return {
    addBookmark: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useAddBookmark;


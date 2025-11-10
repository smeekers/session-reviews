import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import { invalidateSessionQueries } from '../../helpers/query-client';
import type { Bookmark } from '../../types';
import type { AddBookmarkRequest } from '../../types/api';

async function addBookmark(sessionUid: string, data: AddBookmarkRequest): Promise<Bookmark> {
  return apiFetch<Bookmark>(`/api/sessions/${sessionUid}/bookmarks`, {
    method: 'POST',
    body: {
      timestamp: data.timestamp,
      note: data.note,
    },
  });
}

function useAddBookmark(sessionUid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddBookmarkRequest) => addBookmark(sessionUid, data),
    onSuccess: () => {
      invalidateSessionQueries(queryClient, sessionUid);
    },
  });

  return {
    addBookmark: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error : null,
  };
}

export default useAddBookmark;


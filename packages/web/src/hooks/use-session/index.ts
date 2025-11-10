import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import type { Session } from '../../types';

async function fetchSession(sessionUid: string): Promise<Session> {
  return apiFetch<Session>(`/api/sessions/${sessionUid}`);
}

function useSession(sessionUid: string) {
  const { data: session, isLoading: loading, error, refetch } = useQuery({
    queryKey: ['session', sessionUid],
    queryFn: () => fetchSession(sessionUid),
    enabled: !!sessionUid,
  });

  return {
    session,
    loading,
    error: error instanceof Error ? error : null,
    refetch,
  };
}

export default useSession;


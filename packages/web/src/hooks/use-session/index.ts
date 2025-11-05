import { useQuery } from '@tanstack/react-query';
import type { Session } from '../../types';

async function fetchSession(sessionUid: string): Promise<Session> {
  const response = await fetch(`/api/sessions/${sessionUid}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch session: ${response.statusText}`);
  }
  return response.json();
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


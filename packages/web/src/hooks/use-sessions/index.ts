import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../helpers/api';
import type { Session } from '../../types';

async function fetchSessions(): Promise<Session[]> {
  return apiFetch<Session[]>('/api/sessions');
}

function useSessions() {
  const { data: sessions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });

  return {
    sessions,
    isLoading,
    error: error instanceof Error ? error : null,
    refetch,
  };
}

export default useSessions;


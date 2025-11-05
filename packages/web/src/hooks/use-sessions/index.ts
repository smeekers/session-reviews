import { useQuery } from '@tanstack/react-query';
import type { Session } from '../../types';

async function fetchSessions(): Promise<Session[]> {
  const response = await fetch('/api/sessions');
  if (!response.ok) {
    throw new Error(`Failed to fetch sessions: ${response.statusText}`);
  }
  return response.json();
}

function useSessions() {
  const { data: sessions = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
  });

  return {
    sessions,
    loading,
    error: error instanceof Error ? error : null,
    refetch,
  };
}

export default useSessions;


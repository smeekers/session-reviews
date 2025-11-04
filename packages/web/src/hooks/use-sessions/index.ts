import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useCallback, useEffect } from 'react';
import type { Session } from '../../types';

const sessionsAtom = atom<Session[]>([]);
const loadingAtom = atom<boolean>(false);
const errorAtom = atom<Error | null>(null);

export function useSessions() {
  const [sessions, setSessions] = useAtom(sessionsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sessions');
      if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.statusText}`);
      }
      const data = await response.json();
      setSessions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [setSessions, setLoading, setError]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
  };
}


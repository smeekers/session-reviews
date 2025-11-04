import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { sessionCacheAtom } from '../../atoms';

function useSession(sessionUid: string) {
  const [sessionCache, setSessionCache] = useAtom(sessionCacheAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const session = sessionCache.get(sessionUid);

  const fetchSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/sessions/${sessionUid}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }
      const data = await response.json();
      setSessionCache((prev) => {
        const next = new Map(prev);
        next.set(sessionUid, data);
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [sessionUid, setSessionCache]);

  useEffect(() => {
    if (!session || session.uid !== sessionUid) {
      fetchSession();
    }
  }, [sessionUid, session, fetchSession]);

  return {
    session,
    loading,
    error,
    refetch: fetchSession,
  };
}

export default useSession;


import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { useCallback, useEffect } from 'react';
import type { Session } from '../../types';

const sessionAtomMap = atom<Map<string, Session>>(new Map());
const loadingAtomMap = atom<Map<string, boolean>>(new Map());
const errorAtomMap = atom<Map<string, Error | null>>(new Map());

export function useSession(sessionUid: string) {
  const [sessionMap, setSessionMap] = useAtom(sessionAtomMap);
  const [loadingMap, setLoadingMap] = useAtom(loadingAtomMap);
  const [errorMap, setErrorMap] = useAtom(errorAtomMap);

  const session = sessionMap.get(sessionUid);
  const loading = loadingMap.get(sessionUid) ?? false;
  const error = errorMap.get(sessionUid) ?? null;

  const fetchSession = useCallback(async () => {
    setLoadingMap((prev) => {
      const next = new Map(prev);
      next.set(sessionUid, true);
      return next;
    });
    setErrorMap((prev) => {
      const next = new Map(prev);
      next.set(sessionUid, null);
      return next;
    });

    try {
      const response = await fetch(`/api/sessions/${sessionUid}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch session: ${response.statusText}`);
      }
      const data = await response.json();
      setSessionMap((prev) => {
        const next = new Map(prev);
        next.set(sessionUid, data);
        return next;
      });
    } catch (err) {
      setErrorMap((prev) => {
        const next = new Map(prev);
        next.set(sessionUid, err instanceof Error ? err : new Error('Unknown error'));
        return next;
      });
    } finally {
      setLoadingMap((prev) => {
        const next = new Map(prev);
        next.set(sessionUid, false);
        return next;
      });
    }
  }, [sessionUid, setSessionMap, setLoadingMap, setErrorMap]);

  useEffect(() => {
    if (!session) {
      fetchSession();
    }
  }, [session, fetchSession]);

  return {
    session,
    loading,
    error,
    refetch: fetchSession,
  };
}


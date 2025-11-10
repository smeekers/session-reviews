import { useMemo } from 'react';
import SessionBanner from '../session-banner';
import ActiveSessions from './components/active-sessions';
import PastSessions from './components/past-sessions';
import SessionFilters from './components/session-filters';
import type { Session } from '../../types';

interface SessionsHubProps {
  sessions: Session[];
}

function SessionsHub({ sessions }: SessionsHubProps) {
  const { activeSessions, pastSessions } = useMemo(() => {
    const active: Session[] = [];
    const past: Session[] = [];

    sessions.forEach((session) => {
      if (session.status === 'ready' || session.status === 'in-progress') {
        active.push(session);
      } else {
        past.push(session);
      }
    });

    return { activeSessions: active, pastSessions: past };
  }, [sessions]);

  return (
    <>
      <SessionBanner />
      <SessionFilters />
      <ActiveSessions sessions={activeSessions} />
      <PastSessions sessions={pastSessions} />
    </>
  );
}

export default SessionsHub;


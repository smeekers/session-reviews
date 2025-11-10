import { useMemo } from 'react';
import ActiveSessions from '../active-sessions';
import PastSessions from '../past-sessions';
import SessionBanner from '../session-banner';
import SessionFilters from '../session-filters';
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


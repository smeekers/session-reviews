import { useMemo } from 'react';
import { useAtom } from 'jotai';
import { Stack, Typography } from '../../ui-library';
import { statusFilterAtom } from '../../atoms/filters';
import SessionCard from '../session-card';
import type { Session } from '../../types';

interface SessionListProps {
  sessions: Session[];
}

function SessionList({ sessions }: SessionListProps) {
  const [statusFilter] = useAtom(statusFilterAtom);

  const filteredSessions = useMemo(
    () => sessions.filter((session) => statusFilter[session.status] === true),
    [sessions, statusFilter]
  );

  if (filteredSessions.length === 0) {
    return (
      <Typography color="text.secondary">No sessions found.</Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {filteredSessions.map((session) => (
        <SessionCard key={session.uid} session={session} />
      ))}
    </Stack>
  );
}

export default SessionList;


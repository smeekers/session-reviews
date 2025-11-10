import { useState } from 'react';
import { SESSION_STRINGS } from '../../../../constants';
import SessionList from '../../../session-list';
import SessionSection from '../../../session-section';
import type { Session } from '../../../../types';

interface PastSessionsProps {
  sessions: Session[];
}

function PastSessions({ sessions }: PastSessionsProps) {
  const [expanded, setExpanded] = useState(true);

  function handleToggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <SessionSection expanded={expanded} onToggle={handleToggle} title={SESSION_STRINGS.PAST_SESSIONS} variant="past">
      <SessionList sessions={sessions} />
    </SessionSection>
  );
}

export default PastSessions;


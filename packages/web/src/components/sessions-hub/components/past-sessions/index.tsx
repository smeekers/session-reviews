import { useState } from 'react';
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
    <SessionSection expanded={expanded} onToggle={handleToggle} title="Past Sessions" variant="past">
      <SessionList sessions={sessions} />
    </SessionSection>
  );
}

export default PastSessions;


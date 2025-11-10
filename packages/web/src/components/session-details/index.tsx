import { useEffect, useMemo } from 'react';
import { format, formatDistanceStrict } from 'date-fns';
import { Stack, Typography } from '../../ui-library';
import { useUpdateAIFeedback, useUpdateSession, useUpdateSuggestionStatus } from '../../hooks';
import EditableSessionTitle from './components/editable-session-title';
import SessionDetailsSummary from './components/session-details-summary';
import SessionDetailsAISuggestions from './components/session-details-ai-suggestions';
import SessionDetailsRecording from './components/session-details-recording';
import SessionDetailsWhiteboard from './components/session-details-whiteboard';
import type { Session } from '../../types';

interface SessionDetailsProps {
  session: Session;
}

function SessionDetails({ session }: SessionDetailsProps) {
  const { updateSummaryFeedback, updateSuggestionsFeedback } = useUpdateAIFeedback(session.uid);
  const { updateSuggestionStatus } = useUpdateSuggestionStatus(session.uid);
  const { updateSession } = useUpdateSession(session.uid);
  const sessionDuration = useMemo(() => {
    if (session?.startTime && session?.endTime) {
      return formatDistanceStrict(new Date(session.startTime), new Date(session.endTime), {
        unit: 'minute',
      });
    }
    return null;
  }, [session]);

  async function handleSummaryFeedbackChange(feedback: 0 | 1) {
    try {
      await updateSummaryFeedback(feedback);
    } catch (err) {
      console.error('Failed to update summary feedback:', err);
    }
  }

  async function handleSuggestionStatusChange(suggestionId: string, status: 'done' | 'dismissed') {
    try {
      await updateSuggestionStatus({ suggestionId, status });
    } catch (err) {
      console.error('Failed to update suggestion status:', err);
    }
  }

  async function handleSuggestionsFeedbackChange(feedback: 0 | 1) {
    try {
      await updateSuggestionsFeedback(feedback);
    } catch (err) {
      console.error('Failed to update suggestions feedback:', err);
    }
  }

  async function handleSessionNameSave(name: string | undefined) {
    await updateSession({ name });
  }

  useEffect(() => {
    if (session.status === 'completed') {
      updateSession({ status: 'reviewed' }).catch((err) => {
        console.error('Failed to update session status to reviewed:', err);
      });
    }
  }, [session.status, session.uid, updateSession]);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <EditableSessionTitle
          name={session.name}
          onSave={handleSessionNameSave}
          placeholder="Add a title..."
        />
        {session.startTime && (
          <Typography color="text.secondary" variant="body2">
            {format(new Date(session.startTime), 'MMM dd, yyyy • h:mmaaa')}
            {sessionDuration && ` • ${sessionDuration}`}
          </Typography>
        )}
      </Stack>

      <SessionDetailsSummary
        aiSummary={session.aiSummary}
        aiSummaryFeedback={session.aiSummaryFeedback}
        onFeedbackChange={handleSummaryFeedbackChange}
      />

      <SessionDetailsAISuggestions
        aiSummary={session.aiSummary}
        aiSuggestions={session.aiSuggestions}
        aiSuggestionsFeedback={session.aiSuggestionsFeedback}
        onFeedbackChange={handleSuggestionsFeedbackChange}
        onSuggestionStatusChange={handleSuggestionStatusChange}
      />

      <SessionDetailsRecording
        bookmarks={session.bookmarks}
        sessionUid={session.uid}
        videoUrl={session.videoUrl}
      />

      <SessionDetailsWhiteboard sessionUid={session.uid} />
    </Stack>
  );
}

export default SessionDetails;

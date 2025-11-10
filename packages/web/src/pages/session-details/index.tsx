import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, formatDistanceStrict } from 'date-fns';
import { ChevronRight } from '@mui/icons-material';
import { Container, Stack, Typography, Breadcrumbs, Link } from '../../ui-library';
import EditableSessionTitle from '../../components/editable-session-title';
import SessionDetailsSummary from '../../components/session-details-summary';
import SessionDetailsAISuggestions from '../../components/session-details-ai-suggestions';
import SessionDetailsRecording from '../../components/session-details-recording';
import SessionDetailsWhiteboard from '../../components/session-details-whiteboard';
import Loading from '../../components/loading';
import { ROUTES } from '../../constants';
import { useSession, useUpdateAIFeedback, useUpdateSession, useUpdateSuggestionStatus } from '../../hooks';
import * as styles from './index.css';

function SessionDetails() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  const navigate = useNavigate();
  const { session, loading, error } = useSession(sessionUid || '');
  const { updateSummaryFeedback, updateSuggestionsFeedback } = useUpdateAIFeedback(sessionUid || '');
  const { updateSuggestionStatus } = useUpdateSuggestionStatus(sessionUid || '');
  const { updateSession } = useUpdateSession(sessionUid || '');

  const sessionDuration = useMemo(() => {
    if (session?.startTime && session?.endTime) {
      return formatDistanceStrict(new Date(session.startTime), new Date(session.endTime), {
        unit: 'minute',
      });
    }
    return null;
  }, [session]);

  function handleBackClick() {
    navigate(ROUTES.HOME);
  }

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

  if (loading) {
    return <Loading message="Loading session..." />;
  }

  if (error || !session) {
    return (
      <Container className={styles.container} maxWidth="lg">
        <Typography color="error">
          {error ? `Error loading session: ${error.message}` : 'Session not found'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container className={styles.container} maxWidth="lg">
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight fontSize="small" />}>
            <Link
              component="button"
              onClick={handleBackClick}
              underline="hover"
              variant="body2"
            >
              Sessions
            </Link>
            <Typography color="text.primary" variant="body2">
              Session Details
            </Typography>
          </Breadcrumbs>

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
        </Stack>

        <SessionDetailsSummary
          aiSummary={session.aiSummary}
          aiSummaryFeedback={session.aiSummaryFeedback}
          onFeedbackChange={handleSummaryFeedbackChange}
        />

          <SessionDetailsAISuggestions
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
    </Container>
  );
}

export default SessionDetails;

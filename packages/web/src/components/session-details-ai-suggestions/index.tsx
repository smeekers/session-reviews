import { Stack, Typography, Button, Paper } from '../../ui-library';
import AIFeedbackControls from '../ai-feedback-controls';
import type { AISuggestion } from '../../types';
import * as styles from './index.css';

interface SessionDetailsAISuggestionsProps {
  aiSuggestions?: AISuggestion[];
  aiSuggestionsFeedback?: 0 | 1;
  onSuggestionStatusChange?: (suggestionId: string, status: 'done' | 'dismissed') => void;
  onFeedbackChange?: (feedback: 0 | 1) => void;
}

function SessionDetailsAISuggestions({
  aiSuggestions,
  aiSuggestionsFeedback,
  onSuggestionStatusChange,
  onFeedbackChange,
}: SessionDetailsAISuggestionsProps) {
  const visibleSuggestions = aiSuggestions?.filter((s) => s.status !== 'dismissed') ?? [];
  const doneSuggestions = aiSuggestions?.filter((s) => s.status === 'done') ?? [];
  const pendingSuggestions = aiSuggestions?.filter((s) => s.status === 'pending') ?? [];

  function handleMarkDone(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'done');
  }

  function handleDismiss(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'dismissed');
  }

  if (!aiSuggestions || aiSuggestions.length === 0) {
    return null;
  }

  if (visibleSuggestions.length === 0) {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">AI Suggestions</Typography>
        <Typography color="text.secondary" variant="body2">
          Actionable recommendations based on your session.
        </Typography>
      </Stack>

      <div className={styles.suggestionsContainer}>
        <Stack spacing={2}>
          {pendingSuggestions.map((suggestion) => (
            <Paper key={suggestion.id} className={styles.suggestionCard}>
              <Stack spacing={2}>
                <Typography variant="body2">{suggestion.content}</Typography>
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    onClick={() => handleMarkDone(suggestion.id)}
                    size="small"
                    variant="outlined"
                  >
                    Mark Complete
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDismiss(suggestion.id)}
                    size="small"
                    variant="outlined"
                  >
                    Dismiss
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ))}

          {doneSuggestions.length > 0 && (
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="body2">
                Completed ({doneSuggestions.length})
              </Typography>
              {doneSuggestions.map((suggestion) => (
                <Paper key={suggestion.id} className={styles.completedSuggestionCard}>
                  <Typography
                    className={styles.completedText}
                    variant="body2"
                  >
                    {suggestion.content}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>
      </div>

      {onFeedbackChange && (
        <Stack spacing={1}>
          <Typography color="text.secondary" variant="body2">
            Was this list helpful?
          </Typography>
          <AIFeedbackControls
            feedback={aiSuggestionsFeedback}
            onFeedbackChange={onFeedbackChange}
          />
        </Stack>
      )}
    </Stack>
  );
}

export default SessionDetailsAISuggestions;

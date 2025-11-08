import { CheckCircle, Close } from '@mui/icons-material';
import { IconButton, Stack, Typography, UiCard, UiCardContent } from '../../ui-library';
import AIFeedbackControls from '../ai-feedback-controls';
import type { AISuggestion } from '../../types';

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
  if (!aiSuggestions || aiSuggestions.length === 0) {
    return null;
  }

  const visibleSuggestions = aiSuggestions.filter((s) => s.status !== 'dismissed');
  const doneSuggestions = aiSuggestions.filter((s) => s.status === 'done');
  const pendingSuggestions = aiSuggestions.filter((s) => s.status === 'pending');

  if (visibleSuggestions.length === 0) {
    return null;
  }

  function handleMarkDone(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'done');
  }

  function handleDismiss(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'dismissed');
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">AI Suggestions</Typography>
        <Typography color="text.secondary" variant="body2">
          Actionable recommendations based on your session.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {pendingSuggestions.map((suggestion) => (
          <UiCard key={suggestion.id}>
            <UiCardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Stack flex={1} spacing={1}>
                  <Typography variant="body2">{suggestion.content}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="Mark as done"
                    color="success"
                    onClick={() => handleMarkDone(suggestion.id)}
                    size="small"
                  >
                    <CheckCircle />
                  </IconButton>
                  <IconButton
                    aria-label="Dismiss"
                    color="error"
                    onClick={() => handleDismiss(suggestion.id)}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                </Stack>
              </Stack>
            </UiCardContent>
          </UiCard>
        ))}

        {doneSuggestions.length > 0 && (
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="body2">
              Completed ({doneSuggestions.length})
            </Typography>
            {doneSuggestions.map((suggestion) => (
              <UiCard key={suggestion.id}>
                <UiCardContent>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Stack flex={1} spacing={1}>
                      <Typography
                        style={{ textDecoration: 'line-through', opacity: 0.6 }}
                        variant="body2"
                      >
                        {suggestion.content}
                      </Typography>
                    </Stack>
                    <IconButton aria-label="Mark as done" color="success" disabled size="small">
                      <CheckCircle />
                    </IconButton>
                  </Stack>
                </UiCardContent>
              </UiCard>
            ))}
          </Stack>
        )}
      </Stack>

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

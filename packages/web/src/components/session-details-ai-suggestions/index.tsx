import { Stack, Typography, UiCard, UiCardContent } from '../../ui-library';
import AIFeedbackControls from '../ai-feedback-controls';
import type { AISuggestion } from '../../types';

interface SessionDetailsAISuggestionsProps {
  aiSuggestions?: AISuggestion[];
  onSuggestionFeedbackChange?: (suggestionId: string, feedback: 0 | 1) => void;
}

function SessionDetailsAISuggestions({
  aiSuggestions,
  onSuggestionFeedbackChange,
}: SessionDetailsAISuggestionsProps) {
  if (!aiSuggestions || aiSuggestions.length === 0) {
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

      <Stack spacing={2}>
        {aiSuggestions.map((suggestion) => (
          <UiCard key={suggestion.id}>
            <UiCardContent>
              <Stack spacing={2}>
                <Typography variant="body2">{suggestion.content}</Typography>

                {onSuggestionFeedbackChange && (
                  <AIFeedbackControls
                    feedback={suggestion.feedback}
                    onFeedbackChange={(feedback) => onSuggestionFeedbackChange(suggestion.id, feedback)}
                  />
                )}
              </Stack>
            </UiCardContent>
          </UiCard>
        ))}
      </Stack>
    </Stack>
  );
}

export default SessionDetailsAISuggestions;


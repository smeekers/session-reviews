import { Stack, Typography } from '../../../../ui-library';
import AIFeedbackSection from '../../../../components/ai-feedback-section';
import SuggestionCard from '../../../../components/suggestion-card';
import type { AISuggestion, AISummaryComponent } from '../../../../types';
import * as styles from './index.css';

interface SessionDetailsAISuggestionsProps {
  aiSummary?: AISummaryComponent[];
  aiSuggestions?: AISuggestion[]; // For backward compatibility
  aiSuggestionsFeedback?: 0 | 1;
  onSuggestionStatusChange?: (suggestionId: string, status: 'done' | 'dismissed') => void;
  onFeedbackChange?: (feedback: 0 | 1) => void;
}

function SessionDetailsAISuggestions({
  aiSummary,
  aiSuggestions,
  aiSuggestionsFeedback,
  onSuggestionStatusChange,
  onFeedbackChange,
}: SessionDetailsAISuggestionsProps) {
  // Extract suggestions from summary (preferred) or use legacy aiSuggestions prop
  const suggestionsComponent = aiSummary?.find((c) => c.component_type === 'suggestions');
  const allSuggestions: AISuggestion[] = Array.isArray(suggestionsComponent?.content_details)
    ? (suggestionsComponent.content_details as AISuggestion[])
    : aiSuggestions ?? [];

  const visibleSuggestions = allSuggestions.filter((s) => s.status !== 'dismissed');
  const doneSuggestions = allSuggestions.filter((s) => s.status === 'done');
  const pendingSuggestions = allSuggestions.filter((s) => s.status === 'pending');

  function handleMarkDone(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'done');
  }

  function handleDismiss(suggestionId: string) {
    onSuggestionStatusChange?.(suggestionId, 'dismissed');
  }

  if (allSuggestions.length === 0) {
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
        {pendingSuggestions.length > 0 && (
          <div className={styles.cardsGrid}>
            {pendingSuggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                onDismiss={handleDismiss}
                onMarkComplete={handleMarkDone}
                suggestion={suggestion}
              />
            ))}
          </div>
        )}

        {doneSuggestions.length > 0 && (
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="body2">
              Completed ({doneSuggestions.length})
            </Typography>
            <div className={styles.cardsGrid}>
              {doneSuggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  isCompleted
                  suggestion={suggestion}
                />
              ))}
            </div>
          </Stack>
        )}
      </div>

      {onFeedbackChange && (
        <AIFeedbackSection
          feedback={aiSuggestionsFeedback}
          onFeedbackChange={onFeedbackChange}
          question="Was this list helpful?"
        />
      )}
    </Stack>
  );
}

export default SessionDetailsAISuggestions;

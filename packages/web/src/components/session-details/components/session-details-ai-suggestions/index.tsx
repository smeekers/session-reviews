import { useMemo } from 'react';
import { SESSION_STRINGS } from '../../../../constants';
import { Stack, Typography } from '../../../../ui-library';
import AIFeedbackSection from '../ai-feedback-section';
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
  const allSuggestions: AISuggestion[] = useMemo(() => {
    const suggestionsComponent = aiSummary?.find((c) => c.component_type === 'suggestions');
    return suggestionsComponent?.content_details ?? aiSuggestions ?? [];
  }, [aiSummary, aiSuggestions]);

  const visibleSuggestions = useMemo(
    () => allSuggestions.filter((s) => s.status !== 'dismissed'),
    [allSuggestions]
  );

  const doneSuggestions = useMemo(
    () => allSuggestions.filter((s) => s.status === 'done'),
    [allSuggestions]
  );

  const pendingSuggestions = useMemo(
    () => allSuggestions.filter((s) => s.status === 'pending'),
    [allSuggestions]
  );

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
        <Typography variant="h5">{SESSION_STRINGS.AI_SUGGESTIONS_TITLE}</Typography>
        <Typography color="text.secondary" variant="body2">
          {SESSION_STRINGS.AI_SUGGESTIONS_DESCRIPTION}
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
              {SESSION_STRINGS.COMPLETED} ({doneSuggestions.length})
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
          question={SESSION_STRINGS.WAS_THIS_LIST_HELPFUL}
        />
      )}
    </Stack>
  );
}

export default SessionDetailsAISuggestions;

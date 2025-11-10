import type { ReactElement } from 'react';

import { Lightbulb, TaskAlt, Feedback } from '@mui/icons-material';
import { SUGGESTION_STRINGS, SUGGESTION_TYPE_LABELS } from '../../constants';
import { Button, Chip, Stack, Typography, UiCard, UiCardActions, UiCardContent } from '../../ui-library';
import type { AISuggestion, AISuggestionType } from '../../types';
import * as styles from './index.css';

type CardVariant = 'accent-purple' | 'accent-orange' | 'accent-blue' | 'accent-green' | 'accent-red';

interface TypeConfig {
  label: string;
  variant: CardVariant;
  icon: ReactElement;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const TYPE_CONFIG: Record<AISuggestionType, TypeConfig> = {
  task: {
    label: SUGGESTION_TYPE_LABELS.task,
    variant: 'accent-green',
    icon: <TaskAlt />,
    color: 'success',
  },
  feedback: {
    label: SUGGESTION_TYPE_LABELS.feedback,
    variant: 'accent-orange',
    icon: <Feedback />,
    color: 'warning',
  },
  idea: {
    label: SUGGESTION_TYPE_LABELS.idea,
    variant: 'accent-purple',
    icon: <Lightbulb />,
    color: 'secondary',
  },
};

interface SuggestionCardProps {
  isCompleted?: boolean;
  onMarkComplete?: (suggestionId: string) => void;
  onDismiss?: (suggestionId: string) => void;
  suggestion: AISuggestion;
}

function SuggestionCard({ isCompleted = false, onMarkComplete, onDismiss, suggestion }: SuggestionCardProps) {
  const typeConfig = TYPE_CONFIG[suggestion.type];

  function handleMarkComplete() {
    onMarkComplete?.(suggestion.id);
  }

  function handleDismiss() {
    onDismiss?.(suggestion.id);
  }

  return (
    <UiCard className={isCompleted ? styles.completedCard : styles.card} variant={typeConfig.variant}>
      <UiCardContent className={styles.cardContent}>
        <Stack className={styles.contentStack} spacing={1.5}>
          <div className={styles.chipContainer}>
            <Chip
              color={typeConfig.color}
              icon={typeConfig.icon}
              label={typeConfig.label}
              size="small"
            />
          </div>
          <Stack spacing={0.5}>
            <Typography className={isCompleted ? styles.completedText : undefined} variant="body1" fontWeight={500}>
              {suggestion.title}
            </Typography>
            <Typography className={isCompleted ? styles.completedText : undefined} color="text.secondary" variant="body2">
              {suggestion.content}
            </Typography>
          </Stack>
        </Stack>
      </UiCardContent>
      {!isCompleted && (onMarkComplete || onDismiss) && (
        <UiCardActions className={styles.cardActions}>
          {onMarkComplete && (
            <Button
              onClick={handleMarkComplete}
              size="small"
            >
              {SUGGESTION_STRINGS.MARK_COMPLETE}
            </Button>
          )}
          {onDismiss && (
            <Button
              onClick={handleDismiss}
              size="small"
            >
              {SUGGESTION_STRINGS.REJECT}
            </Button>
          )}
        </UiCardActions>
      )}
    </UiCard>
  );
}

export default SuggestionCard;


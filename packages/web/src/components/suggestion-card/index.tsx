import type { ReactElement } from 'react';

import { Lightbulb, TaskAlt, Feedback } from '@mui/icons-material';
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
    label: 'Task',
    variant: 'accent-green',
    icon: <TaskAlt />,
    color: 'success',
  },
  feedback: {
    label: 'Feedback',
    variant: 'accent-orange',
    icon: <Feedback />,
    color: 'warning',
  },
  idea: {
    label: 'Idea',
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
              Mark Complete
            </Button>
          )}
          {onDismiss && (
            <Button
              onClick={handleDismiss}
              size="small"
            >
              Reject
            </Button>
          )}
        </UiCardActions>
      )}
    </UiCard>
  );
}

export default SuggestionCard;


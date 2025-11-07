import { Stack, Typography, UiCard, UiCardContent } from '../../ui-library';
import AIFeedbackControls from '../ai-feedback-controls';
import * as styles from './index.css';

interface SessionDetailsSummaryProps {
  aiSummary?: string;
  aiSummaryFeedback?: 0 | 1;
  onFeedbackChange?: (feedback: 0 | 1) => void;
}

function SessionDetailsSummary({
  aiSummary,
  aiSummaryFeedback,
  onFeedbackChange,
}: SessionDetailsSummaryProps) {
  if (!aiSummary) {
    return null;
  }

  return (
    <Stack className={styles.root} spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">Summary</Typography>
        <Typography color="text.secondary" variant="body2">
          Review the key moments and milestones from your session.
        </Typography>
      </Stack>

      <UiCard>
        <UiCardContent>
          <Stack spacing={2}>
            <div>
              <Typography className={styles.overviewHeading} variant="subtitle2">
                Overview
              </Typography>
              <Typography variant="body2">{aiSummary}</Typography>
            </div>

            {onFeedbackChange && (
              <AIFeedbackControls
                feedback={aiSummaryFeedback}
                onFeedbackChange={onFeedbackChange}
              />
            )}
          </Stack>
        </UiCardContent>
      </UiCard>
    </Stack>
  );
}

export default SessionDetailsSummary;


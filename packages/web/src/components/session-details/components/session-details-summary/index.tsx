import { Stack, Typography, UiCard, UiCardContent } from '../../../../ui-library';
import AIFeedbackSection from '../../../../components/ai-feedback-section';
import type { AISummaryComponent } from '../../../../types';
import * as styles from './index.css';

interface SessionDetailsSummaryProps {
  aiSummary?: AISummaryComponent[];
  aiSummaryFeedback?: 0 | 1;
  onFeedbackChange?: (feedback: 0 | 1) => void;
}

function getComponentTitle(componentType: string): string {
  const titles: Record<string, string> = {
    overview: 'Overview',
    key_points: 'Key Points',
    feedback: 'Feedback',
    summary: 'Summary',
  };
  return titles[componentType] || componentType;
}

function SessionDetailsSummary({
  aiSummary,
  aiSummaryFeedback,
  onFeedbackChange,
}: SessionDetailsSummaryProps) {
  // Filter out suggestions component - it's displayed separately
  const filteredComponents = aiSummary?.filter((c) => c.component_type !== 'suggestions') ?? [];
  const sortedComponents = filteredComponents.sort((a, b) => a.component_order - b.component_order);

  if (!aiSummary || filteredComponents.length === 0) {
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
          <Stack spacing={3}>
            {sortedComponents.map((component, index) => (
              <div key={`${component.component_type}-${index}`}>
                {sortedComponents.length > 1 && (
                  <Typography className={styles.componentHeading} variant="h6">
                    {getComponentTitle(component.component_type)}
                  </Typography>
                )}
                <Typography className={styles.componentContent} variant="body2">
                  {component.content}
                </Typography>
              </div>
            ))}

            {onFeedbackChange && (
              <AIFeedbackSection
                feedback={aiSummaryFeedback}
                onFeedbackChange={onFeedbackChange}
                question="Was this helpful?"
              />
            )}
          </Stack>
        </UiCardContent>
      </UiCard>
    </Stack>
  );
}

export default SessionDetailsSummary;

import { useMemo } from 'react';
import { SESSION_STRINGS } from '../../../../constants';
import { Stack, Typography, UiCard, UiCardContent } from '../../../../ui-library';
import AIFeedbackSection from '../ai-feedback-section';
import type { AISummaryComponent } from '../../../../types';
import * as styles from './index.css';

interface SessionDetailsSummaryProps {
  aiSummary?: AISummaryComponent[];
  aiSummaryFeedback?: 0 | 1;
  onFeedbackChange?: (feedback: 0 | 1) => void;
}

function getComponentTitle(componentType: string): string {
  const titles: Record<string, string> = {
    overview: SESSION_STRINGS.COMPONENT_TITLES.OVERVIEW,
    key_points: SESSION_STRINGS.COMPONENT_TITLES.KEY_POINTS,
    feedback: SESSION_STRINGS.COMPONENT_TITLES.FEEDBACK,
    summary: SESSION_STRINGS.COMPONENT_TITLES.SUMMARY,
  };
  return titles[componentType] || componentType;
}

function SessionDetailsSummary({
  aiSummary,
  aiSummaryFeedback,
  onFeedbackChange,
}: SessionDetailsSummaryProps) {

  const filteredComponents = useMemo(
    () => aiSummary?.filter((c) => c.component_type !== 'suggestions') ?? [],
    [aiSummary]
  );

  const sortedComponents = useMemo(
    () => [...filteredComponents].sort((a, b) => a.component_order - b.component_order),
    [filteredComponents]
  );

  if (!aiSummary || filteredComponents.length === 0) {
    return null;
  }

  return (
    <Stack className={styles.root} spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">{SESSION_STRINGS.SUMMARY_TITLE}</Typography>
        <Typography color="text.secondary" variant="body2">
          {SESSION_STRINGS.SUMMARY_DESCRIPTION}
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

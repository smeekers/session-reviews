import { Stack, Typography } from '../../ui-library';
import AIFeedbackControls from '../ai-feedback-controls';

interface AIFeedbackSectionProps {
  feedback?: 0 | 1;
  onFeedbackChange: (feedback: 0 | 1) => void;
  question?: string;
}

function AIFeedbackSection({ feedback, onFeedbackChange, question = 'Was this helpful?' }: AIFeedbackSectionProps) {
  return (
    <Stack spacing={1}>
      <Typography color="text.secondary" variant="body2">
        {question}
      </Typography>
      <AIFeedbackControls feedback={feedback} onFeedbackChange={onFeedbackChange} />
    </Stack>
  );
}

export default AIFeedbackSection;


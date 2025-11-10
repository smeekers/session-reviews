import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { AI_FEEDBACK_STRINGS } from '../../../../constants';
import { Stack, Typography, IconButton, Tooltip } from '../../../../ui-library';

interface AIFeedbackSectionProps {
  feedback?: 0 | 1;
  onFeedbackChange: (feedback: 0 | 1) => void;
  question?: string;
}

function AIFeedbackSection({ feedback, onFeedbackChange, question = AI_FEEDBACK_STRINGS.QUESTION }: AIFeedbackSectionProps) {
  return (
    <Stack spacing={1}>
      <Typography color="text.secondary" variant="body2">
        {question}
      </Typography>
      <Stack direction="row" spacing={1} role="group" aria-label="Feedback controls">
        <Tooltip title={AI_FEEDBACK_STRINGS.HELPFUL}>
          <span>
            <IconButton
              aria-label={AI_FEEDBACK_STRINGS.HELPFUL}
              aria-pressed={feedback === 1}
              color={feedback === 1 ? 'primary' : 'default'}
              onClick={() => onFeedbackChange(1)}
              size="small"
            >
              <ThumbUp />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={AI_FEEDBACK_STRINGS.NOT_HELPFUL}>
          <span>
            <IconButton
              aria-label={AI_FEEDBACK_STRINGS.NOT_HELPFUL}
              aria-pressed={feedback === 0}
              color={feedback === 0 ? 'error' : 'default'}
              onClick={() => onFeedbackChange(0)}
              size="small"
            >
              <ThumbDown />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

export default AIFeedbackSection;


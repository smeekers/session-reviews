import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { Stack, Typography, IconButton } from '../../ui-library';
import * as styles from './index.css';

interface AIFeedbackControlsProps {
  feedback?: 0 | 1;
  onFeedbackChange: (feedback: 0 | 1) => void;
}

function AIFeedbackControls({ feedback, onFeedbackChange }: AIFeedbackControlsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body2">Feedback:</Typography>
      <IconButton
        className={styles.feedbackButton}
        color={feedback === 1 ? 'primary' : 'default'}
        onClick={() => onFeedbackChange(1)}
        size="small"
      >
        <ThumbUp />
      </IconButton>
      <IconButton
        className={styles.feedbackButton}
        color={feedback === 0 ? 'error' : 'default'}
        onClick={() => onFeedbackChange(0)}
        size="small"
      >
        <ThumbDown />
      </IconButton>
    </Stack>
  );
}

export default AIFeedbackControls;


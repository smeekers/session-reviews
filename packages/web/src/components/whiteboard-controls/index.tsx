import { FiberManualRecord, Share, Stop } from '@mui/icons-material';
import { WHITEBOARD_STRINGS } from '../../constants';
import { Button, Stack, Typography } from '../../ui-library';
import * as styles from './index.css';

interface WhiteboardControlsProps {
  error?: Error | null;
  isRecording: boolean;
  onEndSession: () => void;
  onShareSession: () => void;
  onStartRecording: () => void;
  shareButtonText: string;
}

function WhiteboardControls({
  error,
  isRecording,
  onEndSession,
  onShareSession,
  onStartRecording,
  shareButtonText,
}: WhiteboardControlsProps) {
  return (
    <Stack className={styles.container} spacing={1}>
      <Stack direction="row" spacing={1}>
        <Button
          className={styles.shareButton}
          onClick={onShareSession}
          size="small"
          startIcon={<Share />}
          variant="outlined"
        >
          {shareButtonText}
        </Button>
        {!isRecording ? (
          <Button
            className={styles.recordButton}
            color="error"
            onClick={onStartRecording}
            size="small"
            startIcon={<FiberManualRecord />}
            variant="contained"
          >
            {WHITEBOARD_STRINGS.START_RECORDING}
          </Button>
        ) : (
          <Button
            className={styles.recordButton}
            color="error"
            onClick={onEndSession}
            size="small"
            startIcon={<Stop />}
            variant="contained"
          >
            {WHITEBOARD_STRINGS.END_SESSION}
          </Button>
        )}
      </Stack>
      {error && (
        <Typography color="error" role="alert" variant="caption">
          {error.message}
        </Typography>
      )}
    </Stack>
  );
}

export default WhiteboardControls;


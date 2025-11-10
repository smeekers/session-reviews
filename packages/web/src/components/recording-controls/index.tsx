import { FiberManualRecord, Stop } from '@mui/icons-material';
import { Button, Typography } from '../../ui-library';
import * as styles from './index.css';

interface RecordingControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onEndSession: () => void;
  error?: Error | null;
}

function RecordingControls({ isRecording, onStartRecording, onEndSession, error }: RecordingControlsProps) {
  return (
    <div className={styles.root}>
      {!isRecording ? (
        <Button
          color="error"
          onClick={onStartRecording}
          size="large"
          startIcon={<FiberManualRecord />}
          variant="contained"
        >
          Start Recording
        </Button>
      ) : (
        <Button
          color="error"
          onClick={onEndSession}
          size="large"
          startIcon={<Stop />}
          variant="contained"
        >
          End Session
        </Button>
      )}

      {error && (
        <Typography color="error" variant="body2">
          {error.message}
        </Typography>
      )}
    </div>
  );
}

export default RecordingControls;


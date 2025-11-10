import { CircularProgress, Stack, Typography } from '../../ui-library';
import * as styles from './index.css';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

function Loading({ fullScreen = true, message }: LoadingProps) {
  return (
    <div className={fullScreen ? styles.container : styles.containerInline}>
      <Stack alignItems="center" spacing={2}>
        <CircularProgress />
        {message && (
          <Typography color="text.secondary" variant="body2">
            {message}
          </Typography>
        )}
      </Stack>
    </div>
  );
}

export default Loading;


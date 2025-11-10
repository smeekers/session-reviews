import { CircularProgress, Stack, Typography } from '../../ui-library';
import * as styles from './index.css';

interface LoadingProps {
  message?: string;
}

function Loading({ message }: LoadingProps) {
  return (
    <div className={styles.container}>
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


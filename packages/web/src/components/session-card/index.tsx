import * as styles from './index.css';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Chip, Stack, Typography, UiCard, UiCardActionArea, UiCardContent } from '../../ui-library';
import type { Session } from '../../types';

interface SessionCardProps {
  session: Session;
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate();

  const startDate = new Date(session.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const duration = session.endTime
    ? Math.round((new Date(session.endTime).getTime() - startDate.getTime()) / 1000 / 60)
    : null;
  const durationText = duration ? `${duration} min` : 'In progress';

  const statusColors: Record<Session['status'], 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
    'in-progress': 'primary',
    processing: 'warning',
    completed: 'default',
    reviewed: 'success',
  };

  const statusLabels: Record<Session['status'], string> = {
    'in-progress': 'In Progress',
    processing: 'Processing',
    completed: 'Completed',
    reviewed: 'Reviewed',
  };

  function handleClick() {
    navigate(`/sessions/${session.uid}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }

  return (
    <UiCard className={styles.root}>
      <UiCardActionArea
        component="div"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
      >
        <UiCardContent className={styles.content}>
          <Stack className={styles.header} direction="row" spacing={1}>
            <Chip
              color={statusColors[session.status]}
              label={statusLabels[session.status]}
              size="small"
            />
          </Stack>

          <Stack className={styles.details} direction="row" spacing={2}>
            <Typography className={styles.detailItem} variant="body2">
              <CalendarToday className={styles.icon} />
              {formattedDate} • {formattedTime}
            </Typography>
            <Typography className={styles.detailItem} variant="body2">
              <AccessTime className={styles.icon} />
              {durationText}
            </Typography>
          </Stack>

          {session.aiSummary && session.status !== 'in-progress' && session.status !== 'processing' ? (
            <Typography className={styles.summary} variant="body2" color="text.secondary">
              {session.aiSummary.length > 150 ? `${session.aiSummary.substring(0, 150)}...` : session.aiSummary}
            </Typography>
          ) : null}
        </UiCardContent>
      </UiCardActionArea>
    </UiCard>
  );
}

export default SessionCard;


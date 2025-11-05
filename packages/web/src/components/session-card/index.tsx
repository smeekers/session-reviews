import * as styles from './index.css';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { format, formatDistanceStrict } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ROUTES, statusColors, statusLabels } from '../../constants';
import { Chip, Stack, Typography, UiCard, UiCardActionArea, UiCardContent } from '../../ui-library';
import type { Session } from '../../types';

interface SessionCardProps {
  session: Session;
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate();

  const startDate = new Date(session.startTime);
  const formattedDate = format(startDate, 'MMM dd, yyyy');
  const formattedTime = format(startDate, 'h:mmaaa');

  const durationText = session.endTime
    ? formatDistanceStrict(startDate, new Date(session.endTime), {
        unit: 'minute',
      })
    : 'In progress';

  function handleClick() {
    if (session.status === 'ready') {
      navigate(ROUTES.LIVE_SESSION(session.uid));
    } else if (session.status === 'in-progress') {
      navigate(ROUTES.WHITEBOARD(session.uid));
    } else {
      // All past sessions: processing, completed, reviewed
      navigate(ROUTES.SESSION_DETAILS(session.uid));
    }
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
          <Stack className={styles.header} direction="row" spacing={1} justifyContent="space-between">
            <Stack direction="row" spacing={1}>
              <Chip
                color={statusColors[session.status]}
                label={statusLabels[session.status]}
                size="small"
              />
            </Stack>
            {session.name && (
              <Typography variant="h6">{session.name}</Typography>
            )}
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
              {session.aiSummary}
            </Typography>
          ) : null}
        </UiCardContent>
      </UiCardActionArea>
    </UiCard>
  );
}

export default SessionCard;


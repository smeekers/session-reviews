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

function getDurationText(session: Session): string {
  if (session.status === 'ready') {
    return 'Not started';
  }

  if (session.endTime && session.startTime) {
    return formatDistanceStrict(new Date(session.startTime), new Date(session.endTime), {
      unit: 'minute',
    });
  }

  return 'In progress';
}

function getActionText(status: Session['status']): string {
  const actionTexts: Record<Session['status'], string> = {
    'ready': 'Start Session',
    'in-progress': 'Join Session',
    'processing': 'View Whiteboard',
    'completed': 'Review Now',
    'reviewed': 'Review Again',
  };

  return actionTexts[status];
}

function getSummaryText(session: Session): string | null {
  if (session.aiSummary && session.aiSummary.length > 0 && session.status !== 'in-progress' && session.status !== 'processing') {
    return session.aiSummary[0]?.content || null;
  }

  const statusMessages: Record<Session['status'], string> = {
    'ready': 'Session is ready! You can begin recording and start your session.',
    'in-progress': 'Session is currently in progress. You can join now and collaborate on the whiteboard.',
    'processing': 'Session is being processed. The recording is being uploaded and analyzed. You can still access the whiteboard while you wait.',
    'completed': '',
    'reviewed': '',
  };

  return statusMessages[session.status] || null;
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate();

  const startDate = session.startTime ? new Date(session.startTime) : new Date(session.createdAt);
  const formattedDate = format(startDate, 'MMM dd, yyyy');
  const formattedTime = format(startDate, 'h:mmaaa');

  const durationText = getDurationText(session);
  const actionText = getActionText(session.status);
  const summaryText = getSummaryText(session);

  function handleClick() {
    if (session.status === 'ready') {
      navigate(ROUTES.LIVE_SESSION(session.uid));
    } else if (session.status === 'in-progress' || session.status === 'processing') {
      navigate(ROUTES.WHITEBOARD(session.uid));
    } else {
      // All past sessions: completed, reviewed
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
        <UiCardContent>
          <Stack className={styles.header} direction="row" justifyContent="space-between">
            <Chip
              color={statusColors[session.status]}
              label={statusLabels[session.status]}
              size="small"
            />
            {session.name && (
              <Typography className={styles.title} variant="h6">
                {session.name}
              </Typography>
            )}
          </Stack>

          <Stack className={styles.details} direction="row" spacing={2}>
            <Stack className={styles.detailItem} direction="row" spacing={0.5}>
              <CalendarToday className={styles.icon} />
              <Typography variant="body2">
                {formattedDate} • {formattedTime}
              </Typography>
            </Stack>
            <Stack className={styles.detailItem} direction="row" spacing={0.5}>
              <AccessTime className={styles.icon} />
              <Typography variant="body2">{durationText}</Typography>
            </Stack>
          </Stack>

          <div className={styles.summarySection}>
            {summaryText ? (
              <Typography className={styles.summary} variant="body2" color="text.secondary">
                {summaryText}
              </Typography>
            ) : (
              <div className={styles.summaryPlaceholder} />
            )}
          </div>

          <Typography className={styles.actionText} variant="body2" color="primary">
            {actionText} →
          </Typography>
        </UiCardContent>
      </UiCardActionArea>
    </UiCard>
  );
}

export default SessionCard;

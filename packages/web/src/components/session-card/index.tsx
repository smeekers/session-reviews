import { useMemo } from 'react';
import * as styles from './index.css';
import { AccessTime, CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES, actionTexts, statusColors, statusLabels, statusMessages, SESSION_STRINGS } from '../../constants';
import { Chip, Stack, Typography, UiCard, UiCardActionArea, UiCardContent } from '../../ui-library';
import { formatSessionDateTime, getSessionDuration } from '../../helpers/session-time';
import type { Session } from '../../types';

interface SessionCardProps {
  session: Session;
}

function getActionText(status: Session['status']): string {
  return actionTexts[status];
}

function getSummaryText(session: Session): string | null {
  if (session.aiSummary && session.aiSummary.length > 0 && session.status !== 'in-progress' && session.status !== 'processing') {
    return session.aiSummary[0]?.content || null;
  }

  return statusMessages[session.status] || null;
}

function SessionCard({ session }: SessionCardProps) {
  const navigate = useNavigate();

  const { formattedDate, formattedTime } = useMemo(() => {
  const startDate = session.startTime ? new Date(session.startTime) : new Date(session.createdAt);
  const formattedDateTime = formatSessionDateTime(startDate);
    const [date, time] = formattedDateTime.split(' • ');
    return { formattedDate: date, formattedTime: time };
  }, [session.startTime, session.createdAt]);

  const durationText = useMemo(
    () => getSessionDuration(session) ?? SESSION_STRINGS.DURATION_IN_PROGRESS,
    [session]
  );

  const actionText = useMemo(() => getActionText(session.status), [session.status]);

  const summaryText = useMemo(() => getSummaryText(session), [session]);

  function handleClick() {
    if (session.status === 'ready') {
      navigate(ROUTES.LIVE_SESSION(session.uid));
    } else if (session.status === 'in-progress' || session.status === 'processing') {
      navigate(ROUTES.WHITEBOARD(session.uid));
    } else {
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
    <UiCard className={styles.root} data-testid="session-card">
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

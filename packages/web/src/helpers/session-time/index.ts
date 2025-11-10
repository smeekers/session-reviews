import { addSeconds, format, formatDistanceStrict, intervalToDuration } from 'date-fns';
import { DATE_FORMATS, SESSION_STRINGS } from '../../constants';
import type { Session } from '../../types';

/**
 * Formats a session date and time in a consistent format
 * @param date - Date object or ISO string
 * @returns Formatted string like "MMM dd, yyyy • h:mmaaa" (e.g., "Jan 15, 2024 • 2:30pm")
 */
export function formatSessionDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, DATE_FORMATS.SESSION_DATETIME);
}

/**
 * Calculates and formats the duration of a session
 * @param session - Session object with status, startTime, and optional endTime
 * @returns Formatted duration string (e.g., "45 minutes", "Not started", "In progress") or null
 */
export function getSessionDuration(session: Session): string | null {
  if (session.status === 'ready') {
    return SESSION_STRINGS.DURATION_NOT_STARTED;
  }

  if (!session.startTime) {
    return null;
  }

  if (session.endTime) {
    return formatDistanceStrict(new Date(session.startTime), new Date(session.endTime), {
      unit: 'minute',
    });
  }

  return SESSION_STRINGS.DURATION_IN_PROGRESS;
}

/**
 * Formats a timestamp in seconds to MM:SS or HH:MM:SS format
 * @param timeInSeconds - Time in seconds
 * @returns Formatted string like "05:30" or "01:05:30"
 */
export function formatTimestamp(timeInSeconds: number): string {
  const start = new Date(0);
  const end = addSeconds(start, timeInSeconds);

  const { hours = 0, minutes = 0, seconds = 0 } = intervalToDuration({ end, start });

  const hoursResult = hours.toString().padStart(2, '0');
  const minutesResult = minutes.toString().padStart(2, '0');
  const secondsResult = seconds.toString().padStart(2, '0');

  if (hoursResult === '00') {
    return `${minutesResult}:${secondsResult}`;
  }

  return `${hoursResult}:${minutesResult}:${secondsResult}`;
}


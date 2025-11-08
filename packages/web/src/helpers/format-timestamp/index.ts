import { addSeconds, intervalToDuration } from 'date-fns';

function formatTimestamp(timeInSeconds: number): string {
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

export default formatTimestamp;


import moment from 'moment';
import pluralize from 'pluralize';

export const timeLeft = (startTime, endTime) => {
  const totalDays = endTime.diff(startTime, 'days');
  const totalHours = endTime.diff(startTime, 'hours');
  const totalMinutes = endTime.diff(startTime, 'minutes');
  const totalSeconds = endTime.diff(startTime, 'seconds');

  const clearHours = totalHours % 24;
  const clearMinutes = totalMinutes % 60;
  const clearSeconds = totalSeconds % 60;

  const timeText = `${totalDays} ${pluralize('day', totalDays)}, ${clearHours} ${pluralize('hour', clearHours)}, ${clearMinutes} ${pluralize('minute', clearMinutes)}, and ${clearSeconds} ${pluralize('second', clearSeconds)}`; //eslint-disable-line

  return timeText;
};

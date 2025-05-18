import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';

dayjs.extend(relativeTime);

export const useRelativeTime = (createdAt: string): string => {
  const [formattedTime, setFormattedTime] = useState(() => formatDate(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatDate(createdAt));
    }, 60000); // Update every 1 minute

    return () => clearInterval(interval); // Clean up
  }, [createdAt]);

  return formattedTime;
};

function formatDate(createdAt: string) {
  const now = dayjs();
  const date = dayjs(createdAt);

  const diffInMinutes = now.diff(date, 'minute');
  const diffInHours = now.diff(date, 'hour');
  const diffInDays = now.diff(date, 'day');

  if (diffInMinutes < 1) return 'just now';
  if (diffInHours < 1) return date.fromNow();
  if (diffInHours < 24) return date.fromNow();
  if (diffInDays < 7) return date.fromNow();

  return date.format('MMM D, YYYY');
}

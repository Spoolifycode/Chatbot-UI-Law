import { Message } from '../types';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { nl } from 'date-fns/locale';

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return format(date, 'HH:mm');
};

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  
  if (isToday(date)) {
    return 'Vandaag';
  }
  if (isYesterday(date)) {
    return 'Gisteren';
  }
  return format(date, 'd MMMM yyyy', { locale: nl });
};

export const groupMessagesByDate = (messages: Message[]): Record<string, Message[]> => {
  return messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    return {
      ...groups,
      [date]: [...(groups[date] || []), message]
    };
  }, {} as Record<string, Message[]>);
};

export const shouldShowTimestamp = (currentMsg: Message, prevMsg: Message | null): boolean => {
  if (!prevMsg) return true;
  
  const currentDate = new Date(currentMsg.timestamp);
  const prevDate = new Date(prevMsg.timestamp);
  
  // Show timestamp if messages are from different days
  if (!isSameDay(currentDate, prevDate)) return true;
  
  // Show timestamp if messages are more than 5 minutes apart
  const fiveMinutes = 5 * 60 * 1000;
  return currentDate.getTime() - prevDate.getTime() > fiveMinutes;
};
import { useState, useCallback } from 'react';
import { Message } from '../types';
import { format } from 'date-fns';

interface ExportOptions {
  format: 'txt' | 'json' | 'csv' | 'pdf';
  includeMetadata: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

const useExportHistory = (messages: Message[]) => {
  const [exportHistory, setExportHistory] = useState<string[]>([]);

  const exportMessages = useCallback((options: ExportOptions) => {
    const { format, includeMetadata, dateRange } = options;
    let content = '';

    const filteredMessages = dateRange
      ? messages.filter(msg => {
          const timestamp = new Date(msg.timestamp);
          return timestamp >= dateRange.start && timestamp <= dateRange.end;
        })
      : messages;

    switch (format) {
      case 'txt':
        content = filteredMessages
          .map(msg => {
            const timestamp = format(new Date(msg.timestamp), 'dd/MM/yyyy HH:mm');
            return `[${timestamp}] ${msg.type.toUpperCase()}: ${msg.content}`;
          })
          .join('\n\n');
        break;

      case 'json':
        content = JSON.stringify(
          includeMetadata ? filteredMessages : filteredMessages.map(msg => ({
            type: msg.type,
            content: msg.content
          })),
          null,
          2
        );
        break;

      case 'csv':
        const headers = includeMetadata
          ? ['Timestamp', 'Type', 'Content', 'Confidence', 'References']
          : ['Type', 'Content'];

        content = [
          headers.join(','),
          ...filteredMessages.map(msg => {
            const row = includeMetadata
              ? [
                  msg.timestamp,
                  msg.type,
                  `"${msg.content.replace(/"/g, '""')}"`,
                  msg.confidence || '',
                  msg.references.map(ref => ref.id).join(';')
                ]
              : [
                  msg.type,
                  `"${msg.content.replace(/"/g, '""')}"`
                ];
            return row.join(',');
          })
        ].join('\n');
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const fileName = `chat_export_${timestamp}.${format}`;
    
    setExportHistory(prev => [fileName, ...prev]);
    return { content, fileName };
  }, [messages]);

  return {
    exportHistory,
    exportMessages
  };
};

export default useExportHistory;
import { Message, ExportOptions } from '../types';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportChat = (messages: Message[], options: ExportOptions): string => {
  switch (options.format) {
    case 'txt':
      return exportAsTxt(messages, options);
    case 'json':
      return exportAsJson(messages, options);
    case 'csv':
      return exportAsCsv(messages, options);
    case 'pdf':
      return exportAsPdf(messages, options);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
};

const exportAsTxt = (messages: Message[], options: ExportOptions): string => {
  return messages
    .filter(msg => filterByDateRange(msg, options.dateRange))
    .map(msg => {
      const timestamp = format(new Date(msg.timestamp), 'dd/MM/yyyy HH:mm');
      const content = `[${timestamp}] ${msg.type.toUpperCase()}: ${msg.content}`;
      
      if (options.includeMetadata && msg.references?.length > 0) {
        const refs = msg.references
          .map(ref => `${ref.id}: ${ref.title}`)
          .join(', ');
        return `${content}\nReferences: ${refs}`;
      }
      
      return content;
    })
    .join('\n\n');
};

const exportAsJson = (messages: Message[], options: ExportOptions): string => {
  const filteredMessages = messages
    .filter(msg => filterByDateRange(msg, options.dateRange))
    .map(msg => options.includeMetadata ? msg : {
      type: msg.type,
      content: msg.content
    });

  return JSON.stringify(filteredMessages, null, 2);
};

const exportAsCsv = (messages: Message[], options: ExportOptions): string => {
  const headers = options.includeMetadata
    ? ['Timestamp', 'Type', 'Content', 'Confidence', 'References']
    : ['Type', 'Content'];

  const rows = messages
    .filter(msg => filterByDateRange(msg, options.dateRange))
    .map(msg => {
      if (options.includeMetadata) {
        return [
          msg.timestamp,
          msg.type,
          `"${msg.content.replace(/"/g, '""')}"`,
          msg.confidence || '',
          msg.references?.map(ref => ref.id).join(';') || ''
        ];
      }
      return [
        msg.type,
        `"${msg.content.replace(/"/g, '""')}"`
      ];
    });

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
};

const exportAsPdf = (messages: Message[], options: ExportOptions): string => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('Chat Export', 14, 15);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 14, 25);
  
  // Prepare table data
  const tableData = messages
    .filter(msg => filterByDateRange(msg, options.dateRange))
    .map(msg => {
      const row = [
        format(new Date(msg.timestamp), 'dd/MM/yyyy HH:mm'),
        msg.type.toUpperCase(),
        msg.content
      ];
      
      if (options.includeMetadata) {
        row.push(
          msg.confidence ? `${(msg.confidence * 100).toFixed(1)}%` : '',
          msg.references?.map(ref => ref.id).join(', ') || ''
        );
      }
      
      return row;
    });
  
  // Add table
  doc.autoTable({
    startY: 30,
    head: [[
      'Timestamp',
      'Type',
      'Content',
      ...(options.includeMetadata ? ['Confidence', 'References'] : [])
    ]],
    body: tableData,
    styles: {
      fontSize: 8,
      cellPadding: 2
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 20 },
      2: { cellWidth: 'auto' },
      ...(options.includeMetadata ? {
        3: { cellWidth: 20 },
        4: { cellWidth: 30 }
      } : {})
    }
  });
  
  return doc.output();
};

export const downloadFile = (content: string, filename: string, format: string) => {
  const blob = new Blob([content], { type: getContentType(format) });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

const getContentType = (format: string): string => {
  switch (format) {
    case 'txt':
      return 'text/plain';
    case 'json':
      return 'application/json';
    case 'csv':
      return 'text/csv';
    case 'pdf':
      return 'application/pdf';
    default:
      return 'text/plain';
  }
};

const filterByDateRange = (msg: Message, dateRange?: { start: Date; end: Date }) => {
  if (!dateRange) return true;
  const timestamp = new Date(msg.timestamp);
  return timestamp >= dateRange.start && timestamp <= dateRange.end;
};
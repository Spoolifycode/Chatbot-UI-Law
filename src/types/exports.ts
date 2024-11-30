export interface ExportOptions {
  format: 'txt' | 'json' | 'csv' | 'pdf';
  includeMetadata: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ExportHistory {
  fileName: string;
  timestamp: string;
  format: string;
  size: number;
}
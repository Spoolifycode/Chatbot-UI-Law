export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  references: Reference[];
  confidence?: number;
  reaction?: string;
}

export interface Reference {
  id: string;
  title: string;
  description: string;
  color: string;
}

export type Theme = 'light' | 'dark';

export * from './exports';
export * from './reactions';
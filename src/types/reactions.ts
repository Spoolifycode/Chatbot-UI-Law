export type ReactionType = '👍' | '👎' | '❓' | '💡' | '⭐';

export interface Reaction {
  type: ReactionType;
  messageId: string;
  timestamp: string;
  userId?: string;
}
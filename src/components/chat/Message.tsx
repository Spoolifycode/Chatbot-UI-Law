import React from 'react';
import { MessageCircle, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message as MessageType } from '../../types';
import ReferenceTag from './ReferenceTag';
import ReactionBar from './reactions/ReactionBar';

interface MessageProps {
  message: MessageType;
  isLatest?: boolean;
  onReact?: (messageId: string, reaction: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, isLatest, onReact }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
    >
      <div className={`message-bubble ${message.type}`}>
        <div className="flex items-start gap-3">
          {isBot && (
            <MessageCircle className="w-5 h-5 mt-1 text-blue-500 dark:text-blue-400" />
          )}
          <div className="space-y-2">
            <p className="text-sm leading-relaxed dark:text-gray-100">
              {message.content}
            </p>
            {message.confidence && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Info className="w-3 h-3" />
                <span>Betrouwbaarheid: {(message.confidence * 100).toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>

        {message.references?.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message.references.map((ref) => (
              <ReferenceTag key={ref.id} reference={ref} />
            ))}
          </motion.div>
        )}
        
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3 h-3" />
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>

      {isBot && isLatest && onReact && (
        <ReactionBar messageId={message.id} onReact={onReact} />
      )}
    </motion.div>
  );
};

export default Message;
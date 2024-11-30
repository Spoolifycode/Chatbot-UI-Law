import React from 'react';
import { motion } from 'framer-motion';
import ReferenceSkeleton from './ReferenceSkeleton';

interface MessageSkeletonProps {
  type: 'user' | 'bot';
}

const MessageSkeleton: React.FC<MessageSkeletonProps> = ({ type }) => {
  const isBot = type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
    >
      <div className={`message-bubble ${type} animate-pulse`}>
        <div className="flex items-start gap-3">
          {isBot && (
            <div className="w-5 h-5 mt-1 rounded-full bg-blue-500/20" />
          )}
          <div className="space-y-2">
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        {isBot && (
          <div className="mt-4 flex gap-2">
            <ReferenceSkeleton />
            <ReferenceSkeleton />
          </div>
        )}
        
        <div className="mt-2 flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </motion.div>
  );
};

export default MessageSkeleton;
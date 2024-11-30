import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex items-center gap-2 text-gray-400"
  >
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2
          }}
          className="w-2 h-2 bg-blue-400 rounded-full"
        />
      ))}
    </div>
    <span className="text-sm">Assistent is aan het typen...</span>
  </motion.div>
);

export default TypingIndicator;
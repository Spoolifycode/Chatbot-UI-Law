import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-chat-dark-navy border-t border-gray-100 dark:border-gray-800">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Stel een vraag over Nederlandse wetgeving..."
          className="flex-1 px-4 py-3 bg-gray-50 dark:bg-chat-darker border-0
            rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50
            text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!input.trim() || disabled}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3
            rounded-xl transition-all duration-200 focus:outline-none
            focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50
            disabled:cursor-not-allowed min-w-[48px] flex items-center justify-center"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
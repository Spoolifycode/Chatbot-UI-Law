import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ArrowRight, Clock, Building, Info, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Reference, Message } from '../types';
import { groupMessagesByDate, formatTime, shouldShowTimestamp } from '../utils/messageUtils';
import useChat from '../hooks/useChat';

const ReferenceTag: React.FC<{ reference: Reference }> = ({ reference }) => {
  const { theme } = useTheme();
  const baseClasses = "px-3 py-1.5 rounded-full text-xs font-medium transition-all group relative";
  const lightModeClasses = reference.color;
  const darkModeClasses = theme === 'dark' 
    ? 'bg-opacity-15 hover:bg-opacity-25 text-gray-900'
    : '';

  return (
    <motion.span
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${lightModeClasses} ${darkModeClasses}`}
    >
      <div className="flex items-center gap-2">
        <Building className="w-4 h-4 text-gray-900" />
        <span className="font-semibold text-gray-900">{reference.id}</span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-900">{reference.title}</span>
      </div>
      
      <div className="absolute -top-12 left-0 w-64 p-2.5 bg-gray-900 text-gray-100
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 
        z-10 shadow-lg pointer-events-none">
        {reference.description}
      </div>
    </motion.span>
  );
};

const MessageDateDivider: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex items-center justify-center my-6">
    <div className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100/10 text-gray-400">
      {date}
    </div>
  </div>
);

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 rounded-full hover:bg-white/10 transition-colors"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-white/90" />
      ) : (
        <Moon className="w-5 h-5 text-white/90" />
      )}
    </motion.button>
  );
};

const LegalChatbot: React.FC = () => {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    const scrollContainer = messageContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-chat-dark-navy rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="header-gradient p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="text-white/90 h-6 w-6" />
            <h1 className="text-xl text-white font-medium">
              Nederlandse Juridische Assistent
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm">
              AI-Ondersteund
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white dark:bg-chat-dark-navy"
      >
        <AnimatePresence initial={false}>
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <React.Fragment key={date}>
              <MessageDateDivider date={date} />
              {dateMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex flex-col ${
                    message.type === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className={`message-bubble ${message.type}`}>
                    <div className="flex items-start gap-3">
                      {message.type === 'bot' && (
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

                    {message.references.length > 0 && (
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
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </React.Fragment>
          ))}

          {isTyping && (
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
          )}
        </AnimatePresence>
      </div>

      {/* Input Form */}
      <div className="p-4 md:p-6 bg-white dark:bg-chat-dark-navy border-t border-gray-100 dark:border-gray-800">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel een vraag over Nederlandse wetgeving..."
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-chat-darker border-0
              rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50
              text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3
              rounded-xl transition-all duration-200 focus:outline-none
              focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 
              disabled:cursor-not-allowed min-w-[48px] flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default LegalChatbot;
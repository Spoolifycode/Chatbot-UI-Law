import { useState, useCallback } from 'react';
import { Message, Reference } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'bot',
    content: 'Hallo! Ik ben uw Nederlandse juridische assistent. Hoe kan ik u vandaag helpen?',
    timestamp: new Date().toISOString(),
    references: [],
    confidence: 1
  }
];

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const addMessage = useCallback((newMessage: Message) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
      references: []
    };
    addMessage(userMessage);

    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: 'This is a simulated response. In production, this would be replaced with actual API calls to the backend.',
      timestamp: new Date().toISOString(),
      references: [
        {
          id: 'BW1',
          title: 'Burgerlijk Wetboek',
          description: 'Artikel 1 van het Burgerlijk Wetboek',
          color: 'bg-blue-100'
        }
      ],
      confidence: 0.95
    };
    
    setIsTyping(false);
    addMessage(botMessage);
  }, [addMessage]);

  const addReaction = useCallback((messageId: string, reaction: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId
          ? { ...msg, reaction }
          : msg
      )
    );
  }, []);

  return {
    messages,
    isTyping,
    isInitializing,
    sendMessage,
    addReaction
  };
};

export default useChat;
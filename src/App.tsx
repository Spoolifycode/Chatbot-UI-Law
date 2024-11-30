import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatContainer } from './components/chat';

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-chat-dark-navy p-4">
        <ChatContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;
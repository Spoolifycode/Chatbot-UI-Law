import React from 'react';

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => (
  <div className="flex items-center justify-center my-6">
    <div className="px-4 py-1.5 rounded-full text-xs font-medium bg-gray-100/10 text-gray-400">
      {date}
    </div>
  </div>
);

export default DateDivider;
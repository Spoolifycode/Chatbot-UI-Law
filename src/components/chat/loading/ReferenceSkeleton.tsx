import React from 'react';

const ReferenceSkeleton: React.FC = () => (
  <div className="px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
      <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
    </div>
  </div>
);

export default ReferenceSkeleton;
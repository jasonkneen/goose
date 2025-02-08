import React from 'react';

interface AvatarProps {
  role: 'user' | 'assistant';
}

export default function Avatar({ role }: AvatarProps) {
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0 ${
        role === 'assistant' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-green-100 dark:bg-green-900'
      }`}
    >
      {role === 'assistant' ? (
        <span className="text-blue-600 dark:text-blue-300 text-sm">🦢</span>
      ) : (
        <span className="text-green-600 dark:text-green-300 text-sm">👤</span>
      )}
    </div>
  );
}

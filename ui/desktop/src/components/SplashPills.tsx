import React from 'react';

function SplashPill({ content, append, isSelected }) {
  const baseClasses =
    'px-4 py-2 text-sm text-center cursor-pointer rounded-full transition-all duration-150';
  const selectedClasses =
    'bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:!text-black border-none hover:bg-slate';
  const unselectedClasses =
    'text-textStandard dark:text-textStandard border border-white border-opacity-25 hover:bg-white hover:bg-opacity-15';

  const className = isSelected
    ? `${baseClasses} ${selectedClasses}`
    : `${baseClasses} ${unselectedClasses}`;

  return (
    <div
      className={className}
      onClick={async () => {
        const message = {
          content,
          role: 'user',
        };
        await append(message);
      }}
    >
      <div className="line-clamp-2">{content}</div>
    </div>
  );
}

export default function SplashPills({ append }) {
  return (
    <div className="flex flex-wrap gap-2 animate-[fadein_500ms_ease-in_forwards]">
      <SplashPill content="What can you do?" append={append} isSelected={true} />
      <SplashPill content="Demo writing and reading files" append={append} isSelected={false} />
      <SplashPill content="Make a snake game in a new folder" append={append} isSelected={false} />
      <SplashPill content="List files in my current directory" append={append} isSelected={false} />
      <SplashPill content="Take a screenshot and summarize" append={append} isSelected={false} />
    </div>
  );
}

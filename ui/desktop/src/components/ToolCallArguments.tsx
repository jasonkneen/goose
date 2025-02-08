import { ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import MarkdownContent from './MarkdownContent';

interface ToolCallArgumentsProps {
  args: Record<string, any>;
}

export function ToolCallArguments({ args }: ToolCallArgumentsProps) {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const toggleKey = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderValue = (key: string, value: any) => {
    if (typeof value === 'string') {
      const needsExpansion = value.length > 60;
      const isExpanded = expandedKeys[key];

      return (
        <div className="mb-1 w-full">
          <div className="flex flex-row w-full">
            <span className="text-xs font-medium text-textSubtle min-w-[140px]">{key}</span>
            <div className="flex flex-col flex-1">
              <div className="flex items-center">
                <div className={`flex-1 ${!needsExpansion ? '' : 'mr-2'}`}>
                  <MarkdownContent
                    content={isExpanded || !needsExpansion ? value : value.slice(0, 60) + '...'}
                    className="text-xs text-textStandard"
                  />
                </div>
                {needsExpansion && (
                  <button
                    onClick={() => toggleKey(key)}
                    className="text-xs hover:opacity-75 text-textStandard flex-shrink-0"
                    title={isExpanded ? 'Show less' : 'Show more'}
                  >
                    <ChevronUp
                      className={`h-5 w-5 transition-all origin-center ${!isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Handle non-string values (arrays, objects, etc.)
    const content = Array.isArray(value)
      ? '```json\n' +
        value.map((item, index) => `${index + 1}. ${JSON.stringify(item)}`).join('\n') +
        '\n```'
      : typeof value === 'object' && value !== null
        ? '```json\n' + JSON.stringify(value, null, 2) + '\n```'
        : '```\n' + String(value) + '\n```';

    return (
      <div className="mb-1 w-full">
        <div className="flex flex-row items-start w-full">
          <span className="text-xs font-medium text-textSubtle min-w-[140px] pt-0.5">{key}</span>
          <div className="flex-1">
            <MarkdownContent content={content} className="text-xs text-textStandard" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2 w-full">
      {Object.entries(args).map(([key, value]) => (
        <div key={key} className="w-full">
          {renderValue(key, value)}
        </div>
      ))}
    </div>
  );
}
